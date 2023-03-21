// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "vue3-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
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

export const followUser = async (targetUID) => {
  const currentYear = new Date().getFullYear();
  const myUID = localStorage.getItem("UID");
  const myDoc = await getDoc(doc(firestore, "Users", myUID));
  const targetDoc = await getDoc(doc(firestore, "Users", targetUID));
  try {
    if (myDoc.exists()) {
      if (targetDoc.exists()) {
        await setDoc(
          doc(
            firestore,
            "Follows",
            myDoc.data().uid,
            "Following",
            targetDoc.data().uid
          ),
          {
            display_name: targetDoc.data().name,
            display_info: `${currentYear - targetDoc.data().age + 1} | ${
              targetDoc.data().gender
            }`,
            display_des: targetDoc.data().des,
            profile_img: targetDoc.data().profile_img,
            uid: targetDoc.data().uid,
          }
        );

        await setDoc(
          doc(
            firestore,
            "Follows",
            targetDoc.data().uid,
            "Follower",
            myDoc.data().uid
          ),
          {
            display_name: myDoc.data().name,
            display_info: `${currentYear - myDoc.data().age + 1} | ${
              myDoc.data().gender
            }`,
            display_des: myDoc.data().des,
            profile_img: myDoc.data().profile_img,
            uid: myDoc.data().uid,
          }
        );

        await updateDoc(doc(firestore, "Users", myUID), {
          following_count: myDoc.data().following_count + 1,
        });

        await updateDoc(doc(firestore, "Users", targetUID), {
          follower_count: targetDoc.data().follower_count + 1,
        });
      }
    }
  } catch (error) {
    toast.error(error, {
      autoClose: 2000,
      theme: "colored",
    });
  }
};

export const unfollowUser = async (targetUID) => {
  const myUID = localStorage.getItem("UID");
  const myDoc = await getDoc(doc(firestore, "Users", myUID));
  const targetDoc = await getDoc(doc(firestore, "Users", targetUID));
  try {
    if (myDoc.exists()) {
      if (targetDoc.exists()) {
        await deleteDoc(
          doc(
            firestore,
            "Follows",
            myDoc.data().uid,
            "Following",
            targetDoc.data().uid
          )
        );

        await deleteDoc(
          doc(
            firestore,
            "Follows",
            targetDoc.data().uid,
            "Follower",
            myDoc.data().uid
          )
        );

        await updateDoc(doc(firestore, "Users", myUID), {
          following_count: myDoc.data().following_count - 1,
        });

        await updateDoc(doc(firestore, "Users", targetUID), {
          follower_count: targetDoc.data().follower_count - 1,
        });
      }
    }
  } catch (error) {
    toast.error(error, {
      autoClose: 2000,
      theme: "colored",
    });
  }
};
