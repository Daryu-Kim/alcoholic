import router from "@/router";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../modules/firebase";

export default {
  name: "MainHeaderComponent",
  data() {
    return {
      UID: localStorage.getItem("UID"),
      TEMP_COUNT: 0,
      RESULT_COUNT: 0,
    };
  },
  mounted() {
    const filter = query(
      collection(firestore, "Users", this.UID, "Posts"),
      where("read", "==", false)
    );
    const noReadSnapshot = onSnapshot(filter, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          this.TEMP_COUNT++;
          if (this.TEMP_COUNT > 99) {
            this.RESULT_COUNT = "99+";
          } else {
            this.RESULT_COUNT = this.TEMP_COUNT;
          }
        }
      });
    });
    console.log(noReadSnapshot);
  },
  methods: {
    goMain() {
      if (router.currentRoute.value.name == "home") {
        router.go(0);
      } else {
        router.replace("/main");
      }
    },
    goPostList() {
      router.push("/post");
    },
  },
};
