<template>
  <div class="sec" id="sec6">
    <div class="mid_content" data-aos="fade-up">
      <div class="article_title_wrap">
        <img src="@/assets/image/star1.png" class="star5" alt="">
        <div class="article_title">
          延伸閱讀<span>深入報導</span>
        </div>
      </div>

      <div class="article_wrap">
        <div class="article_item" v-for="(item, index) in infoData.articles" :key="index">
          <img :src="getImageUrl(item.img)" class="cover">
          <h2>{{ item.title }}</h2>
          <p>{{ item.desc }}</p>
          <a :href="item.link" target="_blank">閱讀更多</a>
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
  return new URL(`../assets/image/${name}`, import.meta.url).href
}
</script>

<style scoped>
#sec6 {
  padding: 0px 20px 100px 20px;
  background-color: #FDF4CC;
}

.article_title_wrap {
  float: left;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 50px;
  text-align: center;
  position: relative;
}

.article_title {
  display: inline;
  position: relative;
  text-align: left;
  font-size: 40px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding-right: 310px;
}

.article_title:after {
  content: '';
  position: absolute;
  width: 300px;
  height: 1px;
  background-color: #000;
  right: 0px;
  bottom: 10px;
}

.article_title span {
  font-size: 24px;
  margin-left: 10px;
}

.article_wrap {
  display: grid;
  grid-template-columns: repeat(3, 340px);
  gap: 20px;
  justify-content: center;
  width: 100%;
}

.article_item {
  width: 340px;
  text-align: center;
  margin-bottom: 10px;
}

.article_item .cover {
  float: left;
  width: 100%;
  border-radius: 8px;
}

.article_item h2 {
  float: left;
  text-align: left;
  width: 100%;
  font-size: 24px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 10px;
}

.article_item p {
  float: left;
  text-align: left;
  width: 100%;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  box-sizing: border-box;
  margin-top: 10px;
}

.article_item a {
  display: inline-block;
  font-size: 20px;
  width: 240px;
  height: 50px;
  line-height: 50px;
  color: #E15100;
  font-weight: 700;
  background-color: #ffffff;
  border-radius: 25px;
  margin-top: 20px;
  text-decoration: none;
}

.article_item a:hover {
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
  filter: alpha(opacity=50);
  -moz-opacity: 0.5;
  opacity: 0.5;
  -moz-transition: ease-in-out 0.3s;
  -o-transition: ease-in-out 0.3s;
  -webkit-transition: ease-in-out 0.3s;
  transition: ease-in-out 0.3s;
}

.star5 {
  position: absolute;
  z-index: 1;
  width: 64px;
  left: 0px;
  top: 0px;
}

@media screen and (max-width: 1180px) {
  .article_wrap {
    grid-template-columns: repeat(2, 300px);
  }

  .article_item {
    width: 300px;
    text-align: center;
  }

  .star5 {
    display: none;
  }
}

@media screen and (max-width: 680px) {
  .article_title {
    display: inline;
    position: relative;
    text-align: left;
    font-size: 40px;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-right: 0px;
  }

  .article_title:after {
    content: '';
    position: absolute;
    width: 90px;
    height: 1px;
    background-color: #ffffff;
    right: 0px;
    bottom: 10px;
    display: none;
  }

  .article_wrap {
    grid-template-columns: repeat(1, 300px);
    gap: 0px;
  }

  .article_item {
    width: 300px;
    margin-bottom: 20px;
    text-align: center;
  }
}
</style>