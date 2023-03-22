import MainHeaderComponent from "@/components/MainHeaderComponent.vue";
import MainFooterComponent from "@/components/MainFooterComponent.vue";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../modules/firebase";
import { toast } from "vue3-toastify";
import { setSessionStorage } from "../modules/Storage";
import router from "@/router";

export default {
  name: "MainSearchView",
  components: {
    MainHeaderComponent,
    MainFooterComponent,
  },
  data() {
    return {
      map: null,
      marker: [],
      locateSrc:
        "https://raw.githubusercontent.com/Daryu-Kim/alcoholic/7ee087326ab4f9a562e9b1c1f47577a624507256/src/assets/locate_marker.svg",
      currentSrc:
        "https://raw.githubusercontent.com/Daryu-Kim/alcoholic/ebcc2c8859fe668d10fb092070ef589fa4265830/src/assets/current_marker.svg",
      markerSize: null,
      locateImage: null,
      currentImage: null,
      full_markers: [],
      OVERLAY: "",
      SELECTED_PLACE: [],
      SELECTED_ROAD: "",
      myLAT: 0,
      myLNG: 0,
      isBounds: false,
    };
  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=2ba32a1ab4e1707cfd208195965036c6&autoload=false";
      /* global kakao */
      script.onload = () => kakao.maps.load(this.loadMap);

      document.head.appendChild(script);
    } else {
      console.log("이미 로드되었습니다!");
      this.loadMap();
    }
  },
  methods: {
    async loadMap() {
      // 함수 내 변수 설정.
      const container = this.$refs.MAP;
      this.markerSize = new kakao.maps.Size(48, 48);
      this.locateImage = new kakao.maps.MarkerImage(
        this.locateSrc,
        this.markerSize
      );
      this.currentImage = new kakao.maps.MarkerImage(
        this.currentSrc,
        this.markerSize
      );
      var marker;
      const querySnapshot = await getDocs(collection(firestore, "Places"));

      // GPS 정보 받아와서 marker 표시.
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.myLAT = lat;
        this.myLNG = lng;
        const pos = new kakao.maps.LatLng(lat, lng);
        const options = {
          center: pos,
          level: 1,
        };

        this.map = new kakao.maps.Map(container, options);
        marker = new kakao.maps.Marker({
          map: this.map,
          position: pos,
          image: this.currentImage,
        });
        marker.setMap(this.map);
      });

      // Places 데이터 불러와서 Marker로 표시.
      querySnapshot.forEach((doc) => {
        var pos = new kakao.maps.LatLng(doc.data().pos[0], doc.data().pos[1]);
        marker = new kakao.maps.Marker({
          map: this.map,
          position: pos,
          image: this.locateImage,
        });
        marker.setMap(this.map);
        this.full_markers.push(marker);
      });

      const filter = collection(firestore, "Places");
      this.addMarker(filter);
    },
    zoomInClick() {
      this.map.setLevel(this.map.getLevel() - 1);
    },
    zoomOutClick() {
      this.map.setLevel(this.map.getLevel() + 1);
    },
    locationClick() {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const getGPS = new kakao.maps.LatLng(lat, lng);

        this.map.setCenter(getGPS);
      });
    },
    async searchClick() {
      var value = this.$refs.SEARCH_INPUT.value;
      if (!value) {
        toast.error("검색어를 입력해주세요!", {
          autoClose: 2000,
          theme: "colored",
        });
      } else {
        if (value[0] == "@") {
          console.log("술 종류 검색");
          const temp = value.split("@");
          const filter = query(
            collection(firestore, "Places"),
            where("alcohols", "array-contains", temp[1])
          );
          this.isBounds = true;
          this.addMarker(filter);
        } else if (value[0] == "#") {
          console.log("태그 검색");
          const temp = value.split("#");
          const filter = query(
            collection(firestore, "Places"),
            where("tags", "array-contains", temp[1])
          );
          this.isBounds = true;
          this.addMarker(filter);
        } else {
          const filter = query(
            collection(firestore, "Places"),
            where("keywords", "array-contains", value)
          );
          this.isBounds = true;
          this.addMarker(filter);
        }
      }
    },
    async addMarker(filter) {
      var marker;
      var bounds = new kakao.maps.LatLngBounds();
      this.removeMarker();
      const querySnapshot = await getDocs(filter);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        const pos = new kakao.maps.LatLng(doc.data().pos[0], doc.data().pos[1]);
        marker = new kakao.maps.Marker({
          map: this.map,
          position: pos,
          image: this.locateImage,
        });
        kakao.maps.event.addListener(marker, "click", () => {
          this.SELECTED_PLACE = doc.data();
          this.SELECTED_ROAD = `http://map.naver.com/index.nhn?slng=${this.myLNG}&slat=${this.myLAT}&stext=내+위치&elng=${this.SELECTED_PLACE.pos[1]}&elat=${this.SELECTED_PLACE.pos[0]}&pathType=0&showMap=true&etext=${this.SELECTED_PLACE.name}&menu=route`;
          this.showOverlay();
        });
        marker.setMap(this.map);
        this.full_markers.push(marker);
        bounds.extend(pos);
        if (this.isBounds) {
          this.map.setBounds(bounds);
        }
      });
    },
    removeMarker() {
      for (var i = 0; i < this.full_markers.length; i++) {
        this.full_markers[i].setMap(null);
      }
      this.full_markers = [];
    },
    showOverlay() {
      this.$refs.OVERLAY.style.display = "flex";
    },
    hideOverlay() {
      this.$refs.OVERLAY.style.display = "none";
    },
    goChat() {
      setSessionStorage("PLACE_ID", this.SELECTED_PLACE.pid);
      router.replace("/main/chat");
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
