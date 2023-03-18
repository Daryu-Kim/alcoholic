<template>
  <div class="footer">
    <input
      class="footer-radio"
      type="radio"
      name="footer"
      id="home"
      ref="FOOTER_HOME"
      checked
    />
    <label
      for="home"
      class="fa-solid fa-house pointer footer-item"
      @click="homeClick"
    ></label>
    <input class="footer-radio" type="radio" name="footer" id="search" />
    <label
      for="search"
      class="fa-solid fa-magnifying-glass pointer footer-item"
      @click="searchClick"
    ></label>
    <input class="footer-radio" type="radio" name="footer" id="order" />
    <label
      for="order"
      class="fa-solid fa-heart-pulse pointer footer-item"
      @click="recommendClick"
    ></label>
    <input class="footer-radio" type="radio" name="footer" id="chat" />
    <label
      for="chat"
      class="fa-solid fa-comments pointer footer-item"
      @click="chatClick"
    ></label>
    <input class="footer-radio" type="radio" name="footer" id="account" />
    <label
      for="account"
      class="pointer footer-item-account"
      @click="profileClick"
    ></label>
  </div>
</template>

<style scoped src="../styles/components/MainFooterStyle.css" />

<script src="../scripts/components/MainFooterScript.js" />
