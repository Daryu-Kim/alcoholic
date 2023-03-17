<template>
  <div class="wrapper">
    <div class="home-title-box">
      <p class="home-title bold">
        {{ USER_NAME }}
        <span class="home-title-sla">님</span>
      </p>
      <p class="home-title-des" v-if="PID">
        {{ PNAME }}에서<br />재밌게 놀고 계신가요?
      </p>
      <p class="home-title-des" v-else>어디 계세요..?</p>
    </div>
    <div class="home-recommend-box">
      <p class="home-recommend-title bold">이런 활동은 어때요?</p>
      <swiper
        class="home-recommend-swiper"
        v-if="PID"
        :slides-per-view="1"
        :space-between="16"
        :centeredSlides="true"
      >
        <swiper-slide
          v-for="(item, index) in RECOMMEND_ITEM"
          :key="index"
          class="home-recommend-slide"
          :style="{
            backgroundColor: item[2],
          }"
        >
          <p :style="{ color: item[3] }">{{ item[0] }}</p>
          <p>{{ item[1] }}</p>
        </swiper-slide>
      </swiper>
    </div>
    <div class="home-function-box">
      <i class="fa-solid fa-link" v-if="!PID" @click="toLink"></i>
      <i class="fa-solid fa-link-slash" v-else @click="toUnlink"></i>
    </div>
  </div>
</template>

<style scoped src="@/styles/views/MainHomeStyle.css" />

<script src="@/scripts/views/MainHomeScript.js" />
