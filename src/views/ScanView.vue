<template>
  <div class="scan-wrapper">
    <p v-if="noFrontCamera" class="scan-info">전면 카메라가 없습니다!</p>
    <p v-else-if="noRearCamera" class="scan-info">후면 카메라가 없습니다!</p>
    <p v-else class="scan-info">QR 코드를 인식시켜 주세요!</p>
    <qrcode-stream
      :camera="camera"
      class="qrcode"
      @decode="onDecode"
      @init="onInit"
      :torch="torchActive"
    ></qrcode-stream>
    <div class="control-box">
      <i
        class="fa-solid fa-camera-rotate control-change"
        @click="switchCamera"
      ></i>
      <i class="fa-solid fa-bolt control-flash" @click="switchTorch"></i>
    </div>
  </div>
</template>

<style scoped src="@/styles/views/ScanStyle.css" />

<script src="@/scripts/views/ScanScript.js" />
