<template>
  <a href="#" class="goTop" :style="{ display: showGoTop ? 'block' : 'none' }" @click.prevent="scrollToTop">
    <img src="@/assets/image/gotop.png" />
  </a>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showGoTop = ref(false);

const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

const scrollToTop = () => {
  const startPosition = window.pageYOffset;
  const distance = startPosition;
  const duration = 1500;
  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);
    
    window.scrollTo(0, startPosition - distance * ease);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

const handleScroll = () => {
  if (window.scrollY > 100) {
    showGoTop.value = true;
  } else {
    showGoTop.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.goTop {
  position: fixed;
  right: 20px;
  bottom: 60px;
  z-index: 99;
  cursor: pointer;
  display: none;
}
</style>