import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOhiO27LRtkapSdWf5NRsomHqUOeKiLmM",
  authDomain: "emsapp-1e4c5.firebaseapp.com",
  databaseURL: "https://emsapp-1e4c5-default-rtdb.firebaseio.com",
  projectId: "emsapp-1e4c5",
  storageBucket: "emsapp-1e4c5.appspot.com",
  messagingSenderId: "605454427947",
  appId: "1:605454427947:web:eb3810cf5a777f4416476e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
export default db;