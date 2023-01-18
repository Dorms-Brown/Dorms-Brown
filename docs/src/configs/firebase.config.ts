// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgrtvfbJAeg_esmuvndJWPUAlKlWDBEYo",
  authDomain: "dorms-at-brown-app.firebaseapp.com",
  projectId: "dorms-at-brown-app",
  storageBucket: "dorms-at-brown-app.appspot.com",
  messagingSenderId: "663646773042",
  appId: "1:663646773042:web:5ccfc86a1e10ccd192412b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
