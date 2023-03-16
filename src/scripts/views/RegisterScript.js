import router from "@/router";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { toast } from "vue3-toastify";
import { firestore, storage } from "../modules/firebase";

export default {
  name: "RegisterView",
  data() {
    return {
      slide_data: [
        ["닉네임을 입력해주세요!", "NAME"],
        ["당신은 몇년생이십니까?", "AGE"],
        ["당신의 성별이 어떻게 되십니까?", "GENDER"],
        ["대표 프로필 사진을 올려주세요!", "IMAGE"],
      ],
      range_year: [],
      temp_name: "",
      temp_age: 0,
      temp_gender: "",
      temp_img: "",
      is_dark: "",
    };
  },
  mounted() {
    const MAX_SLIDE = this.$refs.SLIDE.length;
    this.$refs.SLIDE.forEach((element, index) => {
      element.style.zIndex = MAX_SLIDE - index;
    });

    const current_year = new Date().getFullYear();
    const min_year = current_year - 20 + 1;
    const max_year = current_year - 35 + 1;

    for (let i = min_year; i > max_year; i--) {
      this.range_year.push(i);
    }

    this.isDarkMode() ? (this.is_dark = "dark") : (this.is_dark = "light");
  },
  methods: {
    isDarkMode() {
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    },
    changeName(event) {
      this.temp_name = event.target.value;
    },
    changeAge(event) {
      this.temp_age = Number(event.target.value);
    },
    changeGender(event) {
      this.temp_gender = event.target.value;
    },
    changeImage(event) {
      const profile_img = document.querySelector(".register-slide-img");
      const profile_img_plus = document.querySelector(".fa-plus");
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.onloadend = function () {
          profile_img.style.backgroundImage = `url(${reader.result})`;
          profile_img_plus.style.display = "none";
        };
        reader.readAsDataURL(event.target.files[0]);
        this.temp_img = event.target.files[0];
      } else {
        profile_img.style.backgroundImage = "";
        profile_img_plus.style.display = "block";
        this.temp_img = "";
      }
    },
    toastError(msg) {
      toast.error(msg, {
        autoClose: 2000,
        theme: "colored",
      });
    },
    async uploadProfileImage(image, id) {
      const storageRef = ref(storage, `Users/${id}/profile_image.png`);
      const response = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(response.ref);
      return url;
    },
    async nextBtn(ref) {
      var index;
      switch (ref) {
        // Slide Name
        case "NAME":
          if (!this.temp_name) {
            this.toastError("닉네임을 입력해주세요!");
          } else {
            index = 0;
          }
          break;

        // Slide Age
        case "AGE":
          // 값 없을때 예외처리하기.
          if (!this.temp_age) {
            this.toastError("출생연도를 선택해주세요!");
          } else {
            index = 1;
          }
          break;

        // Slide Gender
        case "GENDER":
          if (!this.temp_gender) {
            this.toastError("성별을 선택해주세요!");
          } else {
            index = 2;
          }
          break;

        // Slide Image
        case "IMAGE":
          if (!this.temp_img) {
            this.toastError("이미지를 업로드해주세요!");
          } else {
            const user_id = localStorage.getItem("UID");

            toast.loading("회원 정보를 생성중입니다!", {
              theme: this.is_dark,
            });

            var img_url = await this.uploadProfileImage(this.temp_img, user_id);
            await updateDoc(doc(firestore, "Users", user_id), {
              profile_img: img_url,
              name: this.temp_name,
              age: this.temp_age,
              gender: this.temp_gender,
              verified: true,
            });
            toast.clearAll();
            router.replace("/main");
          }
          break;

        default:
          break;
      }
      this.$refs.SLIDE[index].style.transform = "translateX(-100vw)";
    },
  },
};
