// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAphYFmrOL7qPD_gOorM32CLhDdNtw2jRg",
  authDomain: "netflixgpt-977ef.firebaseapp.com",
  projectId: "netflixgpt-977ef",
  storageBucket: "netflixgpt-977ef.appspot.com",
  messagingSenderId: "198637086412",
  appId: "1:198637086412:web:3c69a546e4def905384469",
  measurementId: "G-5344G3DZMV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();