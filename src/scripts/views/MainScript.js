import MainHeaderComponent from "@/components/MainHeaderComponent.vue";
import MainFooterComponent from "@/components/MainFooterComponent.vue";

export default {
  name: "MainView",
  components: {
    MainHeaderComponent,
    MainFooterComponent,
  },
  data() {
    return {
      canLeaveSite: false,
    };
  },
  mounted() {
    window.addEventListener("beforeunload", this.unLoadEvent);
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.unLoadEvent);
  },
  methods: {
    unLoadEvent(event) {
      if (this.canLeaveSite) return;
      event.preventDefault();
      event.returnValue = "";
    },
  },
};
