<template>
  <div class="wrapper">
    <div class="recommend-menu">
      <input
        type="radio"
        name="recommend"
        id="place"
        class="recommend-radio display-none"
        ref="RECOMMEND_PLACE"
      />
      <label for="place" class="recommend-menu-item bold" @click="clickPlace">
        술집 추천
      </label>
      <input
        type="radio"
        name="recommend"
        id="user"
        class="recommend-radio display-none"
        ref="RECOMMEND_USER"
      />
      <label for="user" class="recommend-menu-item bold" @click="clickUser">
        친구 추천
      </label>
    </div>
    <router-view class="recommend-router" />
  </div>
</template>

<style scoped src="@/styles/views/MainRecommendStyle.css" />

<script src="@/scripts/views/MainRecommendScript.js" />
