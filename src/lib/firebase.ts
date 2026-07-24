import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIkR-IjNwz2YAvEAUSZNFDISbflxNYZ-w",
  authDomain: "doomott009.firebaseapp.com",
  projectId: "doomott009",
  storageBucket: "doomott009.firebasestorage.app",
  messagingSenderId: "944004321049",
  appId: "1:944004321049:web:51cc973e4040b414dc7f88",
  measurementId: "G-EQF0634TXQ"
};

// Initialize Firebase (safeguarded against multiple initializations in Next.js development)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
