import router from "@/router";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "vue3-toastify";
import { getRefreshCookie } from "../modules/Cookie";
import { firestore } from "../modules/firebase";

export default {
  name: "MainFooterComponent",
  data() {
    return {
      is_dark: "",
    };
  },
  async mounted() {
    const user_id = localStorage.getItem("UID");
    const account_img = document.querySelector(".footer-item-account");
    const docSnap = await getDoc(doc(firestore, "Users", user_id));

    this.isDarkMode() ? (this.is_dark = "dark") : (this.is_dark = "light");

    if (docSnap.exists()) {
      account_img.style.backgroundImage = `url(${docSnap.data().profile_img})`;
    }
  },
  methods: {
    isDarkMode() {
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    },
    homeClick() {
      router.push("/main/home");
    },
    searchClick() {
      router.push("/main/search");
    },
    orderClick() {
      if (!getRefreshCookie()[0] != "") {
        toast.loading("QR 인식창으로 이동합니다.", {
          theme: this.is_dark,
        });
        setTimeout(() => {
          toast.clearAll();
          router.push("/scan");
        }, 2000);
      } else {
        router.push("/main/order");
      }
    },
    chatClick() {
      if (!getRefreshCookie()[0] != "") {
        toast.loading("QR 인식창으로 이동합니다.", {
          theme: this.is_dark,
        });
        setTimeout(() => {
          toast.clearAll();
          router.push("/scan");
        }, 2000);
      } else {
        router.push("/main/chat");
      }
    },
  },
};
