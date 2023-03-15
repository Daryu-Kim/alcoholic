<template>
  <div class="wrapper" ref="WRAPPER">
    <div class="slide-progress"></div>
    <div
      class="register-slide"
      ref="SLIDE"
      v-for="(item, index) in slide_data"
      :key="index"
    >
      <p class="register-slide-title bold">
        {{ item[0] }}
      </p>
      <p class="register-slide-des regular">다른 사람들에게 공개됩니다:)</p>
      <div class="register-slide-item" v-if="item[1] == 'NAME'">
        <input
          type="text"
          placeholder="8자 이하로 입력해주세요"
          maxlength="8"
          class="register-slide-name"
          @change="changeName($event)"
          @keyup.enter="nextBtn(item[1])"
          ref="SLIDE_NAME"
        />
      </div>
      <!-- 출생연도 선택 Slide -->
      <div class="register-slide-item" v-else-if="item[1] == 'AGE'">
        <select @change="changeAge($event)" class="register-slide-age">
          <option value="" class="register-slide-option">선택</option>
          <option
            v-for="(item, index) in range_year"
            :key="index"
            :value="item"
            class="register-slide-option"
          >
            {{ item }}년생
          </option>
        </select>
      </div>
      <!-- 성별 선택 Slide -->
      <div class="register-slide-item" v-else-if="item[1] == 'GENDER'">
        <input
          class="display-none register-slide-gender-radio"
          type="radio"
          id="woman"
          name="gender"
          value="여"
          @change="changeGender($event)"
          ref="GENDER_WOMAN"
        />
        <label class="register-slide-gender" for="woman">여자</label>
        <input
          class="display-none register-slide-gender-radio"
          type="radio"
          id="man"
          name="gender"
          value="남"
          @change="changeGender($event)"
          ref="GENDER_MAN"
        />
        <label class="register-slide-gender" for="man">남자</label>
      </div>
      <!-- 프로필 사진 업로드 Slide -->
      <div v-else class="register-slide-img-box">
        <input
          type="file"
          class="display-none"
          id="profile-img"
          @change="changeImage($event)"
          accept="image/*"
        />
        <label for="profile-img" class="register-slide-img" ref="PROFILE_IMG">
          <i class="fa-solid fa-plus"></i>
        </label>
      </div>
      <p class="register-next-btn bold" @click="nextBtn(item[1])">다음</p>
    </div>
  </div>
</template>

<style scoped src="@/styles/views/RegisterStyle.css" />

<script src="@/scripts/views/RegisterScript.js" />
