// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVoKIDQHed8bCENknrYt2kzveHJ-unxRU",
  authDomain: "aiducatorloginsignup.firebaseapp.com",
  databaseURL: "https://aiducatorloginsignup-default-rtdb.firebaseio.com",
  projectId: "aiducatorloginsignup",
  storageBucket: "aiducatorloginsignup.appspot.com",
  messagingSenderId: "838926633961",
  appId: "1:838926633961:web:95e6fc3e1db06411171978"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;