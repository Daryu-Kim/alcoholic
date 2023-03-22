import MainHeaderComponent from "@/components/MainHeaderComponent.vue";
import MainFooterComponent from "@/components/MainFooterComponent.vue";
import { clearSessionStorage, getSessionStorage } from "../modules/Storage";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "../modules/firebase";
import router from "@/router";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

export default {
  name: "MainHomeView",
  components: {
    MainHeaderComponent,
    MainFooterComponent,
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Navigation],
    };
  },
  data() {
    return {
      UID: localStorage.getItem("UID"),
      PID: getSessionStorage("PLACE_ID"),
      USER_NAME: "",
      PNAME: "",
      RECOMMEND_ITEM: [],
      RECOMMEND_USER: [],
      CURRENT_YEAR: "",
    };
  },
  async mounted() {
    this.CURRENT_YEAR = new Date().getFullYear();
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

    const querySnapshot = await getDocs(collection(firestore, "Places"));
    querySnapshot.forEach((doc) => {
      this.RECOMMEND_ITEM.push(doc.data());
    });

    const userSnapshot = await getDocs(collection(firestore, "Users"));
    userSnapshot.forEach((doc) => {
      if (doc.data().uid != this.UID) {
        this.RECOMMEND_USER.push(doc.data());
      }
    });
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
    goRecommendPlace() {
      router.replace("/main/recommend/place");
    },
    goRecommendUser() {
      router.replace("/main/recommend/user");
    },
    placeSlideClick(pid) {
      router.push({
        path: "/place",
        query: {
          PID: pid,
        },
      });
    },
    userSlideClick(uid) {
      router.push({
        path: "/profile",
        query: {
          UID: uid,
        },
      });
    },
  },
};
