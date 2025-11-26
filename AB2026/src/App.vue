<template>
  <div>
    <!-- Preloader -->
    <div id="preloader" v-if="isLoading">
      <div id="status">&nbsp;</div>
    </div>

    <!-- Fixed Background -->
    <div id="fixedBackground">
      <img src="@/assets/image/fixedBackground.png" alt="">
    </div>

    <Header :menu="infoData.menu" :isNavOpen="isNavOpen" @toggle-nav="toggleNav" @scroll-to="scrollTo" />
    
    <section id="KV" class="relative w-full overflow-hidden">
      <Kv />
    </section>
    <section id="intro" class="relative w-full overflow-hidden">
      <Intro :infoData="infoData.content[0]" />
    </section>
    <section id="speaker" class="relative w-full overflow-hidden">
      <Speaker :speakers="speakers.data" :infoData="infoData.content[1]" @open-modal="openModal" />
    </section>
    <section id="agenda" class="relative w-full overflow-hidden">
      <Agenda :infoData="infoData.content[2]" />
    </section>
    <section id="signUp" class="relative w-full overflow-hidden">
      <SignUp :infoData="infoData.content[3]" />
    </section>
    <section id="event" class="relative w-full overflow-hidden">
      <Event :infoData="infoData.content[4]" />
    </section>
    <section id="related" class="relative w-full overflow-hidden">
      <RelatedArticles :infoData="infoData.content[5]" />
    </section>
    <Footer :footerData="infoData.footer" />

    <!-- 當選單打開時隱藏這兩個按鈕 -->
    <SignUpFiexd v-show="!isNavOpen" />
    <Gototop v-show="!isNavOpen" />

    <SpeakerModal :isOpen="isModalOpen" :speaker="currentSpeaker" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Kv from './components/Kv.vue';
import Intro from './components/Intro.vue';
import Speaker from './components/Speaker.vue';
import Agenda from './components/Agenda.vue';
import SignUp from './components/SignUp.vue';
import Event from './components/Event.vue';
import RelatedArticles from './components/RelatedArticles.vue';
import Gototop from './components/Gototop.vue';
import SignUpFiexd from './components/SignUpFiexd.vue';
import SpeakerModal from './components/SpeakerModal.vue';

import infoData from './assets/json/info.json';
import speakers from './assets/json/speaker.json';

import AOS from 'aos';
import 'aos/dist/aos.css';

const isLoading = ref(true);
const isNavOpen = ref(false);
const isModalOpen = ref(false);
const currentSpeaker = ref(null);

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value;
};

const scrollTo = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500; 
    let start = null;

    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
    isNavOpen.value = false;
  }
};

const openModal = (speaker) => {
  currentSpeaker.value = speaker;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

onMounted(() => {
  AOS.init({
    offset: 0,
    duration: 1000,
    once: false
  });

  window.addEventListener('load', () => {
    setTimeout(() => {
      isLoading.value = false;
      document.body.style.overflow = 'visible';
    }, 350);
  });
  
  if (document.readyState === 'complete') {
    setTimeout(() => {
      isLoading.value = false;
      document.body.style.overflow = 'visible';
    }, 350);
  }
});
</script>

<style scoped>
#fixedBackground {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

#fixedBackground img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

section {
  margin: 0 ;
  padding: 0 ;
  display: block;
}

#intro{
    padding: 0 !important;
    margin: 0 ;
    background: transparent ;
}

#speaker{
  padding: 0 ;
  margin: 0 ;
  background: transparent ;
}

#agenda{
  padding: 0 ;
  margin: 0 ;
  background: transparent ;
}

#signUp{
  padding: 0 ;
  margin: 0 ;
  background-color: #fff ;
}

#event{
  padding: 0 ;
  margin: 0 ;
  background: transparent ;
}

#related {
  padding: 0 ;
  margin: 0 ;
  background: transparent ;
}

@media screen and (max-width: 1024px) {
    #intro, #speaker, #agenda, #signUp, #event {
        padding: 0 ;
        margin: 0 ;
    }
}
</style>

<style>
html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
}
</style>