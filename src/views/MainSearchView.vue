<template>
  <div class="wrapper">
    <div id="map" ref="MAP">
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
