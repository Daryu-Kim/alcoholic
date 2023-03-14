import router from "@/router";

export default {
  name: "MainHeaderComponent",
  methods: {
    goMain() {
      if (router.currentRoute.value.name == "main") {
        router.go(0);
      } else {
        router.push("/main");
      }
    },
    scanQRCode() {
      router.push("/scan");
    },
  },
};
