import DialogHeaderComponent from "@/components/DialogHeaderComponent.vue";
import router from "@/router";
import { doc, getDoc } from "firebase/firestore";
import { firestore, followUser, unfollowUser } from "../modules/firebase";

export default {
  name: "ProfileView",
  components: {
    DialogHeaderComponent,
  },
  data() {
    return {
      UID: localStorage.getItem("UID"),
      ID: this.$route.query.UID,
      USER_IMG: "",
      USER_NAME: "",
      USER_INFO: "",
      USER_DES: "",
      USER_FOLLOWER: 0,
      USER_FOLLOWING: 0,
      isFollowed: false,
      isF4F: false,
    };
  },
  async mounted() {
    const currentYear = new Date().getFullYear();
    const isFollow = await getDoc(
      doc(firestore, "Follows", this.UID, "Following", this.ID)
    );
    const isFollowing = await getDoc(
      doc(firestore, "Follows", this.ID, "Follower", this.UID)
    );
    const docSnap = await getDoc(doc(firestore, "Users", this.ID));
    if (docSnap.exists()) {
      const data = docSnap.data();
      this.USER_IMG = data.profile_img;
      this.USER_NAME = data.name;
      this.USER_DES = data.des;
      this.USER_FOLLOWER = data.follower_count;
      this.USER_FOLLOWING = data.following_count;
      this.USER_INFO = `${currentYear - data.age + 1} | ${data.gender}`;
    }
    if (isFollow.exists()) this.isFollowed = true;
    if (isFollow.exists() && isFollowing.exists()) this.isF4F = true;
  },
  methods: {
    goFollower() {
      router.push({
        path: "/follower",
        query: {
          UID: this.ID,
        },
      });
    },
    goFollowing() {
      router.push({
        path: "/following",
        query: {
          UID: this.ID,
        },
      });
    },
    async clickFollow() {
      await followUser(this.ID);
      router.go(0);
    },
    async clickUnfollow() {
      await unfollowUser(this.ID);
      router.go(0);
    },
  },
};
