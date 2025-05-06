import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence, GoogleAuthProvider, FacebookAuthProvider, debugErrorMap } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyiNPlmLubRg-9-ohK8YUW_KY1BguU7_Y", // Chave de API
  authDomain: "role-eventos-itinerantes.firebaseapp.com",
  projectId: "role-eventos-itinerantes",
  storageBucket: "role-eventos-itinerantes.firebasestorage.app",
  messagingSenderId: "121433088564",
  appId: "1:121433088564:web:440d1cd77d6c544cbe2061",
  measurementId: "G-0Y1GS7Y1WR",
};

// Inicializar o Firebase Client SDK
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configurar persistência para sessionStorage
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    //console.log("Firebase Auth configurado para usar sessionStorage."); // Log de sucesso
  })
  .catch((error) => {
    console.error("Erro ao configurar persistência:", error); // Log de erro
  });

// Ativar logs detalhados do Firebase Auth
auth.errorMap = debugErrorMap;
auth.useDeviceLanguage(); // Configura o idioma padrão do dispositivo para mensagens de erro

// Configurar provedores de autenticação
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Inicializar o Firestore
const db = getFirestore(app);

//console.log("Firebase Client SDK inicializado com sucesso.");

export { auth, googleProvider, facebookProvider, db };