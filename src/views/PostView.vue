<template>
  <div class="wrapper">
    <DialogHeaderComponent title="받은 쪽지" />
    <div class="post">
      <div class="post-profile-box">
        <div class="post-profile-left">
          <div
            class="post-profile-img"
            :style="{
              backgroundImage: `url(${POST.profile_img_url})`,
            }"
          ></div>
          <p class="post-profile-name bold">{{ POST.display_name }}</p>
        </div>
        <div class="post-profile-right">
          <p class="post-profile-go bold pointer" @click="goProfile(POST.uid)">
            프로필
          </p>
        </div>
      </div>
      <div class="post-msg-box">
        <p class="post-msg" ref="MSG"></p>
      </div>
      <div class="post-timestamp-box">
        <i class="fa-solid fa-clock"></i>
        <p v-if="DATE[0] > 0" class="post-timestamp">{{ DATE[0] }}일</p>
        <p v-if="DATE[1] > 0 && DATE[0] == 0" class="post-timestamp">
          {{ DATE[1] }}시간
        </p>
        <p v-if="DATE[2] && DATE[0] < 1 && DATE[1] < 1" class="post-timestamp">
          {{ DATE[2] }}분
        </p>
        <p class="post-timestamp">전</p>
      </div>
    </div>
    <div class="func-box">
      <p class="func-send-btn bold pointer" @click="sendPost(POST.uid)">답장</p>
      <p class="func-delete-btn bold pointer" @click="deletePost">삭제</p>
    </div>
  </div>
</template>

<style scoped src="@/styles/views/PostStyle.css" />

<script src="@/scripts/views/PostScript.js" />
