// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHexSJ9D9cygfzv2kxtDM6MhNU34DN19I",
  authDomain: "alcohol-3e4ad.firebaseapp.com",
  databaseURL:
    "https://alcohol-3e4ad-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "alcohol-3e4ad",
  storageBucket: "alcohol-3e4ad.appspot.com",
  messagingSenderId: "582300501346",
  appId: "1:582300501346:web:79724f3a1266d25d5c583b",
  measurementId: "G-QES7FSH0CH",
};
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope("public_profile");
facebookProvider.setCustomParameters({
  display: "popup",
});

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export const loginGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const loginFacebook = () => {
  return signInWithPopup(auth, facebookProvider);
};
