<template>
  <div class="wrapper">
    <DialogHeaderComponent title="팔로잉" />
    <div class="following">
      <div
        v-for="(item, index) in FOLLOWING_ITEM"
        :key="index"
        class="following-item"
      >
        <div class="following-item-left">
          <div
            class="following-item-img"
            :style="{
              backgroundImage: `url(${item.profile_img})`,
            }"
          ></div>
          <div class="following-item-title-box">
            <p class="following-item-title bold">{{ item.display_name }}</p>
            <p class="following-item-des">{{ item.display_info }}</p>
          </div>
        </div>
        <div class="following-item-right">
          <p
            class="following-item-unfollow-btn bold pointer"
            @click="goProfile(item.uid)"
          >
            보기
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="@/styles/views/FollowingStyle.css" />

<script src="@/scripts/views/FollowingScript.js" />
