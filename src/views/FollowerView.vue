<template>
  <div class="wrapper">
    <DialogHeaderComponent title="팔로워" />
    <div class="follower">
      <div
        v-for="(item, index) in FOLLOWER_ITEM"
        :key="index"
        class="follower-item"
      >
        <div class="follower-item-left">
          <div
            class="follower-item-img"
            :style="{
              backgroundImage: `url(${item.profile_img})`,
            }"
          ></div>
          <div class="follower-item-title-box">
            <p class="follower-item-title bold">{{ item.display_name }}</p>
            <p class="follower-item-des">{{ item.display_info }}</p>
          </div>
        </div>
        <div class="follower-item-right">
          <p
            class="follower-item-unfollow-btn bold pointer"
            @click="goProfile(item.uid)"
          >
            보기
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="@/styles/views/FollowerStyle.css" />

<script src="@/scripts/views/FollowerScript.js" />
