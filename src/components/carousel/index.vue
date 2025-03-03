<template>
  <div class="title">素人星库</div>
  <div class="carousel w-100 flex flex-col flex-jc">
    <div class="flex flex-ai flex-jc w-100 mt-28">
      <div class="flex flex-ai flex-jc tab">
        <div
          class="flex flex-ai tab_item cp"
          v-for="(item, index) in tabList"
          :key="item.id"
          :class="tabIndex === index ? 'active' : ''"
          @click="tabChange(item, index)"
        >
          <div>{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div style="margin: 28px auto">
      <div class="flex flex-ai flex-jc">
        <swiper
          :slidesPerView="4"
          :pagination="{
            clickable: false,
          }"
          :autoplay="{
            delay: 2500, // 自动轮播的间隔时间，单位为毫秒
            disableOnInteraction: false, // 用户操作后是否停止自动轮播，设为 false 表示不停止
          }"
          :loop="true"
          :modules="modules"
          class="mySwiper"
          style="width: 1150px"
        >
          <swiper-slide v-for="(item, index) in cardlist" :key="index">
            <div
              class="card_item flex flex-col ml-25 cp"
              @click="changeCard(item, index)"
            >
              <div class="card-content">
                <div class="avator_box flex flex-ai flex-between w-100">
                  <img
                    :src="item.image"
                    class="avator"
                    alt="头像"
                    style="object-fit: cover"
                  />
                </div>
                <div class="p-10 text_box">
                  <div class="fs-18 name">{{ item.nickname }}</div>
                  <div class="fs-13 dsy mt-15 carousel_content" :title="item.introduce">
                    {{ item.introduce }}
                  </div>
                  <img
                  :src="getPlatformLogo(item.taskClueSourceTypeId)"
                  class="icon_name"
                  alt="平台"
                />
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getRedPeople, getRedPeopleList } from "@/api/home";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Howl } from "howler";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

onMounted(() => {
  getTabList();
});

const router = useRouter();
const getTabList = async () => {
  const res = await getRedPeople();
  tabList.value = res.data;
  const data = await getRedPeopleLists({
    sourceTypeId: res.data[0].id,
  });
  console.log(data, res.data);
  cardlist.value = data;
};
const getRedPeopleLists = async (params) => {
  const res = await getRedPeopleList({
    pageNum: 1,
    pageSize: 20,
    ...params,
  });
  return res.data;
};
const play = (item) => {
  const sound = new Howl({
    src: [item.sound],
    html5: true,
  });
  sound.play();
};
const tabList = ref([]);
const tabIndex = ref(0);
const tabChange = async (item, index) => {
  console.log(item, index);
  const data = await getRedPeopleLists({
    sourceTypeId: item.id,
  });
  cardlist.value = data;
  console.log(data);
  tabIndex.value = index;
};
const cardlist = ref([]);
const changeCard = (item, index) => {
  router.push({
    name: "srxk",
    params: {
      id: item.id,
    },
  });
};
const getPlatformLogo = (platform) => {
  switch (platform) {
    case 1:
      return require("@/assets/icon/douyin.png");
    case 2:
      return require("@/assets/icon/xhs.png");
    case 3:
      return require("@/assets/icon/ks.png");
    case 4:
      return require("@/assets/icon/Bilibili.png");
    default:
      return require("@/assets/icon/douyin.png"); // 默认图标
  }
};
const modules = [Autoplay,EffectFade];
</script>

<style scoped>
.title {
  font-family: "alibb-medium";
  font-size: 34px;
  color: #1f2329;
  line-height: 47px;
  font-weight: 500;
}
.tab {
  background-color: #fff;
  border-radius: 20px;
  padding: 5px;
}
.tab_item {
  padding: 2px 20px;
  font-size: 15px;
}
.active {
  background: #3873ff;
  color: #fff;
  border: 1px solid #3873ff;
  border-radius: 15px;
}
.card_item {
  position: relative;
  width: 230px;
  height: 300px;
  background: linear-gradient(360deg, #e6f5fc 0%, #ffffff 100%);
  border-radius: 15px;
}
.card_item:hover .text_box {
    transition: height 0.8s;
    height: 40%;
}

.card_item:hover {
    transition: box-shadow 0.8s;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
}
.text_box {
  position: absolute;
  bottom: 0;
  width: 92%;
  height: 22%;
  color: #fff;
  letter-spacing: 1px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px 10px 0px 0;
}
.avator_box {
  width: 100%;
  /* background-color: red; */
  /* height: 125px; */
  border-radius: 10px 10px 20px 0;
}
/* .avator_box:hover {
  img {
    transition: transform 0.8s;
    transform: scale(1.5);
  }
} */
.avator {
  width: 100%;
  height: 100%;
  /* border-radius: 50%; */
  border-radius: 10px 10px 0px 0;
  background-color: #e6f5fc;
}
.icon_name {
  position: absolute;
  top: 15%;
  right: 10px;
  width: 24px;
  height: 24px;
}
.count {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: #949494;
}
.card-content {
  position: relative;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
}
.name {
  font-family: alibb-medium;
  font-weight: 500;
}
.carousel_content {
  font-family: alibb-regular;
  /* 超出隐藏 */
  overflow: hidden;
  /* 超出显示省略号 */
  text-overflow: ellipsis;
  /* 强制3行显示 */
  display: -webkit-box;
  /* -webkit-line-clamp: 6; */
  -webkit-box-orient: vertical;
}
.card {
  position: relative;
  width: 1300px;
}
.left {
  width: 14px;
  height: 24px;
  position: absolute;
  left: 6%;
  top: 50%;
  transform: translate(0, -50%);
}
.right {
  width: 14px;
  height: 24px;
  position: absolute;
  right: 6%;
  top: 50%;
  transform: translate(0, -50%);
}
.audio {
  position: absolute;
  bottom: 10px;
  left: 10px;
}
</style>
