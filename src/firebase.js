// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADiwMtW8co4O8qA5nY28-pmnBxGo04o_o",
  authDomain: "photo-tagging-70c04.firebaseapp.com",
  databaseURL: "https://photo-tagging-70c04-default-rtdb.firebaseio.com",
  projectId: "photo-tagging-70c04",
  storageBucket: "photo-tagging-70c04.appspot.com",
  messagingSenderId: "90440877471",
  appId: "1:90440877471:web:0cba0d6376bc89ab7f69aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;