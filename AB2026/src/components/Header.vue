<template>
  <div id="HEADER" :class="{ reveal: isReveal }">
    <div id="NAV" :class="{ reveal: isNavOpen, 'nav-mobile': true }">
      <nav>
        <div 
          v-for="(item, index) in menu" 
          :key="index"
          class="scroll_btn" 
          @click="scrollTo(item.link)"
        >
          {{ item.name }}
        </div>
      </nav>
    </div>
    <img src="@/assets/image/logo.png" class="logo" alt="Logo">
    
    <div class="NAV_btn_wrap" @click="toggleNav">
      <div id="nav-icon3" class="light" :class="{ open: isNavOpen }">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

defineProps({
  menu: {
    type: Array,
    default: () => []
  },
  isNavOpen: Boolean
});

const emit = defineEmits(['toggle-nav', 'scroll-to']);

const isReveal = ref(false);

const toggleNav = () => {
  emit('toggle-nav');
};

const scrollTo = (selector) => {
  emit('scroll-to', selector);
};

const handleScroll = () => {
  if (window.scrollY > 500) {
    isReveal.value = true;
  } else {
    isReveal.value = false;
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
@media screen and (max-width: 1440px) {
  .nav-mobile:not(.reveal) {
    visibility: hidden;
  }
  
  .nav-mobile:not(.reveal) nav {
    opacity: 0;
    pointer-events: none;
  }
  
  .nav-mobile.reveal nav {
    opacity: 1;
    pointer-events: auto;
    transition: opacity 0.3s ease 0.3s;
  }

  .logo {
    float: none !important;
    margin-left: 20px;
  }
}
</style>