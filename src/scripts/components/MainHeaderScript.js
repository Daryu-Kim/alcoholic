import router from "@/router";
import { clearSessionStorage, getSessionStorage } from "../modules/Storage";

export default {
  name: "MainHeaderComponent",
  data() {
    return {
      isLinked: getSessionStorage("PLACE_ID"),
    };
  },
  methods: {
    goMain() {
      console.log(router.currentRoute.value);
      if (router.currentRoute.value.name == "home") {
        router.go(0);
      } else {
        router.replace("/main");
      }
    },
    async unLink() {
      clearSessionStorage();
      await router.replace("/main");
      router.go(0);
    },
    scanQRCode() {
      router.replace("/scan");
    },
  },
};
