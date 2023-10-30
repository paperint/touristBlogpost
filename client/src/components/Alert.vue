<script setup>
import { defineProps } from "vue";

defineProps({
  msg: Text,
});
</script>

<template>
  <div class="toast toast-top toast-center">
    <div
      class="relative inline-flex items-center alert alert-success anisuccess"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 stroke-current shrink-0"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span> {{ msg }}</span>
    </div>
  </div>
</template>

<style scoped>
.anisuccess::after {
  content: "";
  position: absolute;
  left: 5%;
  bottom: 0;
  width: 90%;
  height: 3px;
  background: green;
  animation: anim 2s linear forwards;
}
@keyframes anim {
  100% {
    width: 0;
  }
}
</style>
