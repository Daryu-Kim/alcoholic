<template>
  <div class="header">
    <div class="header-logo pointer" @click="goMain">
      <i class="fa-solid fa-wine-bottle"></i>
      <p class="header-logo-title bold">Alcoholic</p>
    </div>
    <i class="fa-solid fa-paper-plane pointer" @click="goPostList">
      <div v-if="RESULT_COUNT != 0" class="header-post-count-box">
        <p class="header-post-count bold">{{ RESULT_COUNT }}</p>
      </div>
    </i>
  </div>
</template>

<style scoped src="../styles/components/MainHeaderStyle.css" />

<script src="../scripts/components/MainHeaderScript.js" />
