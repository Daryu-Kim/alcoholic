import MainHeaderComponent from "@/components/MainHeaderComponent.vue";
import MainFooterComponent from "@/components/MainFooterComponent.vue";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../modules/firebase";
import { toast } from "vue3-toastify";

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
          this.removeMarker();
          const temp = value.split("@");
          const filter = query(
            collection(firestore, "Places"),
            where("alcohols", "array-contains", temp[1])
          );
          this.addMarker(filter);
        } else if (value[0] == "#") {
          console.log("태그 검색");
          this.removeMarker();
          const temp = value.split("#");
          const filter = query(
            collection(firestore, "Places"),
            where("tags", "array-contains", temp[1])
          );
          this.addMarker(filter);
        } else {
          this.removeMarker();
          const filter = query(
            collection(firestore, "Places"),
            where("keywords", "array-contains", value)
          );
          this.addMarker(filter);
        }
      }
    },
    async addMarker(filter) {
      var marker;
      var bounds = new kakao.maps.LatLngBounds();
      const querySnapshot = await getDocs(filter);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        const pos = new kakao.maps.LatLng(doc.data().pos[0], doc.data().pos[1]);
        const content = `
        <div
          style="
            padding: 0.8rem 1.6rem;
            background-color: var(--background-color);
          "
        >
          <div
            style:"
              width: 400px;
              height: 200px;
              background-image: url(${doc.data().img});
              background-position: center;
              background-size: cover;
              background-repeat: no-repeat;
            "
          >
            <i class="fa-solid fa-x" @click="closeOverlay"></i>
          </div>
          <p
            class="bold"
            style="
              color: var(--primary-color);
              font-size: 1.8rem;
            "
          >${doc.data().name}</p>
        </div>
        `;
        marker = new kakao.maps.Marker({
          map: this.map,
          position: pos,
          image: this.locateImage,
        });
        var overlay = new kakao.maps.CustomOverlay({
          content: content,
          map: this.map,
          position: marker.getPosition(),
        });
        kakao.maps.event.addListener(marker, "click", function () {
          overlay.setMap(this.map);
        });
        marker.setMap(this.map);
        this.full_markers.push(marker);
        bounds.extend(pos);
        this.map.setBounds(bounds);
      });
    },
    removeMarker() {
      for (var i = 0; i < this.full_markers.length; i++) {
        this.full_markers[i].setMap(null);
      }
      this.full_markers = [];
    },
    closeOverlay() {
      this.closeOverlay.setMap(null);
    },
  },
};
