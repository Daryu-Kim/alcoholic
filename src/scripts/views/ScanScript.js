import router from "@/router";
import { QrcodeStream } from "vue3-qrcode-reader";
import { toast } from "vue3-toastify";
import { getRefreshCookie, setRefreshCookie } from "../modules/Cookie";

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
    console.log(getRefreshCookie());
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
      // QR Code 받아와서 정보 확인하고
      // 유효하지 않은 정보면 error 띄우고 modal 닫기
      // 유효한 정보면 간단한 정보 확인 후
      // 버튼 눌러서 localStorage에 장소랑 테이블 번호랑
      // 1시간 동안만 유효하게 설정하기.
      // localStorage에 제한시간이 안되면
      // Cookie에 제한시간 넣기.
      var temp = result.split(";");
      if (temp[2] == "Alcoholic") {
        await setRefreshCookie(temp[0], temp[1]);
        toast.loading("QR 인식이 완료되었습니다!\n홈으로 이동합니다!", {
          theme: this.is_dark,
        });
        setTimeout(() => {
          toast.clearAll();
          router.replace("/main");
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
