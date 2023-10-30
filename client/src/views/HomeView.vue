<script setup>
import { ref, watch } from "vue";
import debounce from "lodash.debounce";
import { useBlogsPostStore } from "../stores/blogspost";
import Cards from "@/components/Cards.vue";
import Loading from "../components/Loading.vue";

const blogStore = useBlogsPostStore();

const searchText = ref("");
const isLoading = ref(false);

const getData = debounce(async () => {
  try {
    await blogStore.getBlogPost(searchText.value);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}, 1000);

watch(
  searchText,
  () => {
    setTimeout(() => {
      isLoading.value = true;
      getData();
    }, 2000);
  },
  { immediate: true }
);

const handleClickTag = (tag) => {
  let search = searchText.value;
  if (search.length > 0) {
    search = search + " " + tag;
  } else {
    search = tag;
  }
  searchText.value = search;
};
</script>

<template>
  <main class="flex flex-col items-center min-h-screen py-20 bg-primary">
    <section class="container max-w-5xl mx-auto">
      <Loading v-if="isLoading" />
      <h1 class="text-6xl text-center text-neutral">เที่ยวไหนดี</h1>
      <article class="mx-24">
        <input
          type="text"
          class="w-full p-4 text-center bg-transparent border-b-2 border-slate-300 focus:outline-none focus:border-neutral"
          placeholder="หาที่เที่ยวแล้วไปกัน"
          v-model="searchText"
        />
      </article>
      <article class="grid grid-cols-1 gap-6 p-4">
        <Cards :blogs="blogStore.blogs" :handleClickTag="handleClickTag" />
      </article>
    </section>
  </main>
</template>
