import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDyiNPlmLubRg-9-ohK8YUW_KY1BguU7_Y",
  authDomain: "role-eventos-itinerantes.firebaseapp.com",
  projectId: "role-eventos-itinerantes",
  storageBucket: "role-eventos-itinerantes.firebasestorage.app",
  messagingSenderId: "121433088564",
  appId: "1:121433088564:web:440d1cd77d6c544cbe2061",
  measurementId: "G-0Y1GS7Y1WR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, facebookProvider, db };