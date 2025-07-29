// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "auth-a8707.firebaseapp.com",
  projectId: "auth-a8707",
  storageBucket: "auth-a8707.firebasestorage.app",
  messagingSenderId: "354102752275",
  appId: "1:354102752275:web:555d7cd654787c82fe3be6",
  measurementId: "G-3W2RLMMKT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };