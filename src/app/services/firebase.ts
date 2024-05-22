// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { environment } from "src/environments/environment";
const { NG_APP_APIKEY, NG_APP_AUTHDOMAIN, NG_APP_PROJECTID,  NG_APP_STORAGEBUCKET,  NG_APP_MESSAGEINGSENDERID, NG_APP_APPID,  NG_APP_MEASUREMENTID} = import.meta.env;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: NG_APP_APIKEY,
  authDomain: NG_APP_AUTHDOMAIN,
  projectId: NG_APP_PROJECTID,
  storageBucket: NG_APP_STORAGEBUCKET,
  messagingSenderId: NG_APP_MESSAGEINGSENDERID,
  appId: NG_APP_APPID,
  measurementId: NG_APP_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
