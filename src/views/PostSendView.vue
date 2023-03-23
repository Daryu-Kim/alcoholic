<template>
  <div class="wrapper">
    <DialogHeaderComponent title="쪽지 보내기" />
    <div class="post">
      <div class="post-profile-box">
        <div class="post-profile-left">
          <p class="post-profile-to bold">받는 사람</p>
        </div>
        <div class="post-profile-right">
          <p class="post-profile-name bold">{{ TARGET.name }}</p>
          <div
            class="post-profile-img"
            :style="{
              backgroundImage: `url(${TARGET.profile_img})`,
            }"
          ></div>
        </div>
      </div>
      <textarea class="post-input" ref="POST_INPUT"></textarea>
    </div>
    <div class="func-box">
      <p class="func-send-btn bold pointer" @click="sendPost">쪽지 보내기</p>
    </div>
  </div>
</template>

<style scoped src="@/styles/views/PostSendStyle.css" />

<script src="@/scripts/views/PostSendScript.js" />
