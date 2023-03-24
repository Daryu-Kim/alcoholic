import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../modules/firebase";
import router from "@/router";
import { toastError } from "../modules/Functions";
import MultiRangeSlider from "multi-range-slider-vue";
import "multi-range-slider-vue";

export default {
  name: "MainRecommendUserView",
  components: {
    MultiRangeSlider,
  },
  data() {
    return {
      UID: localStorage.getItem("UID"),
      RECOMMEND_USER: [],
      CURRENT_YEAR: "",
      FILTER_AREA: [],
      FILTER_GENDER: [],
      CHK_AREA: "",
      CHK_ALCOHOL: "",
      CHK_TAG: "",
      MIN_VALUE: 20,
      MAX_VALUE: 35,
    };
  },
  async mounted() {
    this.CURRENT_YEAR = new Date().getFullYear();
    const allSnapshot = await getDocs(collection(firestore, "Users"));
    allSnapshot.forEach((doc) => {
      if (doc.data().uid != this.UID) {
        this.RECOMMEND_USER.push(doc.data());
      }
    });

    const filterSnapshot = await getDoc(
      doc(firestore, "Settings", "UserFilter")
    );
    if (filterSnapshot.exists()) {
      this.FILTER_AREA = filterSnapshot.data().area;
      this.FILTER_GENDER = filterSnapshot.data().gender;
    }
  },
  methods: {
    userSlideClick(uid) {
      router.push({
        path: "/profile",
        query: {
          UID: uid,
        },
      });
    },
    openFilter() {
      this.$refs.OVERLAY.style.display = "flex";
    },
    closeFilter() {
      const radio = document.querySelectorAll(".overlay-radio");
      radio.forEach((element) => {
        element.checked = false;
      });
      this.CHK_AREA = "";
      this.CHK_ALCOHOL = "";
      this.CHK_TAG = "";
      this.$refs.OVERLAY.style.display = "none";
    },
    updateValues(e) {
      this.MIN_VALUE = e.minValue;
      this.MAX_VALUE = e.maxValue;
      console.log(this.MIN_VALUE, this.MAX_VALUE);
    },
    areaChange(event) {
      if (event.target.checked) {
        this.CHK_AREA = event.target.value;
      }
    },
    alcoholChange(event) {
      if (event.target.checked) {
        this.CHK_ALCOHOL = event.target.value;
      }
    },
    tagChange(event) {
      if (event.target.checked) {
        this.CHK_TAG = event.target.value;
      }
    },
    async resetClick() {
      this.RECOMMEND_ITEM = [];

      const allSnapshot = await getDocs(collection(firestore, "Places"));
      allSnapshot.forEach((doc) => {
        this.RECOMMEND_ITEM.push(doc.data());
      });
      this.closeFilter();
    },
    async searchClick() {
      if (this.CHK_AREA) {
        if (this.CHK_ALCOHOL) {
          if (this.CHK_TAG) {
            console.log("Check!");
            const filter = query(
              collection(firestore, "Places"),
              where("filter_area", "==", this.CHK_AREA),
              where("filter_alcohol", "array-contains", this.CHK_ALCOHOL),
              where("filter_tag", "==", this.CHK_TAG)
            );
            this.RECOMMEND_ITEM = [];
            const filterSnapshot = await getDocs(filter);
            filterSnapshot.forEach((snapshot) => {
              this.RECOMMEND_ITEM.push(snapshot.data());
            });
            this.closeFilter();
          } else {
            toastError("태그를 선택해주세요!");
          }
        } else {
          toastError("술 종류를 선택해주세요!");
        }
      } else {
        toastError("지역을 선택해주세요!");
      }
    },
  },
};
