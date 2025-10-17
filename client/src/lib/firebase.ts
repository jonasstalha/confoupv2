// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBW9ZfQNVooOHwshEWPU1PUpUv-4yv0oM",
  authDomain: "bo-maroc.firebaseapp.com",
  projectId: "bo-maroc",
  storageBucket: "bo-maroc.firebasestorage.app",
  messagingSenderId: "71345150957",
  appId: "1:71345150957:web:b574878f0eebe1fc9765e4",
  measurementId: "G-THERLWX2CY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
export const auth = firebase.auth();
export default firebase;