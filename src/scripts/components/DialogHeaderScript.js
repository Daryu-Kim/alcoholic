import router from "@/router";

export default {
  name: "DialogHeaderComponent",
  methods: {
    goPrev() {
      router.go(-1);
    },
  },
  props: {
    title: "",
  },
};
