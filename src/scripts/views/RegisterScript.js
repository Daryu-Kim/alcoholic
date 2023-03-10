import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default {
  name: "RegisterView",
  components: {
    Swiper,
    SwiperSlide,
  },
  mounted() {
    this.$refs.REF.activeIndex = 3;
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("Slide Changed!");
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Pagination, Navigation, Autoplay],
    };
  },
};
