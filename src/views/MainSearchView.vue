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
  </div>
</template>

<style scoped src="@/styles/views/MainSearchStyle.css" />

<script src="@/scripts/views/MainSearchScript.js" />
