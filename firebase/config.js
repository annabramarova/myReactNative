import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKf7brJORS-4Y7rPhCIi3_lVa4NcoDNvI",
  authDomain: "react-native-annabramarova.firebaseapp.com",
  projectId: "react-native-annabramarova",
  storageBucket: "react-native-annabramarova.appspot.com",
  messagingSenderId: "161753605826",
  appId: "1:161753605826:web:4e4af10c37e92d5bd3fd5b",
  measurementId: "G-EKZP59KVL9"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
export { auth, db, storage };