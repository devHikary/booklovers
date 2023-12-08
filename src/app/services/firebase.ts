// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuoamAPMgAMWsFxrWGXV_NJrgKPuEqtnc",
  authDomain: "app-booklovers-bcf9f.firebaseapp.com",
  projectId: "app-booklovers-bcf9f",
  storageBucket: "app-booklovers-bcf9f.appspot.com",
  messagingSenderId: "658144585254",
  appId: "1:658144585254:web:c831b7ae247e1089bbe8e7",
  measurementId: "G-P33Q7E5PHJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
