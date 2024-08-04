// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const db=getFireStore(app)

export {db}
