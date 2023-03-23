import router from "@/router";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "vue3-toastify";
import { firestore } from "../modules/firebase";
import { isDarkMode } from "../modules/Functions";
import { getSessionStorage } from "../modules/Storage";

export default {
  name: "MainFooterComponent",
  async mounted() {
    const currentRoute = router.currentRoute.value.href;
    if (currentRoute == "/main/home") {
      this.$refs.FOOTER_HOME.checked = true;
    } else if (currentRoute == "/main/search") {
      this.$refs.FOOTER_SEARCH.checked = true;
    } else if (currentRoute == "/main/recommend") {
      this.$refs.FOOTER_RECOMMEND.checked = true;
    } else if (currentRoute == "/main/chat") {
      this.$refs.FOOTER_CHAT.checked = true;
    } else {
      this.$refs.FOOTER_ACCOUNT.checked = true;
    }
    const user_id = localStorage.getItem("UID");
    const account_img = document.querySelector(".footer-item-account");
    const docSnap = await getDoc(doc(firestore, "Users", user_id));

    if (docSnap.exists()) {
      account_img.style.backgroundImage = `url(${docSnap.data().profile_img})`;
    }
  },
  methods: {
    homeClick() {
      router.replace("/main/home");
    },
    searchClick() {
      router.replace("/main/search");
    },
    recommendClick() {
      router.replace("/main/recommend");
    },
    chatClick() {
      if (!getSessionStorage("PLACE_ID")) {
        toast.loading("QR 인식창으로 이동합니다.", {
          theme: isDarkMode(),
        });
        setTimeout(() => {
          toast.clearAll();
          router.push("/scan");
        }, 2000);
      } else {
        router.replace("/main/chat");
      }
    },
    profileClick() {
      router.replace("/main/profile");
    },
  },
};
