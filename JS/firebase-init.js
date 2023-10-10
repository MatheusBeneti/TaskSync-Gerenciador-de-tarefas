// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwUEEVDXgpWuUpReZ4M1n6j5vS2ePyRjE",
  authDomain: "tasksync-25616.firebaseapp.com",
  projectId: "tasksync-25616",
  storageBucket: "tasksync-25616.appspot.com",
  messagingSenderId: "228665389366",
  appId: "1:228665389366:web:4d92376f351f65c8eb0397",
  measurementId: "G-GQ2ZM57KKM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);