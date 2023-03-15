import router from "@/router";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../modules/firebase";

export default {
  name: "HomeView",
  mounted() {
    console.log(this.isRunningStandalone());
    this.$refs.SPIN_TEXT.innerHTML = "기기 정보를 불러오는 중입니다!";
    setTimeout(() => {
      if (this.isMobile()) {
        setTimeout(() => {
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
                    localStorage.setItem("MENU", 0);
                    router.push("/main");
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
        }, 1000);
      } else {
        this.$refs.SPIN_TEXT.innerHTML = "지원하지 않는 기기입니다!";
        setTimeout(() => {
          window.close();
        }, 1000);
      }
    }, 1000);
  },
  methods: {
    isRunningStandalone() {
      return window.matchMedia("(display-mode: standalone)").matches;
    },
    isMobile() {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    },
  },
};
