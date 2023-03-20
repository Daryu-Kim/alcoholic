import MainHeaderComponent from "@/components/MainHeaderComponent.vue";
import MainFooterComponent from "@/components/MainFooterComponent.vue";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../modules/firebase";

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
      locateSrc: "../../assets/locate_marker.svg",
      currentSrc: "../../assets/locate_marker.svg",
      markerSize: null,
      locateImage: null,
      currentImage: null,
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
      // const container = document.getElementById("map");
      const container = this.$refs.MAP;
      this.markerSize = new kakao.maps.Size(24, 24);
      this.locateImage = new kakao.maps.MarkerImage(
        this.locateSrc,
        this.markerSize
      );
      this.currentImage = new kakao.maps.MarkerImage(
        this.currentSrc,
        this.markerSize
      );
      const querySnapshot = await getDocs(collection(firestore, "Places"));

      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const pos = new kakao.maps.LatLng(lat, lng);
        const options = {
          center: pos,
          level: 3,
        };

        this.map = new kakao.maps.Map(container, options);
        var marker = new kakao.maps.Marker({
          map: this.map,
          position: pos,
          image: this.currentImage,
        });
        marker.setMap(this.map);
      });
      querySnapshot.forEach((doc) => {
        this.marker.push({
          position: new kakao.maps.LatLng(
            doc.data().latitude,
            doc.data().longitude
          ),
          title: doc.data().name,
        });
      });

      for (var i = 0; i < this.marker.length; i++) {
        var marker = new kakao.maps.Marker({
          map: this.map,
          position: this.marker[i].position,
          title: this.marker[i].title,
          // image: markerImage,
        });
        marker.setMap(this.map);
      }
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
  },
};
