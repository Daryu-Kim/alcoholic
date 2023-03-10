<template>
  <div class="wrapper">
    <div class="content">
      <swiper
        :slides-per-view="2"
        :pagination="true"
        :navigation="true"
        :autoplay="true"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        modules="modules"
      >
        <swiper-slide class="slide">1</swiper-slide>
        <swiper-slide class="slide">2</swiper-slide>
        <swiper-slide class="slide">3</swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style src="@/styles/views/RegisterStyle.css" />

<script defer src="@/scripts/views/RegisterScript.js" />
