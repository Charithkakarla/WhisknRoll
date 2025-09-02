import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

let auth = null;
let db = null;

function configHasKey() {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.apiKey !== "undefined");
}

if (!configHasKey()) {
  // Missing env vars — avoid initializing Firebase so app doesn't crash during development.
  // Add a `.env.local` with the REACT_APP_FIREBASE_* values and restart the dev server.
  // Example:
  // REACT_APP_FIREBASE_API_KEY=your_api_key_here
  // REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
  // ...
  // See https://firebase.google.com/docs/web/setup for how to get these values.
  // Note: do NOT commit your .env.local to source control.
  // This warning is intentional to make the problem actionable.
  // eslint-disable-next-line no-console
  console.warn(
    "Firebase API key not found (REACT_APP_FIREBASE_API_KEY). Firebase not initialized. Add .env.local and restart the dev server."
  );
} else {
  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (err) {
    // initialization failed (invalid key or other config issue)
    // eslint-disable-next-line no-console
    console.error("Firebase initialization error:", err && err.message ? err.message : err);
    // keep auth/db as null so the rest of the app can handle missing firebase gracefully
  }
}

export { auth, db };
