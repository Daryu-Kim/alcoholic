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
      <p class="home-recommend-title bold">다른 사람들의</p>
      <p class="home-recommend-title bold">소식도 접해보세요!</p>
      <div class="home-recommend-list">
        <div
          class="home-recommend-item"
          v-for="(item, index) in RECOMMEND_ITEM"
          :key="index"
        >
          <div class="home-recommend-item-profile-box">
            <div class="home-recommend-item-profile-img"></div>
            <p class="home-recommend-item-profile-name bold">jio</p>
          </div>
          <div class="home-recommend-item-img"></div>
          <p class="home-recommend-item-text">{{ item[0] }}</p>
          <p class="home-recommend-item-timestamp">10분 전</p>
        </div>
      </div>
    </div>
    <div class="home-function-box">
      <i class="fa-solid fa-link" v-if="!PID" @click="toLink"></i>
      <i class="fa-solid fa-link-slash" v-else @click="toUnlink"></i>
      <i class="fa-solid fa-plus" @click="toAddTimeline"></i>
    </div>
  </div>
</template>

<style scoped src="@/styles/views/MainHomeStyle.css" />

<script src="@/scripts/views/MainHomeScript.js" />
