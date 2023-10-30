<script setup>
import { defineProps, ref } from "vue";
import LinkIcon from "../components/icon/LinkIcon.vue";
import Alert from "./Alert.vue";

defineProps({
  blogs: Array,
  handleClickTag: Function,
});

const toast = ref(false);
const modal = ref(false);

const truncateText = (text) => {
  const maxLength = 150;
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

const handlerCopyClipboard = async (url) => {
  try {
    navigator.clipboard.writeText(url);
    handlerToast();
  } catch (error) {
    console.log(error);
  }
};

const handlerToast = () => {
  toast.value = true;
  setTimeout(() => {
    toast.value = false;
  }, 2000);
};
</script>

<template>
  <div
    v-for="blog in blogs"
    class="relative flex h-full gap-4 p-6 rounded-lg bg-accent"
  >
    <div class="flex-1">
      <img
        :src="blog.photos[0]"
        :alt="blog.title"
        class="object-cover object-center w-full rounded-lg max-h-72"
      />
    </div>
    <div class="flex flex-col justify-between flex-1">
      <h2 class="text-xl font-bold">{{ blog.title }}</h2>
      <p>
        {{ truncateText(blog.description) }}
        <span class="underline cursor-pointer underline-offset-2 text-neutral">
          <a :href="blog.url" target="_blank"> อ่านต่อ </a>
        </span>
      </p>
      <div class="flex gap-2">
        <p>หมวด:</p>
        <div class="flex flex-wrap gap-2">
          <p
            v-for="tag in blog.tags"
            @click="() => handleClickTag(tag)"
            class="underline cursor-pointer underline-offset-2 text-neutral-focus active:scale-90"
          >
            {{ tag }}
          </p>
        </div>
      </div>
      <div class="flex gap-4">
        <img
          v-for="photo in blog.photos.slice(1, blog.photos.length)"
          :src="photo"
          alt="photo"
          class="w-24 h-24 rounded-lg"
        />
      </div>
      <div
        class="absolute p-4 bg-opacity-50 rounded-full cursor-pointer bg-secondary bottom-10 right-10 active:scale-90"
        @click="handlerCopyClipboard(blog.url)"
      >
        <LinkIcon />
      </div>
    </div>
    <Alert v-if="toast" msg="Copied Successfully!" />
  </div>
</template>
