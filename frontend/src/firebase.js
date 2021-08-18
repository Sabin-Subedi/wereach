import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAVac0AL-Lsb_sk-hNF3uEBSenv_jSpBN0",
    authDomain: "civism-1d244.firebaseapp.com",
    projectId: "civism-1d244",
    storageBucket: "civism-1d244.appspot.com",
    messagingSenderId: "326483404812",
    appId: "1:326483404812:web:b5941fb3069290875d2629",
    measurementId: "G-H83Z43ES19"
  };
  
  // Initialize Firebase

 const firebaseApp =  firebase.initializeApp(firebaseConfig);
const db= firebaseApp.firestore();
const auth= firebaseApp.auth();

export {db,auth}