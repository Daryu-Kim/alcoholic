<template>
  <div class="wrapper">
    <div class="recommend-slide">
      <div class="recommend-title-box">
        <p class="recommend-title bold">한번 친해져보세요!</p>
        <p class="recommend-filter bold pointer" @click="openFilter">필터</p>
      </div>
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
    <div class="overlay"></div>
  </div>
</template>

<style scoped src="@/styles/views/MainRecommendStyle.css" />

<script src="@/scripts/views/MainRecommendUserScript.js" />
