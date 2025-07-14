// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 
    apiKey: "AIzaSyA1dpvNIGMcHS1VhQ7Qwz2x7ddzHjfQCQQ",
    authDomain: "studyplanner-12.firebaseapp.com",
    projectId: "studyplanner-12",
    storageBucket: "studyplanner-12.firebasestorage.app",
    messagingSenderId: "974617215232",
    appId: "1:974617215232:web:b2daba6a8b9212e289f3e5",
    measurementId: "G-2NCMVSJ2K8"

  
};

const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);

