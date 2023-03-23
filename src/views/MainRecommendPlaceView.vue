<template>
  <div class="wrapper">
    <div class="recommend-slide">
      <div class="recommend-title-box">
        <p class="recommend-title bold">이런 술집은 어떠세요?</p>
        <p class="recommend-filter bold pointer" @click="openFilter">필터</p>
      </div>
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
  </div>
</template>

<style scoped src="@/styles/views/MainRecommendStyle.css" />

<script src="@/scripts/views/MainRecommendPlaceScript.js" />
