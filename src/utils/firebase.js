// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfckXJitSi_wYxtxyOU4K-xE502PbRGNs",
  authDomain: "netflixgpt-a91f0.firebaseapp.com",
  projectId: "netflixgpt-a91f0",
  storageBucket: "netflixgpt-a91f0.firebasestorage.app",
  messagingSenderId: "850445522267",
  appId: "1:850445522267:web:7e61c2c328926aac9c367e",
  measurementId: "G-ZP0ZFK7LMM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();