import DialogHeaderComponent from "@/components/DialogHeaderComponent.vue";
import router from "@/router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { toast } from "vue3-toastify";
import { firestore } from "../modules/firebase";
import { isDarkMode } from "../modules/Functions";

export default {
  name: "PostSendView",
  components: {
    DialogHeaderComponent,
  },
  data() {
    return {
      UID: localStorage.getItem("UID"),
      TID: this.$route.query.TID,
      TARGET: "",
      MY: "",
    };
  },
  async mounted() {
    const mySnap = await getDoc(doc(firestore, "Users", this.UID));
    const targetSnap = await getDoc(doc(firestore, "Users", this.TID));
    if (targetSnap.exists()) {
      this.TARGET = targetSnap.data();
    }
    if (mySnap.exists()) {
      this.MY = mySnap.data();
    }
  },
  methods: {
    async sendPost() {
      const msg = this.$refs.POST_INPUT.value;
      if (msg) {
        const name = this.MY.name;
        const resultMsg = msg.replaceAll(/(\n|\r\n)/g, "<br>");
        toast.loading("쪽지를 보내는 중입니다.", {
          theme: isDarkMode(),
        });
        await addDoc(collection(firestore, "Users", this.TID, "Posts"), {
          created_at: Timestamp.fromDate(new Date()),
          profile_img_url: this.MY.profile_img,
          display_name: name,
          msg: resultMsg,
          read: false,
          uid: this.UID,
        }).then(async (docRef) => {
          await updateDoc(
            doc(firestore, `Users/${this.TID}/Posts`, docRef.id),
            {
              cid: docRef.id,
            }
          );
        });
        toast.clearAll();
        toast.success("쪽지를 보냈습니다!", {
          autoClose: 2000,
          theme: isDarkMode(),
        });
        router.go(-1);
      } else {
        toast.error("내용을 입력해주세요!", {
          autoClose: 2000,
          theme: isDarkMode(),
        });
      }
    },
  },
};
