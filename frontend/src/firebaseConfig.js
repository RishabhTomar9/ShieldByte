// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDhz-69FnkLE_XZNzDSDS5g5v7eL1M7F4A",
  authDomain: "shieldbyte-99ad3.firebaseapp.com",
  projectId: "shieldbyte-99ad3",
  storageBucket: "shieldbyte-99ad3.firebasestorage.app",
  messagingSenderId: "446515312259",
  appId: "1:446515312259:web:b8a86095377be71df6cdb6",
  measurementId: "G-96C1ZXM214"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
