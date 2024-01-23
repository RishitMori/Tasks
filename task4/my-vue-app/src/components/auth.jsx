// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "firebase/storage"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBzI-g5oMhSn_LOT5OLX0zxycGTzUYqt8I",
    authDomain: "content-delivery-67ddd.firebaseapp.com",
    projectId: "content-delivery-67ddd",
    storageBucket: "content-delivery-67ddd.appspot.com",
    messagingSenderId: "368073919360",
    appId: "1:368073919360:web:3da93427bd16fc2919cf65",
    measurementId: "G-DCPWLBWQ9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);
export { app, storage, firestore };