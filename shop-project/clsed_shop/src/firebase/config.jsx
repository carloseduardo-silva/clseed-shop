import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmHBrCoY-GKaYdZ2jQjFHq2i0hqsZlS_c",
  authDomain: "clsed-shop.firebaseapp.com",
  projectId: "clsed-shop",
  storageBucket: "clsed-shop.appspot.com",
  messagingSenderId: "333370405884",
  appId: "1:333370405884:web:ff8adfa33a0fb2ac13b879"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Firestore + export DB (Ref of firestore)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }