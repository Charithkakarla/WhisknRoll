import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ id: null, username: null, type: null, token: null });
  const [loading, setLoading] = useState(true);

  // initialize auth state from localStorage
  useEffect(() => {
  // Restore legacy localStorage session
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

  // Legacy localStorage auth helpers
  async function logout() {
    clearAuth();
  }

  const value = { auth, setAuthData, clearAuth, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
