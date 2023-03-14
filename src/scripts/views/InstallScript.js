import router from "@/router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "InstallView",
  data() {
    return {
      device_info: null,
      defferedPrompt: null,
    };
  },
  created() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.defferedPrompt = e;
    });
  },
  mounted() {
    if (this.isRunningStandalone()) {
      router.push("/");
    }
    const mobile_os = this.chkMobileOS();
    if (mobile_os === 0) {
      console.log("Android");
      this.device_info = "Android";
    } else if (mobile_os === 1) {
      console.log("iOS");
      this.device_info = "iOS";
    } else {
      console.log("Not Compatable!");
      toast.error("지원하지 않는 기기입니다!", {
        autoClose: 2000,
        theme: "colored",
      });
      setTimeout(() => {
        window.close();
      }, 2000);
    }
  },
  methods: {
    isRunningStandalone() {
      return window.matchMedia("(display-mode: standalone)").matches;
    },
    chkMobileOS() {
      var user_agent = navigator.userAgent.toLowerCase();

      if (user_agent.indexOf("android") > -1) {
        // Android
        return 0;
      } else if (
        user_agent.indexOf("iphone") > -1 ||
        user_agent.indexOf("ipad") > -1 ||
        user_agent.indexOf("ipod") > -1
      ) {
        // Apple
        return 1;
      } else {
        // Other OS
        return 2;
      }
    },
    install() {
      if (this.defferedPrompt === null) {
        toast.error("이미 설치되어 있습니다!", {
          autoClose: 2000,
          theme: "colored",
        });
      } else {
        this.defferedPrompt.prompt();
      }
    },
  },
};
