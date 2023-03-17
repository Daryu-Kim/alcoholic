import MainHeaderComponent from "@/components/MainHeaderComponent.vue";
import MainFooterComponent from "@/components/MainFooterComponent.vue";
import router from "@/router";

export default {
  name: "MainProfileView",
  components: {
    MainHeaderComponent,
    MainFooterComponent,
  },
  methods: {
    logout() {
      localStorage.clear();
      sessionStorage.clear();
      router.replace("/login");
    },
  },
};
