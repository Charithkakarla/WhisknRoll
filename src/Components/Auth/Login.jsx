import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import "./Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authMethod, setAuthMethod] = useState('email'); // 'email', 'phone'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  const { login, signInWithGoogle, setupRecaptcha, signInWithPhone } = useAuth();
  const navigate = useNavigate();

  // Cleanup reCAPTCHA on unmount
  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (authMethod === 'email') {
        await login(formData.email, formData.password);
        navigate("/");
      } else if (authMethod === 'phone' && confirmationResult) {
        await confirmationResult.confirm(verificationCode);
        toast.success("Phone verification successful!");
        navigate("/");
      }
    } catch (error) {
      // Error is handled in AuthContext with toast
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      // Error is handled in AuthContext with toast
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneAuth = async () => {
    if (!confirmationResult) {
      // Send verification code
      try {
        setLoading(true);

        // Validate phone number format
        let formattedPhone = phoneNumber.trim();
        if (!formattedPhone.startsWith('+')) {
          // Try to add country code if missing
          formattedPhone = '+' + formattedPhone;
        }

        // Basic E.164 validation
        const phoneRegex = /^\+[1-9]\d{1,14}$/;
        if (!phoneRegex.test(formattedPhone)) {
          toast.error("Please enter a valid phone number in E.164 format (+1234567890)");
          return;
        }

        console.log("Setting up reCAPTCHA...");
        let verifier = recaptchaVerifier;
        if (!verifier) {
          // Small delay to ensure DOM is ready
          await new Promise(resolve => setTimeout(resolve, 100));
          verifier = await setupRecaptcha('recaptcha-container-login');
          setRecaptchaVerifier(verifier);
        }

        console.log("Sending verification code to:", formattedPhone);
        const result = await signInWithPhone(formattedPhone, verifier);
        setConfirmationResult(result);
        toast.success("Verification code sent! Please check your phone.");
      } catch (error) {
        console.error("Phone auth setup error:", error);
        toast.error(`Failed to send code: ${error.message}`);
        setConfirmationResult(null);
      } finally {
        setLoading(false);
      }
    } else {
      // Verify code
      try {
        setLoading(true);
        console.log("Verifying code...");
        await confirmationResult.confirm(verificationCode);
        toast.success("Phone verification successful!");
        navigate("/");
      } catch (error) {
        console.error("Code verification error:", error);
        toast.error("Invalid verification code. Please try again.");
        setConfirmationResult(null);
        setVerificationCode("");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>

        <div className="auth-method-selector">
          <button
            type="button"
            className={authMethod === 'email' ? 'active' : ''}
            onClick={() => {
              setAuthMethod('email');
              setConfirmationResult(null);
              setPhoneNumber('');
              setVerificationCode('');
            }}
          >
            Email
          </button>
          <button
            type="button"
            className={authMethod === 'phone' ? 'active' : ''}
            onClick={() => {
              setAuthMethod('phone');
              setConfirmationResult(null);
            }}
          >
            Phone
          </button>
        </div>

        {authMethod === 'email' ? (
          <>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              <div className="form-actions">
                <Link to="/forgot-password" className="forgot-password">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="auth-button"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <div className="auth-social">
              <button
                onClick={handleGoogleAuth}
                className="auth-button google"
                disabled={loading}
              >
                Continue with Google
              </button>
            </div>
          </>
        ) : (
          <div className="phone-auth">
            {/* reCAPTCHA container - always rendered for phone auth */}
            <div id="recaptcha-container-login" style={{ display: 'none' }}></div>

            {!confirmationResult ? (
              <div className="phone-input-section">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1234567890"
                    required
                  />
                </div>
                <button
                  onClick={handlePhoneAuth}
                  className="auth-button"
                  disabled={loading || !phoneNumber}
                >
                  {loading ? "Sending..." : "Send Code"}
                </button>
              </div>
            ) : (
              <div className="verification-section">
                <div className="form-group">
                  <label htmlFor="code">Verification Code</label>
                  <input
                    type="text"
                    id="code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength="6"
                    required
                  />
                </div>
                <button
                  onClick={handlePhoneAuth}
                  className="auth-button"
                  disabled={loading || verificationCode.length !== 6}
                >
                  {loading ? "Verifying..." : "Verify & Continue"}
                </button>
              </div>
            )}
          </div>
        )}

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
