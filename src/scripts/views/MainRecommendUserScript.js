import { getSessionStorage } from "../modules/Storage";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "../modules/firebase";
import router from "@/router";

export default {
  name: "MainRecommendUserView",
  data() {
    return {
      UID: localStorage.getItem("UID"),
      PID: getSessionStorage("PLACE_ID"),
      PNAME: "",
      RECOMMEND_ITEM: [],
      RECOMMEND_USER: [],
      CURRENT_YEAR: "",
    };
  },
  async mounted() {
    this.CURRENT_YEAR = new Date().getFullYear();
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
    openFilter() {
      console.log("Filter");
    },
  },
};
