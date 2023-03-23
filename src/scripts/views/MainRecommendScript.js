import router from "@/router";

export default {
  name: "MainRecommendView",
  mounted() {
    const currentRoute = router.currentRoute.value.href;
    if (currentRoute == "/main/recommend/place") {
      this.$refs.RECOMMEND_PLACE.checked = true;
    } else {
      this.$refs.RECOMMEND_USER.checked = true;
    }
  },
  methods: {
    clickPlace() {
      router.replace("/main/recommend/place");
    },
    clickUser() {
      router.replace("/main/recommend/user");
    },
  },
};
