import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9tLulnZggb47gIx9byJcRWqffyHuTcEI",
  authDomain: "finni-health-23c83.firebaseapp.com",
  projectId: "finni-health-23c83",
  storageBucket: "finni-health-23c83.appspot.com",
  messagingSenderId: "397415182255",
  appId: "1:397415182255:web:9a631c6b6193676d3c495a",
  measurementId: "G-QQK5SRBZLL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);