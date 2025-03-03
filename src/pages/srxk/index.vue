<template>
  <div class="srck flex flex-col flex-jc">
    <div class="content_srck flex flex-col">
      <div class="flex">
        <div class="flex flex-col">
          <div class="flex">
            <div class="bar_srck"></div>
            <div class="flex flex-col">
              <div class="fs-26" style="font-family: alibb-regular">素人简介</div>
              <div
                class="fs-12"
                style="font-weight: 600; letter-spacing: 2px; font-style: italic"
              >
                INTRODUCTION
              </div>
            </div>
          </div>
          <div class="flex mt-20">
            <div class="photo_box">
              <img :src="data?.image" alt="" />
            </div>
            <div class="flex flex-col ml-40">
              <div>
                <div class="fs-30 name">{{ data?.nickname }}</div>
                <!-- <div>xxxx</div> -->
              </div>
              <div class="flex mt-20">
                <div class="flex flex-col flex-ai">
                  <div
                    class="fs-22"
                    style="
                      font-weight: 600;
                      letter-spacing: 1px;
                      font-family: alibb-regular;
                    "
                  >
                    平台
                  </div>
                  <img
                    :src="getPlatformLogo(data?.taskClueSourceTypeId)"
                    width="30"
                    height="30"
                    alt=""
                    class="mt-10"
                  />
                </div>
                <div class="flex flex-col flex-ai ml-40" v-if="data?.sound">
                  <div
                    class="fs-22"
                    style="
                      font-weight: 600;
                      letter-spacing: 1px;
                      font-family: alibb-regular;
                    "
                  >
                    语音
                  </div>
                  <img
                    src="@/assets/audio_icon.png"
                    width="30"
                    height="28"
                    alt=""
                    class="mt-10 cp"
                    @click="play"
                  />
                </div>
              </div>
              <div class="line my-20" style="height: 2px"></div>
              <div class="flex flex-col">
                <div class="flex flex-ai mt-20">
                  <div class="fs-20" style="font-family: alibb-regular">Title</div>
                  <div class="title_dsy">{{ data?.title }}</div>
                </div>
                <div class="flex flex-ai mt-30">
                  <div class="fs-20" style="font-family: alibb-regular">标签</div>
                  <div class="tag_srck flex flex-ai">
                    <div
                      class="tag_item"
                      v-for="(item, index) in data?.labelName"
                      :key="index"
                      :class="{ 'ml-20': index > 0 }"
                    >
                      {{ item }}
                    </div>
                  </div>
                </div>
                <div class="flex mt-30 person">
                  <div class="fs-20 person_title" style="font-family: alibb-regular">
                    个人描述
                  </div>
                  <div class="ml-40 person_content">{{ data?.content }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex mt-40">
          <div class="bar_srck"></div>
          <div class="flex flex-col">
            <div class="fs-26" style="font-family: alibb-regular">素人作品集-图片</div>
            <div
              class="fs-12"
              style="font-weight: 600; letter-spacing: 2px; font-style: italic"
            >
              PORTFOLIO
            </div>
          </div>
        </div>
        <div class="flex mt-20">
          <div
            class="img_box"
            v-for="(item, index) in imgList"
            :key="index"
            :class="{ 'ml-20': index > 0 }"
          >
            <img
              :src="item.image"
              alt=""
              width="100%"
              height="100%"
              style="object-fit: cover"
            />
          </div>
        </div>
        <div class="mt-30 flex flex-ai" v-if="totalPages > 1">
          <div
            v-for="(item, index) in dataListPage"
            :key="index"
            class="px-10 py-3 fs-12 ml-10 cp pageItem"
            style="border-radius: 5px"
            :class="{ activePage: current === index }"
            @click="changePage(item, index)"
          >
            <div>{{ item }}</div>
          </div>
          <div
            class="cp fs-12 ml-10 px-5 py-3"
            style="background-color: #fff"
            @click="next"
            v-if="dataListPage.length > 1"
          >
            下一页
          </div>
        </div>
      </div>
      <div>
        <div class="flex mt-40">
          <div class="bar_srck"></div>
          <div class="flex flex-col">
            <div class="fs-26" style="font-family: alibb-regular">素人作品集-视频</div>
            <div
              class="fs-12"
              style="font-weight: 600; letter-spacing: 2px; font-style: italic"
            >
              PORTFOLIO VIDEO
            </div>
          </div>
        </div>
        <div class="flex mt-20">
          <div
            class="video_box"
            v-for="(item, index) in videoList"
            :key="index"
            :class="{ 'ml-20': index > 0 }"
          >
            <video
              :src="item.image"
              alt=""
              width="100%"
              height="100%"
              controls
              style="object-fit: cover"
            />
          </div>
        </div>
        <div class="mt-30 flex flex-ai" v-if="totalPagesVideo > 1">
          <div
            v-for="(item, index) in dataListPageVideo"
            :key="index"
            class="px-10 py-3 fs-12 ml-10 cp pageItem"
            style="border-radius: 5px"
            :class="{ activePage: currentVideo === index }"
            @click="changePageVideo(item, index)"
          >
            <div>{{ item }}</div>
          </div>
          <div
            class="cp fs-12 ml-10 px-5 py-3"
            style="background-color: #fff"
            @click="nextVideo"
            v-if="dataListPageVideo.length > 1"
          >
            下一页
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { geDetail, gePagination } from "@/api/srxk";
import { Howl } from "howler";

const route = useRoute();
const data = ref({});
const imgList = ref([]);
const videoList = ref([]);
const geDetails = async () => {
  const res = await geDetail({
    id: route.params.id,
  });
  data.value = res.data;
  sound.value = new Howl({
    src: [res.data.sound],
    html5: true, // 强制使用HTML5音频
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
const current = ref(0);
const dataListPage = ref([]);
const changePage = (item, index) => {
  current.value = index;
  gePaginations(1);
};
const next = () => {
  current.value = current.value + 1;
  if (current.value >= dataListPage.value.length) {
    current.value = 0;
    gePaginations(1);
  } else {
    gePaginations(1);
  }
};
const totalPages = ref(0);
const visiblePages = () => {
  let startPage = Math.max(current.value - Math.floor(10 / 2), 1);
  let endPage = startPage + 10 - 1;

  if (endPage > totalPages.value) {
    endPage = totalPages.value;
    startPage = Math.max(endPage - 10 + 1, 1);
  }
  const aa = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  dataListPage.value = aa;
};
const currentVideo = ref(0);
const dataListPageVideo = ref([]);
const changePageVideo = (item, index) => {
  currentVideo.value = index;
  gePaginations(2);
};
const nextVideo = () => {
  currentVideo.value = currentVideo.value + 1;
  if (currentVideo.value >= dataListPageVideo.value.length) {
    currentVideo.value = 0;
    gePaginations(2);
  } else {
    gePaginations(2);
  }
};
const totalPagesVideo = ref(0);
const visiblePagesVideo = () => {
  let startPage = Math.max(currentVideo.value - Math.floor(10 / 2), 1);
  let endPage = startPage + 10 - 1;

  if (endPage > totalPagesVideo.value) {
    endPage = totalPagesVideo.value;
    startPage = Math.max(endPage - 10 + 1, 1);
  }
  const aa = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  dataListPageVideo.value = aa;
};
const gePaginations = async (type) => {
  const res = await gePagination({
    pageNum: current.value + 1,
    pageSize: 4,
    portalAmateurIpLibraryId: route.params.id,
    type,
  });
  if (type === 1) {
    imgList.value = res.data;
    if(res.count>4){
      totalPages.value = Math.ceil(res.count / 10)+1;
    } else {
      totalPages.value = Math.ceil(res.count / 10);
    }
    visiblePages();
  } else {
    videoList.value = res.data;
    if(res.count>4){
      totalPagesVideo.value = Math.ceil(res.count / 10)+1;
    } else {
      totalPagesVideo.value = Math.ceil(res.count / 10);
    }
    visiblePagesVideo();
  }
};
const sound = ref(null);
const play = () => {
  console.log(sound.value);
  sound.value.play();
};
onMounted(() => {
  gePaginations(1);
  gePaginations(2);
  geDetails();
});
</script>
<style scoped>
@import url("./index.css");
</style>
