// Safe Firebase stub for builds where Firebase is intentionally removed.
// Exports the common symbols (auth, db, helper functions) used across the app
// but implements them as no-ops or predictable failures to avoid runtime surprises.

// Named exports compatible with existing imports
export const auth = null;
export const db = null;

// Call to initialize Firebase — left as a no-op so code can call it safely.
export function initFirebase() {
  // no-op: Firebase is intentionally not included in this build.
}

// Convenience helpers that mirror the firebase API shape used elsewhere but
// surface clear errors so developers can detect missing Firebase quickly.
export function signInWithEmailAndPassword(email, password) {
  return Promise.reject(new Error('Firebase is not configured in this environment.'));
}

export function createUserWithEmailAndPassword(email, password) {
  return Promise.reject(new Error('Firebase is not configured in this environment.'));
}

// onAuthStateChanged typically registers a listener; here we call no callback
// and return an unsubscribe no-op so callers can safely call the returned function.
export function onAuthStateChanged(callback) {
  // Do not call the callback. Return an unsubscribe function.
  return () => {};
}

// Default export for any code using default import style
export default {
  auth,
  db,
  initFirebase,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
};
