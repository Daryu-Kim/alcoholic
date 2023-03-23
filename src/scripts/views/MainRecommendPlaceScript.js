import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../modules/firebase";
import router from "@/router";

export default {
  name: "MainRecommendPlaceView",
  data() {
    return {
      RECOMMEND_ITEM: [],
    };
  },
  async mounted() {
    const querySnapshot = await getDocs(collection(firestore, "Places"));
    querySnapshot.forEach((doc) => {
      this.RECOMMEND_ITEM.push(doc.data());
    });
  },
  methods: {
    placeSlideClick(pid) {
      router.push({
        path: "/place",
        query: {
          PID: pid,
        },
      });
    },
    openFilter() {
      console.log("Filter");
    },
  },
};
