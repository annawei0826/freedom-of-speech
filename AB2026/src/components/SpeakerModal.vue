<!-- SpeakerModal -->
<template>
  <div id="host_info_box" :class="{ show: isOpen }" @click="close">
    <div class="ct">
      <div class="host_info_item" @click.stop>
        <img src="@/assets/image/button-close.png" class="close_box" @click="close">
        <div class="box_name">{{ speaker?.name }}</div>
        <p class="box_intro" id="host_intro" v-html="speaker?.desc"></p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  speaker: Object
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>

<style scoped>
/* Styles are in layout.css */
</style>
