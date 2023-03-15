import router from "@/router";
import { deleteCookie, getRefreshCookie } from "../modules/Cookie";

export default {
  name: "MainHeaderComponent",
  data() {
    return {
      isLinked: getRefreshCookie()[0] != "",
    };
  },
  methods: {
    goMain() {
      console.log(router.currentRoute.value);
      if (router.currentRoute.value.name == "home") {
        router.go(0);
      } else {
        router.push("/main");
      }
    },
    async unLink() {
      deleteCookie("TABLE_ID");
      deleteCookie("TABLE_NUM");
      await router.replace("/main");
      router.go(0);
    },
    scanQRCode() {
      router.push("/scan");
    },
  },
};
