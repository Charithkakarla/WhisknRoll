// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXqoOvUhftbkrSEDDGkOHRF4HdBRMZdhk",
  authDomain: "whisknroll-b0317.firebaseapp.com",
  projectId: "whisknroll-b0317",
  storageBucket: "whisknroll-b0317.firebasestorage.app",
  messagingSenderId: "282265864800",
  appId: "1:282265864800:web:44c81e2b99c7800c48d105"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize authentication providers
export const googleProvider = new GoogleAuthProvider();

// Phone authentication helper functions
export { RecaptchaVerifier, signInWithPhoneNumber };

// Export the app instance
export default app;
