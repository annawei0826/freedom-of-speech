<template>
  <div class="sec traffic_bg" id="sec5">
    <div class="mid_content" data-aos="fade-up">
      <div class="sec_title">
        <h2 class="title_bg_box">
          <img src="@/assets/image/title_bg.png" alt="">
          {{ infoData.title }}
        </h2>
      </div>

      <div 
        v-for="(venue, index) in infoData.venues" 
        :key="index"
        :class="{ 'mb_40': index < infoData.venues.length - 1 }"
      >
        <img :src="getImageUrl(venue.addressImage)" class="address_head">

        <div class="traffic_body">

          <div class="map_wrap">
            <div class="map-responsive">
              <iframe
                :src="venue.mapUrl"
                width="100%" 
                height="450" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>


          <div class="centerBox">
            <div class="traffic_item_wrap">
              <div 
                v-for="(transport, tIndex) in venue.transportation" 
                :key="tIndex"
                class="traffic_item"
              >
                <div class="traffic_icon">
                  <img :src="getImageUrl(transport.icon)" />
                </div>
                <div class="traffic_des">
                  <p class="traffic_title">{{ transport.type }}</p>
                  <p class="traffic_txt" v-html="transport.description"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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


const getImageUrl = (name) => {
  return new URL(`../assets/image/${name}`, import.meta.url).href;
};
</script>