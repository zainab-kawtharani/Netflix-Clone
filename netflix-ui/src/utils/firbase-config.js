
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDgiBQdpDKdIOnsiHuXZocbpVN_kTLX7iM",
  authDomain: "react-netflix-clone-13dc1.firebaseapp.com",
  projectId: "react-netflix-clone-13dc1",
  storageBucket: "react-netflix-clone-13dc1.appspot.com",
  messagingSenderId: "254352088815",
  appId: "1:254352088815:web:d4af4e973b6bdf7ebcc51a",
  measurementId: "G-C2PPT0YD6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth= getAuth(app);


