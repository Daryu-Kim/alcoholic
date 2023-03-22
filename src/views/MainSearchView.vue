<template>
  <div class="wrapper">
    <div id="map" ref="MAP">
      <div class="search-box">
        <input
          type="text"
          class="search-input"
          ref="SEARCH_INPUT"
          @keyup.enter="searchClick"
          placeholder="검색어 입력 [@: 술 종류, #: 태그]"
        />
        <i class="fa-solid fa-magnifying-glass" @click="searchClick"></i>
      </div>
      <div class="control-box">
        <i class="fa-solid fa-magnifying-glass-plus" @click="zoomInClick"></i>
        <i class="fa-solid fa-magnifying-glass-minus" @click="zoomOutClick"></i>
        <i
          class="fa-solid fa-magnifying-glass-location"
          @click="locationClick"
        ></i>
      </div>
    </div>
    <div class="overlay" ref="OVERLAY" @click="hideOverlay">
      <div class="overlay-layout">
        <div
          class="overlay-img"
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
  </div>
</template>

<style scoped src="@/styles/views/MainSearchStyle.css" />

<script src="@/scripts/views/MainSearchScript.js" />
