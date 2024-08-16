// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKS00y4Ri80c7cLjfzeyonBkt7OW9H0SE",
  authDomain: "syntholux.firebaseapp.com",
  projectId: "syntholux",
  storageBucket: "syntholux.appspot.com",
  messagingSenderId: "370349337014",
  appId: "1:370349337014:web:26c19ed4284bc01c1a3917",
  measurementId: "G-D6L0HWY51P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth =  getAuth(app);

export {app, auth}
export const db = getFirestore(app);
export const storage = getStorage(app);