import MainHeaderComponent from "@/components/MainHeaderComponent.vue";
import MainFooterComponent from "@/components/MainFooterComponent.vue";
import { getRefreshCookie } from "../modules/Cookie";

export default {
  name: "MainView",
  components: {
    MainHeaderComponent,
    MainFooterComponent,
  },
  data() {
    return {
      isCookie: getRefreshCookie()[0] != "",
    };
  },
};
