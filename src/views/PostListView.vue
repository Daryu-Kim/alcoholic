<template>
  <div class="wrapper">
    <DialogHeaderComponent title="쪽지함" />
    <div class="dm-list">
      <p v-if="POST.length == 0" class="no-post bold">받은 쪽지가 없습니다!</p>
      <div v-for="(item, index) in POST" :key="index" class="dm-item">
        <div class="dm-item-left">
          <div
            class="dm-item-img"
            :style="{
              backgroundImage: `url(${item.profile_img_url})`,
            }"
          ></div>
          <div class="dm-item-title-box">
            <p class="dm-item-title bold">{{ item.display_name }}</p>
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
              <p v-if="DATE[index][2] > 0" class="post-item-timestamp">
                {{ DATE[index][2] }}분
              </p>
              <p class="post-item-timestamp">전</p>
            </div>
          </div>
        </div>
        <div class="dm-item-right">
          <p class="dm-item-timestamp bold">보기</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="@/styles/views/PostListStyle.css" />

<script src="@/scripts/views/PostListScript.js" />
