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
import { auth, googleProvider } from "../firebase";
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
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
