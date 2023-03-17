<template>
  <div class="wrapper">
    <div class="overlay" ref="OVERLAY_PROFILE_BOX" @click="overlayProfileClick">
      <div class="overlay-profile" ref="OVERLAY_PROFILE" @click="l">
        <div class="overlay-profile-img" ref="OVERLAY_PROFILE_IMG"></div>
        <img src="@/assets/report.svg" class="overlay-profile-report pointer" />
        <p class="overlay-profile-name bold">{{ CLICKED_NAME }}</p>
        <p class="overlay-profile-info">
          {{ CLICKED_AGE }} | {{ CLICKED_GENDER }}
        </p>
        <p v-if="CLICKED_DES" class="overlay-profile-des">{{ CLICKED_DES }}</p>
        <p v-else class="overlay-profile-des">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique,
          incidunt.
        </p>
        <div class="overlay-profile-follow-box">
          <div class="overlay-profile-follower-box">
            <p class="overlay-profile-follower-count bold">
              {{ CLICKED_FOLLOWER }}
            </p>
            <p class="overlay-profile-follower-des">팔로우</p>
          </div>
          <div class="overlay-profile-following-box">
            <p class="overlay-profile-following-count bold">
              {{ CLICKED_FOLLOWING }}
            </p>
            <p class="overlay-profile-following-des">팔로잉</p>
          </div>
        </div>
        <div
          v-if="CLICKED_UID == UID"
          class="overlay-profile-modify-btn pointer"
          @click="overlayProfileModify"
        >
          <i class="fa-solid fa-pencil"></i>
          <p class="bold">프로필 관리</p>
        </div>
        <div
          v-else-if="!isFollowed"
          class="overlay-profile-follow-btn pointer"
          @click="overlayProfileFollow"
        >
          <i class="fa-solid fa-plus"></i>
          <p class="bold">팔로우</p>
        </div>
        <div
          v-else
          class="overlay-profile-unfollow-btn pointer"
          @click="overlayProfileUnfollow"
        >
          <i class="fa-solid fa-minus"></i>
          <p class="bold">팔로우 취소</p>
        </div>
      </div>
    </div>
    <div ref="OVERLAY_IMG_BOX" class="overlay" @click="overlayImgClick($event)">
      <img class="overlay-img" ref="OVERLAY_IMG" />
    </div>
    <div class="chat-viewer-box" ref="VIEWER">
      <div class="chat-viewer-welcome">
        <p class="chat-viewer-welcome-msg bold">
          {{ USER_NAME }} 님이 입장하셨습니다!
        </p>
      </div>
      <div v-for="(item, index) in messages" :key="index" class="chat-viewer">
        <div class="chat-viewer-item" v-if="UID != item.uid">
          <div
            :style="{
              backgroundImage: `url(${item.profile_img_url})`,
            }"
            class="chat-viewer-item-profile-img pointer"
            @click="profileImgClick($event)"
          ></div>
          <div class="chat-viewer-item-content-box">
            <p class="chat-viewer-item-name bold">
              {{ item.display_name }}
            </p>
            <p class="chat-viewer-item-table">
              {{ item.display_table }}
            </p>
            <img
              :src="item.msg_img_url"
              alt=""
              class="chat-viewer-item-msg-img"
              @click="msgImgClick($event)"
            />
            <div class="chat-viewer-item-msg-box" v-if="item.msg">
              <p class="chat-viewer-item-msg">
                {{ item.msg }}
              </p>
            </div>
          </div>
          <p class="chat-viewer-item-timestamp">
            {{
              String(item.created_at.toDate().getHours()).padStart(2, "0") +
              " : " +
              String(item.created_at.toDate().getMinutes()).padStart(2, "0")
            }}
          </p>
        </div>
        <div class="chat-viewer-item me-item" v-else>
          <p class="chat-viewer-item-timestamp">
            {{
              String(item.created_at.toDate().getHours()).padStart(2, "0") +
              " : " +
              String(item.created_at.toDate().getMinutes()).padStart(2, "0")
            }}
          </p>
          <div class="chat-viewer-item-content-box">
            <img
              :src="item.msg_img_url"
              alt=""
              class="chat-viewer-item-msg-img"
              @click="msgImgClick($event)"
            />
            <div class="chat-viewer-item-msg-box me-msgbox" v-if="item.msg">
              <p class="chat-viewer-item-msg me-msg">
                {{ item.msg }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-writer-box">
      <div class="chat-writer-form">
        <input
          type="file"
          accept="image/*"
          id="image"
          class="display-none"
          ref="INPUT_IMG"
          @change="sendImage"
        />
        <label for="image" class="chat-writer-func-item">
          <img
            src="@/assets/image_light.svg"
            alt=""
            class="chat-writer-func-item"
            v-if="isDarkMode()"
          />
          <img
            src="@/assets/image_dark.svg"
            alt=""
            class="chat-writer-func-item"
            v-else
          />
        </label>
        <input
          type="text"
          @keyup.enter="sendMsg"
          class="chat-writer-text-input"
          ref="INPUT_MSG"
        />
        <div class="chat-writer-func-box">
          <img
            src="@/assets/emoji_light.svg"
            alt=""
            class="chat-writer-func-item"
            v-if="isDarkMode()"
          />
          <img
            src="@/assets/emoji_dark.svg"
            alt=""
            class="chat-writer-func-item"
            v-else
          />
          <img
            src="@/assets/send.svg"
            alt=""
            class="chat-writer-func-item"
            @click="sendMsg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="@/styles/views/MainChatStyle.css" />

<script src="@/scripts/views/MainChatScript.js" />
