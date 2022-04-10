// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPESAr4XdVG1Y1BUOCw7YpSaNbEIp2qvk",
  authDomain: "crud-test-3c5d0.firebaseapp.com",
  projectId: "crud-test-3c5d0",
  storageBucket: "crud-test-3c5d0.appspot.com",
  messagingSenderId: "146243121959",
  appId: "1:146243121959:web:35f7cba9ac76723d8b6f02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);