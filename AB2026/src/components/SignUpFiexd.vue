<template>
  <img 
    src="@/assets/image/link.png" 
    class="q_link btn_scroll" 
    @click="scrollToSection"
    alt="立即報名"
  >
</template>

<script setup>
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

const scrollToSection = () => {
  const targetElement = document.querySelector('#sec4');
  
  if (!targetElement) {

    return;
  }

  const headerHeight = document.querySelector('#HEADER')?.offsetHeight || 100;
  const targetPosition = targetElement.offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition - headerHeight;
  const duration = 1500;
  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);
    
    window.scrollTo(0, startPosition + distance * ease);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};
</script>

<style scoped>
.q_link {
  position: fixed;
  width: 68px;
  right: 20px;
  bottom: 30%;
  cursor: pointer;
  z-index: 10;
  transition: opacity 0.3s ease;
}

.q_link:hover {
  opacity: 0.5;
}

@media screen and (max-width: 480px) {
  .q_link {
    width: 40px;
    right: 10px;
  }
}
</style>