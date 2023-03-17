import MainHeaderComponent from "@/components/MainHeaderComponent.vue";
import MainFooterComponent from "@/components/MainFooterComponent.vue";
import { clearSessionStorage, getSessionStorage } from "../modules/Storage";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../modules/firebase";
import router from "@/router";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

export default {
  name: "MainHomeView",
  components: {
    MainHeaderComponent,
    MainFooterComponent,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      UID: localStorage.getItem("UID"),
      PID: getSessionStorage("PLACE_ID"),
      USER_NAME: "",
      PNAME: "",
      RECOMMEND_ITEM: [
        ["asdf", "asdfasdfasdf", "#579122", "var(--reverse-primary-color)"],
        ["asdf", "fwiehfuiweicwano", "#15afcf", "blue"],
        ["asdf", "wunv0r29837nmkld", "#fea2d1", "var(--pastel-red)"],
      ],
    };
  },
  async mounted() {
    if (this.UID) {
      const docSnap = await getDoc(doc(firestore, "Users", this.UID));
      if (docSnap.exists()) {
        this.USER_NAME = docSnap.data().name;
      }
    }

    if (this.PID) {
      const docSnap = await getDoc(doc(firestore, "Places", this.PID));
      if (docSnap.exists()) {
        this.PNAME = docSnap.data().name;
      }
    }
  },
  methods: {
    toLink() {
      router.push("/scan");
    },
    async toUnlink() {
      clearSessionStorage();
      await router.replace("/main/search");
      router.replace("/main/home");
    },
  },
};
