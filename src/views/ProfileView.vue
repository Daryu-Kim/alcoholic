<template>
  <div class="wrapper">
    <DialogHeaderComponent title="프로필" />
    <div class="profile">
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
        <div class="profile-follow-box">
          <div class="profile-follower-box" @click="goFollower">
            <p class="profile-follower-count bold">{{ USER_FOLLOWER }}</p>
            <p class="profile-follower-des">팔로워</p>
          </div>
          <div class="profile-following-box" @click="goFollowing">
            <p class="profile-following-count bold">{{ USER_FOLLOWING }}</p>
            <p class="profile-following-des">팔로잉</p>
          </div>
        </div>
        <div class="profile-btn-box">
          <p v-if="isF4F" class="profile-dm bold" @click="clickMessage">
            메시지
          </p>
          <p
            v-if="!isFollowed"
            class="profile-follow bold"
            @click="clickFollow"
          >
            팔로우
          </p>
          <p v-else class="profile-unfollow bold" @click="clickUnfollow">
            팔로우 취소
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="@/styles/views/ProfileStyle.css" />

<script src="@/scripts/views/ProfileScript.js" />
