import React, { createContext, useContext, useEffect, useState } from "react";
import { auth as firebaseAuth } from "../firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ id: null, username: null, type: null, token: null });
  const [loading, setLoading] = useState(true);

  // initialize from firebase auth state and fallback to localStorage
  useEffect(() => {
    if (!firebaseAuth) {
      // Firebase not initialized; restore legacy localStorage session
      // eslint-disable-next-line no-console
      console.warn("Firebase not initialized: using localStorage fallback for auth state.");
      try {
        const id = localStorage.getItem("id");
        const username = localStorage.getItem("username");
        const type = localStorage.getItem("type");
        const token = localStorage.getItem("token");
        setAuth({
          id: id ? JSON.parse(id) : null,
          username: username ? JSON.parse(username) : username,
          type: type ? JSON.parse(type) : type,
          token: token ? JSON.parse(token) : token,
        });
      } catch (e) {
        // ignore
      }
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // basic user info; app can store more in Firestore later
        const next = { id: user.uid, username: user.email, type: null, token: null };
        setAuth(next);
      } else {
        // fallback to localStorage for legacy sessions when signed out
        try {
          const id = localStorage.getItem("id");
          const username = localStorage.getItem("username");
          const type = localStorage.getItem("type");
          const token = localStorage.getItem("token");
          setAuth({
            id: id ? JSON.parse(id) : null,
            username: username ? JSON.parse(username) : username,
            type: type ? JSON.parse(type) : type,
            token: token ? JSON.parse(token) : token,
          });
        } catch (e) {
          // ignore
        }
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  function setAuthData({ id, username, type, token }, persist = true) {
    const next = { id: id ?? auth.id, username: username ?? auth.username, type: type ?? auth.type, token: token ?? auth.token };
    setAuth(next);
    if (persist) {
      try {
        if (id !== undefined) localStorage.setItem("id", JSON.stringify(next.id));
        if (username !== undefined) localStorage.setItem("username", JSON.stringify(next.username));
        if (type !== undefined) localStorage.setItem("type", JSON.stringify(next.type));
        if (token !== undefined) localStorage.setItem("token", JSON.stringify(next.token));
      } catch (e) {}
    }
  }

  function clearAuth() {
    setAuth({ id: null, username: null, type: null, token: null });
    try {
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("type");
      localStorage.removeItem("token");
    } catch (e) {}
  }

  // Firebase wrappers
  async function signupWithEmail(email, password) {
  if (!firebaseAuth) throw new Error("Firebase not initialized");
  const res = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const user = res.user;
    const next = { id: user.uid, username: user.email, type: null, token: null };
    setAuth(next);
    // persist legacy fields for compatibility
    try {
      localStorage.setItem("id", JSON.stringify(next.id));
      localStorage.setItem("username", JSON.stringify(next.username));
    } catch (e) {}
    return user;
  }

  async function loginWithEmail(email, password) {
  if (!firebaseAuth) throw new Error("Firebase not initialized");
  const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const user = res.user;
    const next = { id: user.uid, username: user.email, type: null, token: null };
    setAuth(next);
    try {
      localStorage.setItem("id", JSON.stringify(next.id));
      localStorage.setItem("username", JSON.stringify(next.username));
    } catch (e) {}
    return user;
  }

  async function logout() {
    if (firebaseAuth) {
      try {
        await firebaseSignOut(firebaseAuth);
      } catch (e) {
        // ignore
      }
    }
    clearAuth();
  }

  const value = { auth, setAuthData, clearAuth, signupWithEmail, loginWithEmail, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
