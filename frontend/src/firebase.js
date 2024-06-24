import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

// 1. Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyClu5JxorWcmTW_e-MV8k6gYIANKINO5pI",
    authDomain: "docuquery-ai.firebaseapp.com",
    projectId: "docuquery-ai",
    storageBucket: "docuquery-ai.appspot.com",
    messagingSenderId: "568367813342",
    appId: "1:568367813342:web:7339af4e810f05a9fda84f",
    measurementId: "G-ZQF76EXB0E"
};

// 2. Initialize Firebase
export const app = initializeApp(firebaseConfig);

// 3. Use the Firebase Authentication service
export const auth = getAuth(app);
