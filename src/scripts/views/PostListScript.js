import DialogHeaderComponent from "@/components/DialogHeaderComponent.vue";
import router from "@/router";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../modules/firebase";

export default {
  name: "PostListView",
  components: {
    DialogHeaderComponent,
  },
  data() {
    return {
      UID: localStorage.getItem("UID"),
      POST: [],
      DATE: [],
    };
  },
  async mounted() {
    const noReadFilter = query(
      collection(firestore, "Users", this.UID, "Posts"),
      where("read", "==", false),
      orderBy("created_at", "desc")
    );
    const readFilter = query(
      collection(firestore, "Users", this.UID, "Posts"),
      where("read", "==", true),
      orderBy("created_at", "desc")
    );
    const noReadSnapshot = await getDocs(noReadFilter);
    const readSnapshot = await getDocs(readFilter);
    noReadSnapshot.forEach((post) => {
      const currentTime = new Date().getTime();
      const postTime = post.data().created_at.toDate().getTime();
      const tempTime = currentTime - postTime;
      const resultDates = (tempTime / 1000 / 60 / 60 / 24).toFixed(0);
      const resultHours = (tempTime / 1000 / 60 / 60).toFixed(0);
      const resultMinutes = ((tempTime / 1000 / 60) % 60).toFixed(0);
      this.POST.push(post.data());
      this.DATE.push([resultDates, resultHours, resultMinutes]);
    });
    readSnapshot.forEach((post) => {
      const currentTime = new Date().getTime();
      const postTime = post.data().created_at.toDate().getTime();
      const tempTime = currentTime - postTime;
      const resultDates = (tempTime / 1000 / 60 / 60 / 24).toFixed(0);
      const resultHours = (tempTime / 1000 / 60 / 60).toFixed(0);
      const resultMinutes = ((tempTime / 1000 / 60) % 60).toFixed(0);
      this.POST.push(post.data());
      this.DATE.push([resultDates, resultHours, resultMinutes]);
    });
  },
  methods: {
    async showPost(cid) {
      await updateDoc(doc(firestore, `Users/${this.UID}/Posts`, cid), {
        read: true,
      });
      router.push({
        path: "/post-view",
        query: {
          CID: cid,
        },
      });
    },
  },
};
