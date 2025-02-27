<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/header/index.vue'
import Footer from '@/components/footer/index.vue'
</script>

<style>
@font-face {
    font-family: 'alibb-bord';
    src: url('@/font/ALIBABA-PUHUITI-BOLD.OTF') format('truetype');
    font-weight: normal;
    font-style: normal;
}
@font-face {
  font-family: 'alibb-medium';
  src: url('@/font/ALIBABA-PUHUITI-MEDIUM.OTF') format('truetype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'alibb-light';
  src: url('@/font/ALIBABA-PUHUITI-LIGHT.OTF') format('truetype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'alibb-regular';
  src: url('@/font/ALIBABA-PUHUITI-REGULAR.OTF') format('truetype');
  font-weight: normal;
  font-style: normal;
}
.bg-color {
  background-color: #f8f9fb;
}
.content-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content-wrapper video {
  position: relative;
  left: 50%;
  transform: translate(-50%);
  width: 100%;
  border-radius: 10px;
}
.user_btn {
  width: 101px;
  height: 30px;
  background: linear-gradient(126deg, #0c2b2f 0%, #39ece3 100%);
  border-radius: 20px;
  color: #fff;
}
.header .header-title {
  display: none !important;
}
html, body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    overflow: auto;
}
/* 去掉滑块 */
body::-webkit-scrollbar {
    display: none;
}
</style>
