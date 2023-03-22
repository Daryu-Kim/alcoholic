<template>
  <div class="wrapper">
    <DialogHeaderComponent :title="SELECTED_PLACE.name" />
    <div class="place">
      <div
        class="place-thumbnail"
        :style="{
          backgroundImage: `url(${SELECTED_PLACE.img})`,
        }"
      ></div>
      <div class="overlay-box">
        <p class="overlay-name bold">{{ SELECTED_PLACE.name }}</p>
        <p class="overlay-address">{{ SELECTED_PLACE.address }}</p>
        <div class="overlay-tag-box">
          <p
            v-for="(item, index) in SELECTED_PLACE.tags"
            :key="index"
            class="overlay-tag"
          >
            #{{ item }}
          </p>
        </div>
        <div class="overlay-func-box">
          <a :href="`tel:${SELECTED_PLACE.tel}`" class="overlay-func-item">
            <i class="fa-solid fa-phone"></i>
            <p>전화</p>
          </a>
          <a :href="SELECTED_ROAD" target="_blank" class="overlay-func-item">
            <i class="fa-solid fa-location-dot"></i>
            <p>길찾기</p>
          </a>
          <div class="overlay-func-item" @click="goChat">
            <i class="fa-solid fa-comments"></i>
            <p>채팅</p>
          </div>
          <div class="overlay-func-item" @click="goShare">
            <i class="fa-solid fa-share"></i>
            <p>공유</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="@/styles/views/PlaceStyle.css" />

<script src="@/scripts/views/PlaceScript.js" />
