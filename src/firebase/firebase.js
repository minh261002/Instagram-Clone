import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCS02FspSS89c3vNHTIo-s81RJxa2dbyfw",
    authDomain: "instagram-clone-cfcd7.firebaseapp.com",
    projectId: "instagram-clone-cfcd7",
    storageBucket: "instagram-clone-cfcd7.appspot.com",
    messagingSenderId: "508278205694",
    appId: "1:508278205694:web:672c2af9471ac9730d09af",
    measurementId: "G-QCK75T11SF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };