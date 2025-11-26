<template>
  <div class="kv_img">
    <img :src="kvBg" alt="Key Visual">
  </div>
</template>

<script setup>
import kvBg from '@/assets/image/kv_bg.png';
</script>

<style scoped>
.kv_img {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: none !important;
}

.kv_img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
</style>
