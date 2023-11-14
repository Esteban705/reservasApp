// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1VHYtdTimOgLyAzq0sCJTj8ibr23xSdc",
  authDomain: "sidcareservas.firebaseapp.com",
  projectId: "sidcareservas",
  storageBucket: "sidcareservas.appspot.com",
  messagingSenderId: "1075341448921",
  appId: "1:1075341448921:web:9b3644ecfd4d8dee9810c8",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, storage };
