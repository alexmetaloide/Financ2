import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH2wk6V7hDzVsZEaepX-m-2DciMYaHAGs",
  authDomain: "banco-dados-tv.firebaseapp.com",
  projectId: "banco-dados-tv",
  storageBucket: "banco-dados-tv.firebasestorage.app",
  messagingSenderId: "295405312917",
  appId: "1:295405312917:web:1ac198b4c1fb8a12b4349c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
