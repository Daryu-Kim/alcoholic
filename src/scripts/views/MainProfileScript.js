import MainHeaderComponent from "@/components/MainHeaderComponent.vue";
import MainFooterComponent from "@/components/MainFooterComponent.vue";
import router from "@/router";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "../modules/firebase";
import { setSessionStorage } from "../modules/Storage";

export default {
  name: "MainProfileView",
  components: {
    MainHeaderComponent,
    MainFooterComponent,
  },
  data() {
    return {
      UID: localStorage.getItem("UID"),
      USER_IMG: "",
      USER_NAME: "",
      USER_INFO: "",
      USER_DES: "",
      USER_POST: [],
      USER_FOLLOWER: 0,
      USER_FOLLOWING: 0,
    };
  },
  async mounted() {
    const docSnap = await getDoc(doc(firestore, "Users", this.UID));
    const posts = await getDocs(
      collection(firestore, "Users", this.UID, "Posts")
    );
    if (docSnap.exists()) {
      var currentYear = new Date().getFullYear();
      const data = docSnap.data();
      this.USER_IMG = data.profile_img;
      this.USER_NAME = data.name;
      this.USER_DES = data.des;
      this.USER_FOLLOWER = data.follower_count;
      this.USER_FOLLOWING = data.following_count;
      this.USER_INFO = `${currentYear - data.age + 1} | ${data.gender}`;
    }
    posts.forEach((post) => {
      this.USER_POST.push(post.data());
    });
  },
  methods: {
    logout() {
      localStorage.clear();
      sessionStorage.clear();
      router.replace("/login");
    },
    goFollower() {
      setSessionStorage("TEMP_UID", this.UID);
      router.push("/follower");
    },
    goFollowing() {
      setSessionStorage("TEMP_UID", this.UID);
      router.push("/following");
    },
  },
};
