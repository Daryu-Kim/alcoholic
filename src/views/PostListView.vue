<template>
  <div class="wrapper">
    <DialogHeaderComponent title="쪽지함" />
    <div class="dm-list">
      <p v-if="POST.length == 0" class="no-post bold">받은 쪽지가 없습니다!</p>
      <div
        v-for="(item, index) in POST"
        :key="index"
        class="dm-item pointer"
        @click="showPost(item.cid)"
      >
        <div class="dm-item-left">
          <div
            class="dm-item-img"
            :style="{
              backgroundImage: `url(${item.profile_img_url})`,
            }"
          ></div>
          <div class="dm-item-title-box">
            <p class="dm-item-title bold">{{ item.display_name }}</p>
            <p class="dm-item-msg">클릭하여 쪽지를 확인하세요!</p>
          </div>
        </div>
        <div class="dm-item-right">
          <div class="post-item-timestamp-box">
            <i class="fa-solid fa-clock"></i>
            <p v-if="DATE[index][0] > 0" class="post-item-timestamp">
              {{ DATE[index][0] }}일
            </p>
            <p
              v-if="DATE[index][1] > 0 && DATE[index][0] == 0"
              class="post-item-timestamp"
            >
              {{ DATE[index][1] }}시간
            </p>
            <p
              v-if="DATE[index][2] && DATE[index][0] < 1 && DATE[index][1] < 1"
              class="post-item-timestamp"
            >
              {{ DATE[index][2] }}분
            </p>
            <p class="post-item-timestamp">전</p>
          </div>
          <p v-if="!item.read" class="post-item-no-read bold">안읽음</p>
          <p v-else class="post-item-read bold">읽음</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="@/styles/views/PostListStyle.css" />

<script src="@/scripts/views/PostListScript.js" />
