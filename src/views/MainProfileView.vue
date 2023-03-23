<template>
  <div class="wrapper">
    <p class="profile-logout bold" @click="logout">Log Out</p>
    <div
      class="profile-thumbnail"
      :style="{
        backgroundImage: `url(${USER_IMG})`,
      }"
    ></div>
    <div class="profile-box">
      <div
        class="profile-img"
        :style="{
          backgroundImage: `url(${USER_IMG})`,
        }"
      ></div>
      <div class="profile-name-box">
        <p class="profile-name bold">{{ USER_NAME }}</p>
        <p class="profile-info">{{ USER_INFO }}</p>
      </div>
      <p v-if="!USER_DES" class="profile-des">자기소개가 없습니다!</p>
      <p v-else class="profile-des">{{ USER_DES }}</p>
      <div class="profile-follow-box pointer">
        <div class="profile-follower-box" @click="goFollower">
          <p class="profile-follower-count bold">{{ USER_FOLLOWER }}</p>
          <p class="profile-follower-des">팔로워</p>
        </div>
        <div class="profile-following-box pointer" @click="goFollowing">
          <p class="profile-following-count bold">{{ USER_FOLLOWING }}</p>
          <p class="profile-following-des">팔로잉</p>
        </div>
      </div>
      <p class="profile-modify bold pointer">프로필 편집</p>
    </div>
  </div>
</template>

<style scoped src="@/styles/views/MainProfileStyle.css" />

<script src="@/scripts/views/MainProfileScript.js" />
