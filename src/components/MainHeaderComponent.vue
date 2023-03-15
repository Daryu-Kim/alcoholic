<template>
  <div class="header">
    <div class="header-logo pointer" @click="goMain">
      <i class="fa-solid fa-wine-bottle"></i>
      <p class="header-logo-title bold">Alcoholic</p>
    </div>
    <div class="header-btn-box">
      <i
        v-if="isLinked"
        class="fa-solid fa-link-slash pointer"
        @click="unLink"
      ></i>
      <i v-else class="fa-solid fa-qrcode pointer" @click="scanQRCode"></i>
    </div>
  </div>
</template>

<style scoped src="../styles/components/MainHeaderStyle.css" />

<script src="../scripts/components/MainHeaderScript.js" />
