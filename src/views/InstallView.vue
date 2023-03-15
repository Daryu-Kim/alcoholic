<template>
  <div class="wrapper">
    <div class="base-box">
      <p class="base-title bold">{{ device_info }} 기기 설치 안내</p>
      <div class="base-btn-box" v-if="device_info == 'Android'">
        <p class="base-des">아래 버튼을 클릭하여 설치를 완료해주세요!</p>
        <p class="base-btn bold" @click="install">Install</p>
      </div>
      <div class="base-btn-box" v-else>
        <p class="base-des">
          아래의
          <i class="fa-solid fa-arrow-up-from-bracket"></i>
          버튼을 클릭하여 "홈 화면에 추가"를 눌러주세요!
          <br />
          그 후에 설치된 앱을 실행해주세요!
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped src="@/styles/views/InstallStyle.css" />

<script src="@/scripts/views/InstallScript.js" />
