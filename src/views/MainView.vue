<template>
  <div class="wrapper">
    <MainHeaderComponent />
    <router-view></router-view>
    <MainFooterComponent />
    <div v-if="isCookie" class="main-timeout-label">
      <img src="@/assets/refresh_time.svg" class="main-timeout-icon pointer" />
      <p class="main-timeout-text bold">갱신 완료!</p>
    </div>
  </div>
</template>

<style src="@/styles/views/MainStyle.css" />

<script src="@/scripts/views/MainScript.js" />
