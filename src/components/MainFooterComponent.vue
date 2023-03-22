<template>
  <div class="footer">
    <input
      class="footer-radio"
      type="radio"
      name="footer"
      id="home"
      ref="FOOTER_HOME"
    />
    <label
      for="home"
      class="fa-solid fa-house pointer footer-item"
      @click="homeClick"
    ></label>
    <input
      ref="FOOTER_SEARCH"
      class="footer-radio"
      type="radio"
      name="footer"
      id="search"
    />
    <label
      for="search"
      class="fa-solid fa-magnifying-glass pointer footer-item"
      @click="searchClick"
    ></label>
    <input
      class="footer-radio"
      type="radio"
      name="footer"
      id="recommend"
      ref="FOOTER_RECOMMEND"
    />
    <label
      for="recommend"
      class="fa-solid fa-heart-pulse pointer footer-item"
      @click="recommendClick"
    ></label>
    <input
      class="footer-radio"
      type="radio"
      name="footer"
      id="chat"
      ref="FOOTER_CHAT"
    />
    <label
      for="chat"
      class="fa-solid fa-comments pointer footer-item"
      @click="chatClick"
    ></label>
    <input
      class="footer-radio"
      type="radio"
      name="footer"
      id="account"
      ref="FOOTER_ACCOUNT"
    />
    <label
      for="account"
      class="pointer footer-item-account"
      @click="profileClick"
    ></label>
  </div>
</template>

<style scoped src="../styles/components/MainFooterStyle.css" />

<script src="../scripts/components/MainFooterScript.js" />
