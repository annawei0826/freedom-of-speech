<template>
  <div id="FOOTER" class="white_skin">
    <div class="centerBox">
      <div class="logos">
        <div class="logo">
          <div class="logo_title">{{ footerData.organizer.title }}</div>
          <img src="@/assets/image/logo.png" alt="">
        </div>
        <div class="logo">
          <div class="logo_title">{{ footerData.sponsor.title }}</div>
          <img src="@/assets/image/logo2.png" alt="">
        </div>
      </div>
    </div>

    <p class="copyright">
      {{ footerData.service.phone }} &nbsp;&nbsp;&nbsp;&nbsp; {{ footerData.service.hours }}
      <br><br>
      {{ footerData.copyright[0] }}
      <br>
      {{ footerData.copyright[1] }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  footerData: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
#FOOTER {
  float: left;
  background-color: #fff;
  position: relative;
  z-index: 2;
  width: 100%;
  text-align: center;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 100px 20px 100px 20px;
}

.centerBox {
  display: flex;
  justify-content: center;
  width: 100%;
}

.logos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  width: 100%;
  max-width: 500px;
}

.logos .logo {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 210px;
}

.logos .logo .logo_title {
  font-size: 14px;
}

.logos .logo img {
  height: 48px;
}

.copyright {
  display: inline-block;
  width: 60%;
  text-align: center;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 14px;
  color: #313233;
}
</style>