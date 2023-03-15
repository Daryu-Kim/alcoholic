<template>
  <div class="wrapper">
    <div class="logo-box">
      <div class="logo">
        <i class="fa-solid fa-wine-bottle logo-img"></i>
        <p class="logo-title bold">Alcoholic</p>
      </div>
      <p class="logo-des medium">건전하고 즐거운 술 문화, Alcoholic.</p>
    </div>
    <div class="login-box">
      <div class="login-item-box" @click="facebookLogin">
        <img src="@/assets/facebook-logo.svg" class="login-item-logo" />
        <p class="login-item-text medium">페이스북으로 로그인</p>
      </div>
      <div class="login-item-box" @click="googleLogin">
        <img src="@/assets/google-logo.svg" class="login-item-logo" />
        <p class="login-item-text medium">구글 계정으로 로그인</p>
      </div>
      <p class="login-des medium">
        가입하면 이용약관 및 개인정보 처리방침에 동의하게 됩니다.
      </p>
    </div>
  </div>
</template>

<style scoped src="@/styles/views/LoginStyle.css" />

<script src="@/scripts/views/LoginScript.js" />
