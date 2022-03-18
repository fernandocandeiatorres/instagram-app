// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDi0TtTfRa5fZXe8KlGHulLLVMQ8rrb0e8",
  authDomain: "insta-clone-e80ee.firebaseapp.com",
  projectId: "insta-clone-e80ee",
  storageBucket: "insta-clone-e80ee.appspot.com",
  messagingSenderId: "672380430236",
  appId: "1:672380430236:web:b3110c123d621bbff34a59",
  measurementId: "G-FG7RE1SJ2S",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
