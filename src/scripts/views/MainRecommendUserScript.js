import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../modules/firebase";
import router from "@/router";

export default {
  name: "MainRecommendUserView",
  data() {
    return {
      UID: localStorage.getItem("UID"),
      RECOMMEND_USER: [],
      CURRENT_YEAR: "",
    };
  },
  async mounted() {
    this.CURRENT_YEAR = new Date().getFullYear();
    const userSnapshot = await getDocs(collection(firestore, "Users"));
    userSnapshot.forEach((doc) => {
      if (doc.data().uid != this.UID) {
        this.RECOMMEND_USER.push(doc.data());
      }
    });
  },
  methods: {
    userSlideClick(uid) {
      router.push({
        path: "/profile",
        query: {
          UID: uid,
        },
      });
    },
    openFilter() {
      this.$refs.OVERLAY.style.display = "flex";
    },
    closeFilter() {
      this.$refs.OVERLAY.style.display = "none";
    },
  },
};
