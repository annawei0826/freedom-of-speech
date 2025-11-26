<template>
  <div class="sec" id="sec1">
    <div class="mid_content" data-aos="fade-up">
      <div class="sec_title">
        <h2 class="title_bg_box">
          <img src="@/assets/image/title_bg.png" alt="">
          {{ infoData.title }}
        </h2>
      </div>
      <div class="des" v-html="infoData.desc"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  infoData: {
    type: Object,
    default: () => ({})
  }
});
</script>
