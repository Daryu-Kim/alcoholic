import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { toast } from "vue3-toastify";
import { getRefreshCookie } from "../modules/Cookie";
import { firestore } from "../modules/firebase";

export default {
  name: "MainChatView",
  data() {
    return {
      PLACE_ID: "",
      TABLE_ID: "",
      UID: "",
      USER_NAME: "",
      USER_AGE: 0,
      USER_GENDER: "",
      USER_PROFILE: "",
      messages: [],
    };
  },
  async mounted() {
    const cookie = getRefreshCookie();
    this.PLACE_ID = cookie[0];
    this.TABLE_ID = cookie[1];
    this.UID = localStorage.getItem("UID");

    console.log(this.PLACE_ID, this.TABLE_ID);
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
    setTimeout(() => {
      this.scrollBottom();
    }, 500);
  },
  methods: {
    scrollBottom() {
      this.$refs.VIEWER.scrollTo({ top: this.$refs.VIEWER.scrollHeight });
    },
    getMessages() {
      const messageCol = query(
        collection(firestore, "Places", this.PLACE_ID, "Messages"),
        orderBy("created_at")
      );
      const snapshot = onSnapshot(messageCol, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            this.messages.push(change.doc.data());
          }
        });
        console.log(this.messages);
      });
      console.log(snapshot);
    },
    isDarkMode() {
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
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
        await addDoc(
          collection(firestore, "Places", this.PLACE_ID, "Messages"),
          {
            created_at: Timestamp.fromDate(new Date()),
            display_name: `${this.USER_NAME} | ${age} | ${this.USER_GENDER}`,
            display_table: `Table. ${getRefreshCookie()[1]}.`,
            uid: this.UID,
            msg: value,
            msg_img_url: "",
            profile_img_url: this.USER_PROFILE,
          }
        );
        this.scrollBottom();
      }
    },
  },
};
