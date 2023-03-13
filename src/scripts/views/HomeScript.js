import router from "@/router";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../modules/firebase";

export default {
  name: "HomeView",
  mounted() {
    console.log(this.isRunningStandalone());
    if (this.isRunningStandalone()) {
      // Running Standalone
      this.$refs.SPIN_TEXT.innerHTML = "유저 데이터를 불러오는 중입니다!";
      setTimeout(async () => {
        if (!localStorage.getItem("UID")) {
          this.$refs.SPIN_TEXT.innerHTML =
            "로그인 데이터가 없습니다!<br/>로그인 페이지로 이동합니다!";
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        } else {
          const docSnap = await getDoc(
            doc(firestore, "Users", localStorage.getItem("UID"))
          );

          if (docSnap.data().verified) {
            setTimeout(() => {
              router.push("/home");
            }, 1500);
          } else {
            setTimeout(() => {
              router.push("/register");
            }, 1500);
          }
        }
      }, 1000);
    } else {
      // Not Running Standalone
      this.$refs.SPIN_TEXT.innerHTML =
        "미설치 상태입니다!<br/>설치 페이지로 이동합니다!";
      setTimeout(() => {
        router.push("/install");
      }, 1500);
    }
  },
  methods: {
    isRunningStandalone() {
      return window.matchMedia("(display-mode: standalone)").matches;
    },
  },
};
