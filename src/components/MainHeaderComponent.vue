<template>
  <div class="header">
    <div class="header-logo pointer" @click="goMain">
      <i class="fa-solid fa-wine-bottle"></i>
      <p class="header-logo-title bold">Alcoholic</p>
    </div>
    <i class="fa-solid fa-paper-plane pointer" @click="goPostList"></i>
  </div>
</template>

<style scoped src="../styles/components/MainHeaderStyle.css" />

<script src="../scripts/components/MainHeaderScript.js" />
