// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBI0BC4m5QOZJTwKj0QtKrg8Y_AjNiZYb8",
  authDomain: "todolist-9caae.firebaseapp.com",
  projectId: "todolist-9caae",
  storageBucket: "todolist-9caae.firebasestorage.app",
  messagingSenderId: "573143239608",
  appId: "1:573143239608:web:d6155cf75b740ff922dd4d",
  measurementId: "G-S0GT7P02F9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { analytics, auth };
