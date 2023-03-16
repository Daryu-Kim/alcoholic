import router from "@/router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore, loginFacebook, loginGoogle } from "../modules/firebase";

export default {
  name: "LoginView",
  methods: {
    isDarkMode() {
      return (
        window.matchMedia &&
        window.matchMedia("(perfers-color-scheme: dark)").matches
      );
    },
    facebookLogin() {
      // FaceBook 로그인
      loginFacebook().then((result) => this.accountRegister(result));
      console.log("Facebook");
    },
    googleLogin() {
      // Google 로그인
      loginGoogle().then((result) => this.accountRegister(result));
      console.log("Google");
    },
    async accountRegister(result) {
      const UID = result.user.uid;
      const docSnap = await getDoc(doc(firestore, "Users", UID));

      if (docSnap.exists()) {
        if (docSnap.data().verified) {
          router.replace("/main");
        } else {
          router.replace("/register");
        }
      } else {
        await setDoc(doc(firestore, "Users", UID), {
          uid: UID,
          verified: false,
        });
        router.replace("/register");
      }

      localStorage.setItem("UID", UID);
      console.log(result);
    },
  },
};
