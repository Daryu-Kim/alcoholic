<template>
  <div class="wrapper">
    <div class="recommend-slide">
      <div class="recommend-title-box">
        <p class="recommend-title bold">한번 친해져보세요!</p>
        <p class="recommend-filter bold pointer" @click="openFilter">필터</p>
      </div>
      <p v-if="RECOMMEND_USER.length == 0" class="recommend-no-doc bold">
        검색 결과가 없습니다!
      </p>
      <div class="recommend-list">
        <div
          class="recommend-item pointer"
          v-for="(item, index) in RECOMMEND_USER"
          :key="index"
          :style="{
            backgroundImage: `url(${item.profile_img})`,
          }"
          @click="userSlideClick(item.uid)"
        >
          <div class="recommend-overlay">
            <div class="recommend-name-box">
              <p class="recommend-name bold">{{ item.name }}</p>
              <p class="recommend-info">
                {{ CURRENT_YEAR - item.age + 1 }} | {{ item.gender }}
              </p>
            </div>
            <p v-if="item.des" class="recommend-des">{{ item.des }}</p>
            <p v-else class="recommend-des">자기소개가 없습니다!</p>
          </div>
        </div>
      </div>
    </div>
    <div class="overlay" ref="OVERLAY">
      <div class="overlay-box">
        <i class="fa-solid fa-x overlay-x pointer" @click="closeFilter"></i>
        <p class="overlay-title bold">필터</p>
        <p class="overlay-subtitle bold">⚥ 성별</p>
        <div class="overlay-list">
          <div
            v-for="(item, index) in FILTER_GENDER"
            :key="index"
            class="overlay-item"
          >
            <input
              type="radio"
              name="gender"
              :id="`gender${index}`"
              class="overlay-radio"
              :value="item"
              @change="genderChange($event)"
            />
            <label :for="`gender${index}`" class="overlay-label bold pointer">
              {{ item }}
            </label>
          </div>
        </div>
        <div class="overlay-subtitle-box">
          <p class="overlay-subtitle bold">🎂 나이</p>
          <p class="overlay-subinfo bold">{{ MIN_VALUE }} - {{ MAX_VALUE }}</p>
        </div>
        <div class="overlay-list">
          <MultiRangeSlider
            :baseClassName="'multi-range-slider'"
            :min="20"
            :max="35"
            :step="1"
            :ruler="false"
            :label="false"
            :minValue="MIN_VALUE"
            :maxValue="MAX_VALUE"
            @input="updateValues"
          />
        </div>
        <p class="overlay-subtitle bold">🗺️ 지역</p>
        <div class="overlay-list">
          <div
            v-for="(item, index) in FILTER_AREA"
            :key="index"
            class="overlay-item"
          >
            <input
              type="radio"
              name="area"
              :id="`area${index}`"
              class="overlay-radio"
              :value="item"
              @change="areaChange($event)"
            />
            <label :for="`area${index}`" class="overlay-label bold pointer">
              {{ item }}
            </label>
          </div>
        </div>
        <div class="overlay-btn-box">
          <p class="overlay-btn reset bold pointer" @click="resetClick">
            초기화
          </p>
          <p class="overlay-btn search bold pointer" @click="searchClick">
            검색
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="@/styles/views/MainRecommendStyle.css" />

<script src="@/scripts/views/MainRecommendUserScript.js" />
