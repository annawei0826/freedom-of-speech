<template>
  <div class="sec agenda_bg" id="sec3">
    <div class="mid_content" data-aos="fade-up">
      <div class="sec_title">
        <h2 class="title_bg_box">
          <img src="@/assets/image/title_bg.png" alt="">
          {{ infoData.title }}
        </h2>
      </div>
      
      <div class="centerBox">
        <div class="agenda-cards">
          <div class="agenda-card" v-for="(topic, index) in localTopics" :key="index">
            <div class="agenda-header">專題演講{{ index + 1 }}</div>
            <div class="agenda-content" :class="{ open: topic.isOpen }">
              <h3 @click="toggleTopic(index)">
                <div v-html="topic.title"></div>
                <img src="@/assets/image/agenda_arrow.png" alt="" class="arrow">
              </h3>
              <p>{{ topic.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="centerBox">
        <div class="agenda_btns">
          <img 
            src="@/assets/image/agenda_taichung.png" 
            alt="" 
            class="btn agenda_taichung" 
            :class="{ active: activeTab === 0 }"
            @click="slideTo(0)"
          >
          <img 
            src="@/assets/image/agenda_taipei.png" 
            alt="" 
            class="btn agenda_taipei" 
            :class="{ active: activeTab === 1 }"
            @click="slideTo(1)"
          >
          <img 
            src="@/assets/image/agenda_kaohsiung.png" 
            alt="" 
            class="btn agenda_kaohsiung" 
            :class="{ active: activeTab === 2 }"
            @click="slideTo(2)"
          >
        </div>
      </div>

      <div class="agenda-carousel-container">
        <button class="agenda-arrow agenda-arrow-left" @click="swiperPrev">
          <img src="@/assets/image/arrow_left.png" alt="上一張">
        </button>

        <div class="agenda-carousel-wrapper">
          <swiper
            :modules="modules"
            :slides-per-view="1"
            :space-between="20"
            :loop="true"
            :autoplay="{ delay: 4000, disableOnInteraction: false }"
            :speed="1200"
            :effect="'slide'"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            class="agenda-swiper"
          >
            <swiper-slide v-for="(city, index) in infoData.cities" :key="index">
              <div class="centerBox">
                <img :src="getImageUrl(city.titleImg)" alt="" class="agenda_slider_title">
              </div>
              <div class="agenda_content">
                <div class="agenda">
                  <div class="agenda_tr" v-for="(row, rIndex) in city.schedule" :key="rIndex">
                    <div class="agenda-td">{{ row.time }}</div>
                    <div class="agenda-td" :class="{ orange: row.isOrange }">
                      <div v-html="row.content"></div>
                      <span v-if="row.speaker" v-html="row.speaker"></span>
                    </div>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>

        <button class="agenda-arrow agenda-arrow-right" @click="swiperNext">
          <img src="@/assets/image/arrow_right.png" alt="下一張">
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const props = defineProps({
  infoData: {
    type: Object,
    default: () => ({})
  }
});

const modules = [Autoplay, Navigation];
const swiperInstance = ref(null);
const activeTab = ref(0);
const localTopics = ref([]);

watch(() => props.infoData.topics, (newTopics) => {
  if (newTopics) {
    localTopics.value = JSON.parse(JSON.stringify(newTopics));
  }
}, { immediate: true });

const getImageUrl = (name) => {
  return new URL(`../assets/image/${name}`, import.meta.url).href
}

const toggleTopic = (index) => {
  localTopics.value[index].isOpen = !localTopics.value[index].isOpen;
};

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

const onSlideChange = (swiper) => {
  activeTab.value = swiper.realIndex;
};

const slideTo = (index) => {
  swiperInstance.value?.slideToLoop(index);
};

const swiperPrev = () => {
  swiperInstance.value?.slidePrev();
};

const swiperNext = () => {
  swiperInstance.value?.slideNext();
};
</script>

<style scoped>
.agenda-content {
  max-height: 56px;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
}

.agenda-content.open {
  max-height: 1000px;
}

.agenda-content.open p {
  max-height: 800px;
}

.agenda-content .arrow {
  transition: 0.5s;
  transform: rotate(0deg);
}

.agenda-content.open .arrow {
  transform: rotate(180deg);
}

.agenda-carousel-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
}

.agenda-carousel-wrapper {
  flex: 1;
  overflow: hidden;
}

.agenda-swiper {
  width: 100%;
}

.agenda-arrow {
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

.agenda-arrow:hover {
  transform: scale(1.1);
}

.agenda-arrow img {
  width: 100%;
  height: 100%;
  display: block;
}

.agenda-arrow-left {
  order: -1;
}

.agenda-arrow-right {
  order: 1;
}

@media screen and (max-width: 900px) {
  .agenda-arrow {
    width: 40px;
    height: 40px;
  }
  
  .agenda-carousel-container {
    gap: 15px;
  }
}

@media screen and (max-width: 680px) {
  .agenda-carousel-container {
    gap: 10px;
  }

  .agenda-arrow {
    width: 36px;
    height: 36px;
  }
  
  .agenda_btns .btn {
    width: 130px;
  }
}

@media screen and (max-width: 480px) {
  .agenda-carousel-container {
    gap: 5px;
  }

  .agenda-arrow {
    width: 30px;
    height: 30px;
  }
  
  .agenda_btns .btn {
    width: 110px;
  }
}

.agenda_tr:last-child .agenda-td {
  border-bottom: none;
}
</style>