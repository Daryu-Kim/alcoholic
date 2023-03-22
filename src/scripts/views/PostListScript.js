import DialogHeaderComponent from "@/components/DialogHeaderComponent.vue";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
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
    const filter = query(
      collection(firestore, "Users", this.UID, "Posts"),
      orderBy("created_at")
    );
    const postSnapshot = await getDocs(filter);
    postSnapshot.forEach((post) => {
      const currentTime = new Date().getTime();
      const postTime = post.data().created_at.toDate().getTime();
      const tempTime = currentTime - postTime;
      const resultDates = (tempTime / 1000 / 60 / 60 / 24).toFixed(0);
      const resultHours = (tempTime / 1000 / 60 / 60).toFixed(0);
      const resultMinutes = ((tempTime / 1000 / 60) % 60).toFixed(0);
      console.log(resultDates, resultHours, resultMinutes);
      this.POST.push(post.data());
      this.DATE.push([resultDates, resultHours, resultMinutes]);
    });
    console.log(this.POST);
  },
  methods: {
    goDMChat() {},
  },
};
