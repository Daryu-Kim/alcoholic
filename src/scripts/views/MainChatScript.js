import router from "@/router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "vue3-toastify";
import {
  firestore,
  followUser,
  storage,
  unfollowUser,
} from "../modules/firebase";
import { getSessionStorage } from "../modules/Storage";

export default {
  name: "MainChatView",
  data() {
    return {
      PLACE_ID: getSessionStorage("PLACE_ID"),
      TABLE_ID: getSessionStorage("TABLE_ID"),
      UID: "",
      USER_NAME: "",
      USER_AGE: 0,
      USER_GENDER: "",
      USER_PROFILE: "",
      messages: [],
      currentTime: Timestamp.fromDate(new Date()),
      CLICKED_UID: "",
      CLICKED_NAME: "",
      CLICKED_AGE: 0,
      CLICKED_GENDER: "",
      CLICKED_DES: "",
      CLICKED_FOLLOWER: 0,
      CLICKED_FOLLOWING: 0,
      isFollowed: false,
    };
  },
  async mounted() {
    this.UID = localStorage.getItem("UID");
    const docSnap = await getDoc(doc(firestore, "Users", this.UID));
    if (docSnap.exists()) {
      this.USER_NAME = docSnap.data().name;
      this.USER_AGE = docSnap.data().age;
      this.USER_GENDER = docSnap.data().gender;
      this.USER_PROFILE = docSnap.data().profile_img;
    } else {
      console.log("No Such Document!");
    }
    await this.getMessages();
  },
  methods: {
    scrollBottom() {
      this.$refs.VIEWER.scrollTo({ top: this.$refs.VIEWER.scrollHeight });
    },
    getMessages() {
      const messageCol = query(
        collection(firestore, "Places", this.PLACE_ID, "Messages"),
        where("created_at", ">", this.currentTime),
        orderBy("created_at")
      );
      const snapshot = onSnapshot(messageCol, (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === "added") {
            await this.messages.push(change.doc.data());
            setTimeout(() => {
              this.scrollBottom();
            }, 500);
          }
        });
      });
      console.info(snapshot);
    },
    isDarkMode() {
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    },
    async profileImgClick(event) {
      var temp = event.target.style.backgroundImage;
      temp = temp.slice(5, -2);
      this.overlayProfileView(temp);
    },
    overlayProfileClick() {
      this.overlayProfileHide();
    },
    async overlayProfileView(src) {
      this.$refs.OVERLAY_PROFILE_BOX.style.display = "flex";
      this.$refs.OVERLAY_PROFILE.style.display = "block";
      const querySnapshot = await getDocs(
        query(collection(firestore, "Users"), where("profile_img", "==", src))
      );
      querySnapshot.forEach((doc) => {
        var year = new Date().getFullYear();
        var age = year - doc.data().age + 1;

        this.CLICKED_UID = doc.data().uid;
        this.CLICKED_NAME = doc.data().name;
        this.CLICKED_AGE = age;
        this.CLICKED_GENDER = doc.data().gender;
        this.CLICKED_DES = doc.data().des;
        this.CLICKED_FOLLOWER = doc.data().follower_count;
        this.CLICKED_FOLLOWING = doc.data().following_count;
        this.$refs.OVERLAY_PROFILE_IMG.style.backgroundImage = `url(${
          doc.data().profile_img
        })`;
      });
      const myDoc = await getDoc(
        doc(firestore, `Follows/${this.UID}/Following`, this.CLICKED_UID)
      );
      if (myDoc.exists()) {
        this.isFollowed = true;
      } else {
        this.isFollowed = false;
      }
    },
    overlayProfileGo() {
      router.push({
        path: "/profile",
        query: {
          UID: this.CLICKED_UID,
        },
      });
    },
    overlayProfileHide() {
      this.$refs.OVERLAY_PROFILE_BOX.style.display = "none";
      this.$refs.OVERLAY_PROFILE.style.display = "none";
    },
    overlayProfileModify() {
      router.replace("/main/profile");
    },
    async overlayProfileFollow() {
      await followUser(this.CLICKED_UID);
      this.isFollowed = true;
    },
    async overlayProfileUnfollow() {
      await unfollowUser(this.CLICKED_UID);
      this.isFollowed = false;
    },
    msgImgClick(event) {
      this.overlayImgView(event.target.src);
    },
    overlayImgClick() {
      this.overlayImgHide();
    },
    async overlayImgView(img) {
      this.$refs.OVERLAY_IMG.src = img;
      this.$refs.OVERLAY_IMG_BOX.style.display = "flex";
      this.$refs.OVERLAY_IMG.style.display = "block";
    },
    overlayImgHide() {
      this.$refs.OVERLAY_IMG_BOX.style.display = "none";
      this.$refs.OVERLAY_IMG.style.display = "none";
    },
    async sendMsg() {
      if (!this.$refs.INPUT_MSG.value) {
        toast.error("메시지를 입력해주세요!", {
          autoClose: 2000,
          theme: "colored",
        });
      } else {
        var year = new Date().getFullYear();
        var age = year - this.USER_AGE + 1;
        var value = this.$refs.INPUT_MSG.value;
        this.$refs.INPUT_MSG.value = "";
        var table_name;
        !this.TABLE_ID
          ? (table_name = "Guest")
          : (table_name = `Table. ${this.TABLE_ID}.`);
        await addDoc(
          collection(firestore, "Places", this.PLACE_ID, "Messages"),
          {
            created_at: Timestamp.fromDate(new Date()),
            display_name: `${this.USER_NAME} | ${age} | ${this.USER_GENDER}`,
            display_table: table_name,
            uid: this.UID,
            msg: value,
            msg_img_url: "",
            profile_img_url: this.USER_PROFILE,
          }
        );
        this.scrollBottom();
      }
    },
    async sendImage() {
      if (this.$refs.INPUT_IMG.files[0]) {
        const file = this.$refs.INPUT_IMG.files[0];
        const pid = getSessionStorage("PLACE_ID");
        var year = new Date().getFullYear();
        var age = year - this.USER_AGE + 1;
        var img_url = await this.uploadImage(file, pid);
        var table_name;
        !this.TABLE_ID
          ? (table_name = "Guest")
          : (table_name = `Table. ${this.TABLE_ID}.`);
        await addDoc(
          collection(firestore, "Places", this.PLACE_ID, "Messages"),
          {
            created_at: Timestamp.fromDate(new Date()),
            display_name: `${this.USER_NAME} | ${age} | ${this.USER_GENDER}`,
            display_table: table_name,
            uid: this.UID,
            msg: "",
            msg_img_url: img_url,
            profile_img_url: this.USER_PROFILE,
          }
        );
        setTimeout(() => {
          this.scrollBottom();
        }, 250);
      }
    },
    async uploadImage(image, id) {
      const storageRef = ref(
        storage,
        `Places/${id}/Messages/${this.UID}-${new Date().getTime()}.png`
      );
      const response = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(response.ref);
      return url;
    },
  },
};
