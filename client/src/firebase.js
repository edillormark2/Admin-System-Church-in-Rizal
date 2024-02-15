// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "cir-user-image.firebaseapp.com",
  projectId: "cir-user-image",
  storageBucket: "cir-user-image.appspot.com",
  messagingSenderId: "838201523513",
  appId: "1:838201523513:web:888c743b02c2a49491fce8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
