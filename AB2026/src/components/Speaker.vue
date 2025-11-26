<!-- Speaker.vue -->
<template>
  <div class="sec" id="sec2">
    <div class="mid_content" data-aos="fade-up">
      <div class="sec_title">
        <h2 class="title_bg_box">
          <img src="@/assets/image/title_bg.png" alt="">
          {{ infoData.title || '講者陣容' }}
        </h2>
      </div>

      <div class="speaker-carousel-container">
        <button class="carousel-arrow carousel-arrow-left" @click="swiperPrev">
          <img src="@/assets/image/arrow_left.png" alt="上一張">
        </button>

        <div class="carousel-wrapper">
          <swiper
            :modules="modules"
            :slides-per-view="1"
            :space-between="20"
            :loop="true"
            :autoplay="{ delay: 4000, disableOnInteraction: false }"
            :speed="800"
            :breakpoints="{
              600: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 20 }
            }"
            @swiper="onSwiper"
            class="speaker-swiper"
          >
            <swiper-slide v-for="(speaker, index) in speakers" :key="index">
              <div class="speaker-card" @click="openModal(speaker)">
                <div class="speaker-image-wrapper">
                  <img :src="getImageUrl(speaker.img)" alt="" class="speaker-image">
                </div>
                <div class="speaker-title" v-html="speaker.title"></div>
                <div class="speaker-name">{{ speaker.name }}</div>
              </div>
            </swiper-slide>
          </swiper>
        </div>

        <button class="carousel-arrow carousel-arrow-right" @click="swiperNext">
          <img src="@/assets/image/arrow_right.png" alt="下一張">
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const props = defineProps({
  speakers: {
    type: Array,
    default: () => []
  },
  infoData: {
    type: Object,
    default: () => ({})
  }
});

const modules = [Autoplay, Navigation];
const swiperInstance = ref(null);

const emit = defineEmits(['open-modal']);

const getImageUrl = (name) => {
  return new URL(`../assets/image/${name}`, import.meta.url).href
}

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

const swiperPrev = () => {
  swiperInstance.value?.slidePrev();
};

const swiperNext = () => {
  swiperInstance.value?.slideNext();
};

const openModal = (speaker) => {
  emit('open-modal', speaker);
};
</script>

<style scoped>
.speaker-carousel-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 20px;
}

.carousel-wrapper {
  flex: 1;
  overflow: hidden;
}

.speaker-swiper {
  width: 100%;
  padding: 20px 0;
}

.carousel-arrow {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.3s ease;
  z-index: 10;
}

.carousel-arrow:hover {
  transform: scale(1.1);
}

.carousel-arrow img {
  width: 100%;
  height: 100%;
  display: block;
}

.carousel-arrow-left {
  order: -1;
}

.carousel-arrow-right {
  order: 1;
}

.speaker-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 450px;
  background-image: url('@/assets/image/lecturer_bg.png');
  background-size: cover;
  background-position: center;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.speaker-card:hover {
  transform: translateY(-5px);
}

.speaker-image-wrapper {
  flex-shrink: 0;
  width: 200px;
  margin: 20px auto 0;
}

.speaker-image {
  width: 100%;
  height: auto;
  display: block;
}

.speaker-title {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 15px;
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 150%;
  text-align: center;
  color: #333;
}

.speaker-name {
  flex-shrink: 0;
  width: 100%;
  padding: 0 0;
  background: linear-gradient(90deg, #DD5832 0%, rgba(221, 88, 50, 0.5) 100%);
  font-weight: 400;
  font-size: 30px;
  line-height: 150%;
  text-align: center;
  color: #fff;
  border-radius: 0;
}

@media screen and (max-width: 900px) {
  .carousel-arrow {
    width: 40px;
    height: 40px;
  }
}

@media screen and (max-width: 680px) {
  .speaker-carousel-container {
    gap: 10px;
  }

  .carousel-arrow {
    width: 36px;
    height: 36px;
  }

  .speaker-card {
    height: 400px;
  }

  .speaker-image-wrapper {
    width: 180px;
    margin-top: 15px;
  }

  .speaker-title {
    font-size: 18px;
    padding: 15px 10px;
  }

  .speaker-name {
    font-size: 24px;
  }
}

@media screen and (max-width: 480px) {
  .speaker-carousel-container {
    gap: 5px;
  }

  .carousel-arrow {
    width: 30px;
    height: 30px;
  }

  .speaker-card {
    height: 380px;
  }

  .speaker-image-wrapper {
    width: 160px;
    margin-top: 10px;
  }

  .speaker-title {
    font-size: 16px;
    padding: 12px 8px;
  }

  .speaker-name {
    font-size: 20px;
  }
}
</style>