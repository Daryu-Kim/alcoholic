import DialogHeaderComponent from "@/components/DialogHeaderComponent.vue";
import router from "@/router";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../modules/firebase";
import { setSessionStorage } from "../modules/Storage";

export default {
  name: "PlaceView",
  components: {
    DialogHeaderComponent,
  },
  data() {
    return {
      PID: this.$route.query.PID,
      SELECTED_PLACE: [],
      SELECTED_ROAD: "",
    };
  },
  async mounted() {
    const placeDoc = await getDoc(doc(firestore, "Places", this.PID));
    if (placeDoc.exists()) {
      this.SELECTED_PLACE = placeDoc.data();
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      this.SELECTED_ROAD = `http://map.naver.com/index.nhn?slng=${lng}&slat=${lat}&stext=내+위치&elng=${this.SELECTED_PLACE.pos[1]}&elat=${this.SELECTED_PLACE.pos[0]}&pathType=0&showMap=true&etext=${this.SELECTED_PLACE.name}&menu=route`;
    });
  },
  methods: {
    goChat() {
      setSessionStorage("PLACE_ID", this.SELECTED_PLACE.pid);
      router.go(-1);
      setTimeout(() => {
        router.replace("/main/chat");
      }, 500);
    },
    goShare() {
      navigator.share({
        title: "Alcoholic 장소 공유",
        text: `${this.SELECTED_PLACE.name} 주점으로 오시는 길 안내입니다!`,
        url: this.SELECTED_ROAD,
      });
    },
  },
};
