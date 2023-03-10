import router from "@/router";

export default {
  name: "HomeView",
  mounted() {
    console.log(this.isRunningStandalone());
    if (this.isRunningStandalone()) {
      // Running Standalone
      this.$refs.SPIN_TEXT.innerHTML = "유저 데이터를 불러오는 중입니다!";
      setTimeout(() => {
        if (!localStorage.getItem("UID")) {
          this.$refs.SPIN_TEXT.innerHTML =
            "로그인 데이터가 없습니다!<br/>로그인 페이지로 이동합니다!";
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        } else {
          if (!localStorage.getItem("CURRENT_PLACE")) {
            setTimeout(() => {
              router.push("/home");
            }, 1500);
          } else {
            // CURRENT_PLACE
            // localStorage.getItem("CURRENT_PLACE")[1];
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
