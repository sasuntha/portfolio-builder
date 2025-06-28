// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbecnfldUn6NOcMz59-irtwTZ94jEhTps",
  authDomain: "portfolio-builder-17c43.firebaseapp.com",
  projectId: "portfolio-builder-17c43",
  storageBucket: "portfolio-builder-17c43.firebasestorage.app",
  messagingSenderId: "113093076261",
  appId: "1:113093076261:web:f74b2dd0a87a4704fa26cc",
  measurementId: "G-EH8DNYNY2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const storage = getStorage(app);

