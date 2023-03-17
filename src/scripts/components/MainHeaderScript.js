import router from "@/router";

export default {
  name: "MainHeaderComponent",
  methods: {
    goMain() {
      if (router.currentRoute.value.name == "home") {
        router.go(0);
      } else {
        router.replace("/main");
      }
    },
    goAlert() {
      router.push("/alert");
    },
  },
};
