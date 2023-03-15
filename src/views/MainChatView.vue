<template>
  <div class="wrapper">
    <div class="chat-viewer-box" ref="VIEWER">
      <div
        class="chat-viewer-item you"
        v-for="(item, index) in messages"
        :key="index"
      >
        <div
          :style="{
            backgroundImage: `url(${item.profile_img_url})`,
          }"
          class="chat-viewer-item-profile-img"
        ></div>
        <div class="chat-viewer-item-content-box">
          <p class="chat-viewer-item-name bold">
            {{ item.display_name }}
          </p>
          <p class="chat-viewer-item-table">
            {{ item.display_table }}
          </p>
          <img
            v-if="item.msg_img_url != ''"
            :src="item.msg_img_url"
            alt=""
            class="chat-viewer-item-msg-img"
          />
          <div v-if="item.msg != ''" class="chat-viewer-item-msg-box">
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
    </div>
    <div class="chat-writer-box">
      <div class="chat-writer-form">
        <input type="file" accept="image/*" id="image" class="display-none" />
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
