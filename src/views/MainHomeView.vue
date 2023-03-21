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
      <div class="home-recommend-title-box">
        <p class="home-recommend-title bold">이런 술집은 어떠세요?</p>
        <p class="home-recommend-des" @click="goRecommend">더보기</p>
      </div>
      <swiper :navigation="true" :modules="modules" class="home-recommend-list">
        <swiper-slide
          class="home-recommend-item"
          v-for="(item, index) in RECOMMEND_ITEM"
          :key="index"
          :style="{
            backgroundImage: `url(${item.img})`,
          }"
          @click="slideClick(item.pid)"
        >
          <div class="home-recommend-overlay">
            <p class="home-recommend-name bold">{{ item.name }}</p>
            <div class="home-recommend-tag-box">
              <p
                v-for="(item, index) in item.tags"
                :key="index"
                class="home-recommend-tag"
              >
                #{{ item }}
              </p>
            </div>
          </div>
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
