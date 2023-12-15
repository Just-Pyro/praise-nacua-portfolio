import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-fjSetE_SLX1rutwdBqMVEBwmFnOT3Ic",
  authDomain: "todo-1f85f.firebaseapp.com",
  projectId: "todo-1f85f",
  storageBucket: "todo-1f85f.appspot.com",
  messagingSenderId: "482161614990",
  appId: "1:482161614990:web:18bf59406ce2644a9829df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;