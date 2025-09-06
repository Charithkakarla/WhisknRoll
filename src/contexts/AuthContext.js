import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithPopup
} from "firebase/auth";
import { auth, googleProvider, RecaptchaVerifier, signInWithPhoneNumber } from "../firebase";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firebase auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Sign up function
  async function signup(email, password) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Send email verification
      await sendEmailVerification(result.user);
      toast.success("Account created! Please check your email for verification.");
      return result;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(getErrorMessage(error.code));
      throw error;
    }
  }

  // Login function
  async function login(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (!result.user.emailVerified) {
        toast.warning("Please verify your email before logging in.");
        await signOut(auth);
        throw new Error("Email not verified");
      }
      toast.success("Login successful!");
      return result;
    } catch (error) {
      console.error("Login error:", error);
      toast.error(getErrorMessage(error.code));
      throw error;
    }
  }

  // Logout function
  async function logout() {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
      throw error;
    }
  }

  // Password reset function
  async function resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error(getErrorMessage(error.code));
      throw error;
    }
  }

  // Google authentication function
  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast.success("Google sign-in successful!");
      return result;
    } catch (error) {
      console.error("Google auth error:", error);
      toast.error(getErrorMessage(error.code));
      throw error;
    }
  }

  // Phone authentication setup
  async function setupRecaptcha(containerId = 'recaptcha-container') {
    try {
      // Clear any existing reCAPTCHA
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }

      // Wait for the container to be available
      const checkContainer = () => {
        const container = document.getElementById(containerId);
        if (!container) {
          throw new Error(`reCAPTCHA container '${containerId}' not found in DOM`);
        }
        return container;
      };

      // Try multiple times to find the container (handles async rendering)
      for (let i = 0; i < 10; i++) {
        try {
          checkContainer();
          break;
        } catch (error) {
          if (i === 9) throw error;
          await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100ms
        }
      }

      console.log(`Setting up reCAPTCHA in container: ${containerId}`);

      const recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: (response) => {
          console.log("reCAPTCHA solved successfully");
        },
        'expired-callback': () => {
          console.log("reCAPTCHA expired, please try again");
          toast.error("reCAPTCHA expired. Please try again.");
        }
      });

      // Render the reCAPTCHA
      await recaptchaVerifier.render();

      window.recaptchaVerifier = recaptchaVerifier;
      console.log("reCAPTCHA setup complete");
      return recaptchaVerifier;
    } catch (error) {
      console.error("reCAPTCHA setup error:", error);
      toast.error(`reCAPTCHA setup failed: ${error.message}`);
      throw error;
    }
  }

  // Phone authentication function
  async function signInWithPhone(phoneNumber, recaptchaVerifier) {
    try {
      console.log("Attempting phone authentication for:", phoneNumber);

      const verifier = recaptchaVerifier || window.recaptchaVerifier;
      if (!verifier) {
        throw new Error("reCAPTCHA verifier not found. Please refresh and try again.");
      }

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        verifier
      );

      console.log("Verification code sent successfully");
      toast.success("Verification code sent to your phone!");
      return confirmationResult;
    } catch (error) {
      console.error("Phone auth error:", error);

      // Provide specific error messages
      let errorMessage = "Failed to send verification code";

      switch (error.code) {
        case 'auth/invalid-phone-number':
          errorMessage = "Invalid phone number format. Please use E.164 format (+1234567890)";
          break;
        case 'auth/missing-phone-number':
          errorMessage = "Phone number is required";
          break;
        case 'auth/too-many-requests':
          errorMessage = "Too many requests. Please try again later";
          break;
        case 'auth/quota-exceeded':
          errorMessage = "SMS quota exceeded. Please try again later";
          break;
        case 'auth/captcha-check-failed':
          errorMessage = "reCAPTCHA verification failed. Please try again";
          break;
        case 'auth/invalid-verification-code':
          errorMessage = "Invalid verification code";
          break;
        case 'auth/code-expired':
          errorMessage = "Verification code has expired. Please request a new one";
          break;
        default:
          errorMessage = `Phone authentication failed: ${error.message}`;
      }

      toast.error(errorMessage);
      throw error;
    }
  }

  // Helper function to get user-friendly error messages
  function getErrorMessage(errorCode) {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Email is already registered';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/user-disabled':
        return 'This account has been disabled';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Try again later';
      default:
        return 'An error occurred. Please try again';
    }
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    signInWithGoogle,
    setupRecaptcha,
    signInWithPhone,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
