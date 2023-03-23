import DialogHeaderComponent from "@/components/DialogHeaderComponent.vue";
import router from "@/router";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { firestore } from "../modules/firebase";

export default {
  name: "PostView",
  components: {
    DialogHeaderComponent,
  },
  data() {
    return {
      UID: localStorage.getItem("UID"),
      POST: "",
      DATE: "",
      CID: this.$route.query.CID,
    };
  },
  async mounted() {
    const postSnap = await getDoc(
      doc(firestore, `Users/${this.UID}/Posts`, this.CID)
    );
    if (postSnap.exists()) {
      const currentTime = new Date().getTime();
      const postTime = postSnap.data().created_at.toDate().getTime();
      const tempTime = currentTime - postTime;
      const resultDates = (tempTime / 1000 / 60 / 60 / 24).toFixed(0);
      const resultHours = (tempTime / 1000 / 60 / 60).toFixed(0);
      const resultMinutes = ((tempTime / 1000 / 60) % 60).toFixed(0);
      this.POST = postSnap.data();
      this.DATE = [resultDates, resultHours, resultMinutes];
      this.$refs.MSG.innerHTML = this.POST.msg;
    }
  },
  methods: {
    goProfile(uid) {
      router.push({
        path: "/profile",
        query: {
          UID: uid,
        },
      });
    },
    async sendPost(tid) {
      router.push({
        path: "/post-send",
        query: {
          TID: tid,
        },
      });
    },
    async deletePost() {
      await deleteDoc(doc(firestore, `Users/${this.UID}/Posts`, this.CID));
      router.go(-1);
    },
  },
};
