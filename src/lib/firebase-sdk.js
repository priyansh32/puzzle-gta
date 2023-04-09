import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.FIREBASE_SDK_API_KEY,
  authDomain: "puzzled-669ac.firebaseapp.com",
  projectId: "puzzled-669ac",
  storageBucket: "puzzled-669ac.appspot.com",
  messagingSenderId: "1060733243604",
  appId: "1:1060733243604:web:409964dbd549e74483ab41",
  measurementId: "G-KZ6EHH72SS",
};

export const app = initializeApp(firebaseConfig);
