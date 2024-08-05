// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA3ol_lo6TJkdstz_O4YnswedJVsTxm6xs",
  authDomain: "pantry-tracker-4446e.firebaseapp.com",
  projectId: "pantry-tracker-4446e",
  storageBucket: "pantry-tracker-4446e.appspot.com",
  messagingSenderId: "949659887631",
  appId: "1:949659887631:web:1d160703e0d7014b329b7a",
  measurementId: "G-YLFLXESL5L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)

export {db}
