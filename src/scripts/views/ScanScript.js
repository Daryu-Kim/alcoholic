import router from "@/router";
import { QrcodeStream } from "vue3-qrcode-reader";
import { toast } from "vue3-toastify";
import { setSessionStorage } from "../modules/Storage";

export default {
  name: "ScanView",
  components: {
    QrcodeStream,
  },
  data() {
    return {
      camera: "rear",
      noRearCamera: false,
      noFrontCamera: false,
      torchActive: false,
      is_dark: "",
    };
  },
  mounted() {
    this.isDarkMode() ? (this.is_dark = "dark") : (this.is_dark = "light");
  },
  methods: {
    isDarkMode() {
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    },
    switchTorch() {
      switch (this.torchActive) {
        case true:
          this.torchActive = false;
          break;
        case false:
          this.torchActive = true;
          break;
      }
    },
    switchCamera() {
      switch (this.camera) {
        case "front":
          this.camera = "rear";
          break;
        case "rear":
          this.camera = "front";
          break;
      }
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        const triedFrontCamera = this.camera === "front";
        const triedRearCamera = this.camera === "rear";
        const cameraMissingError = error.name === "OverconstrainedError";

        if (triedRearCamera && cameraMissingError) {
          this.noRearCamera = true;
        }

        if (triedFrontCamera && cameraMissingError) {
          this.noFrontCamera = true;
        }

        console.error(error);
      }
    },
    async onDecode(result) {
      var temp = result.split(";");
      if (temp[2] == "Alcoholic") {
        setSessionStorage("PLACE_ID", temp[0]);
        setSessionStorage("TABLE_ID", temp[1]);
        toast.loading("QR 인식이 완료되었습니다!\n홈으로 이동합니다!", {
          theme: this.is_dark,
        });
        setTimeout(() => {
          toast.clearAll();
          router.go(-1);
        }, 2000);
      } else {
        toast.error("유효한 QR코드가 아닙니다!\n다시 인식시켜주세요!", {
          autoClose: 2000,
          theme: "colored",
        });
      }
    },
  },
};
