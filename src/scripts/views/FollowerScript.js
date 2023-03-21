import DialogHeaderComponent from "@/components/DialogHeaderComponent.vue";
import router from "@/router";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../modules/firebase";

export default {
  name: "FollowerView",
  components: {
    DialogHeaderComponent,
  },
  data() {
    return {
      TARGET_ID: this.$route.query.UID,
      FOLLOWER_ITEM: [],
    };
  },
  async mounted() {
    const followers = await getDocs(
      collection(firestore, "Follows", this.TARGET_ID, "Follower")
    );
    followers.forEach((doc) => {
      this.FOLLOWER_ITEM.push(doc.data());
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
