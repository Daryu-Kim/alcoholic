<template>
  <div class="wrapper">
    <div class="recommend-slide">
      <div class="recommend-title-box">
        <p class="recommend-title bold">이런 술집은 어떠세요?</p>
        <p class="recommend-filter bold pointer" @click="openFilter">필터</p>
      </div>
      <p v-if="RECOMMEND_ITEM.length == 0" class="recommend-no-doc bold">
        검색 결과가 없습니다!
      </p>
      <div class="recommend-list">
        <div
          class="recommend-item pointer"
          v-for="(item, index) in RECOMMEND_ITEM"
          :key="index"
          :style="{
            backgroundImage: `url(${item.img})`,
          }"
          @click="placeSlideClick(item.pid)"
        >
          <div class="recommend-overlay">
            <p class="recommend-name bold">{{ item.name }}</p>
            <div class="recommend-tag-box">
              <p
                v-for="(item, index) in item.tags"
                :key="index"
                class="recommend-tag"
              >
                #{{ item }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="overlay" ref="OVERLAY">
      <div class="overlay-box">
        <i class="fa-solid fa-x overlay-x pointer" @click="closeFilter"></i>
        <p class="overlay-title bold">필터</p>
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
        <p class="overlay-subtitle bold">🍺 술 종류</p>
        <div class="overlay-list">
          <div
            v-for="(item, index) in FILTER_ALCOHOL"
            :key="index"
            class="overlay-item"
          >
            <input
              type="radio"
              name="alcohol"
              :id="`alcohol${index}`"
              class="overlay-radio"
              :value="item"
              @change="alcoholChange($event)"
            />
            <label :for="`alcohol${index}`" class="overlay-label bold pointer">
              {{ item }}
            </label>
          </div>
        </div>
        <p class="overlay-subtitle bold">✅ 태그</p>
        <div class="overlay-list">
          <div
            v-for="(item, index) in FILTER_TAG"
            :key="index"
            class="overlay-item"
          >
            <input
              type="radio"
              name="tag"
              :id="`tag${index}`"
              class="overlay-radio"
              :value="item"
              @change="tagChange($event)"
            />
            <label :for="`tag${index}`" class="overlay-label bold pointer">
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

<script src="@/scripts/views/MainRecommendPlaceScript.js" />
