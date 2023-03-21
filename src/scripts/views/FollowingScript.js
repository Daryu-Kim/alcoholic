import DialogHeaderComponent from "@/components/DialogHeaderComponent.vue";
import router from "@/router";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../modules/firebase";

export default {
  name: "FollowingView",
  components: {
    DialogHeaderComponent,
  },
  data() {
    return {
      UID: localStorage.getItem("UID"),
      TARGET_ID: this.$route.query.UID,
      FOLLOWING_ITEM: [],
    };
  },
  async mounted() {
    const followings = await getDocs(
      collection(firestore, "Follows", this.UID, "Following")
    );
    followings.forEach((doc) => {
      this.FOLLOWING_ITEM.push(doc.data());
    });
  },
  methods: {
    goProfile(follow_id) {
      router.push({
        path: "/profile",
        query: {
          UID: follow_id,
        },
      });
    },
  },
};
