<template>
  <div class="user_detail bg-color flex flex-jc" id="user_detail">
    <div class="content_detail flex flex-col">
      <div class="user_detail_top flex flex-col">
        <img src="@/assets/content_box.png" class="user_detail_top_img" alt="" />
        <div class="user_detail_top_text">
          <div class="user_detail_content flex flex-ai">
            <div class="user_detail_header_box">
              <img
                :src="userInfo?.headSculpture"
                class="user_detail_top_text_img cp"
                alt=""
              />
            </div>

            <div class="flex flex-ai mt-40">
              <div class="fs-26 ml-15">{{ userInfo?.nickname }}</div>
              <img :src="userInfo?.levelLogin" width="40" height="40" class="ml-5" />
            </div>
          </div>
        </div>
      </div>
      <div class="comment_list flex flex-col">
        <div class="flex flex-ai comment_list_tab">
          <div class="bar"></div>
          <div class="fs-16 pl-5">评论 {{ userInfo?.numberOfComments }}</div>
        </div>
        <div class="line"></div>
        <div class="flex flex-ai flex-col flex-jc">
          <div class="flex flex-ai flex-wrap">
            <div
              class="flex flex-ai mt-20 comment_list_item cp fs-14 ml-15"
              v-for="(item, index) in commentList"
              :key="index"
              @click="goPage(item)"
            >
              <div class="fs-14" style="color: #999">
                {{ formatTime(item.createTime) }}
              </div>
              <div class="flex flex-col ml-20">
                <div v-html="item.content"></div>
                <div class="mt-5 fs-12" style="color: #999">
                  评论于：{{ item.portalNavigationBarArticleTitle }}
                </div>
              </div>
            </div>
          </div>
          <div class="mt-30 flex flex-ai">
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
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getCommentList } from "@/api/comment";

const router = useRouter();
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
onMounted(() => {
  getCommentLists();
});
const commentList = ref([]);
const getCommentLists = async () => {
  const res = await getCommentList({
    appUserId: userInfo?.id,
    pageSize: 5,
    pageNum: current.value + 1,
  });
  commentList.value = res.data;
  totalPages.value = Math.ceil(res.count / 10);
  visiblePages();
};

const goPage = (item) => {
  router.push({ name: "detail", params: { id: item.portalNavigationBarArticleId } });
};
const current = ref(0);
const dataListPage = ref([1, 2, 3, 4, 5]);
const changePage = (item, index) => {
  current.value = index;
  getCommentLists();
};
const next = () => {
  current.value = current.value + 1;
  getCommentLists();
  if (current.value >= dataListPage.value.length) {
    current.value = 0;
    getCommentLists();
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
const formatTime = (timeStr) => {
  const targetDate = new Date(timeStr);
  const now = new Date();
  const diffTime = now - targetDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    if (diffMinutes < 1) {
      return "刚刚";
    } else if (diffMinutes < 60) {
      return `${diffMinutes}分钟前`;
    } else {
      const diffHours = Math.floor(diffMinutes / 60);
      return `${diffHours}小时前`;
    }
  } else if (diffDays === 1) {
    const hours = targetDate.getHours().toString().padStart(2, "0");
    const minutes = targetDate.getMinutes().toString().padStart(2, "0");
    return `昨天 ${hours}:${minutes}`;
  } else if (diffDays === 2) {
    return "前天";
  } else {
    const year = targetDate.getFullYear();
    const month = (targetDate.getMonth() + 1).toString().padStart(2, "0");
    const day = targetDate.getDate().toString().padStart(2, "0");
    const hours = targetDate.getHours().toString().padStart(2, "0");
    const minutes = targetDate.getMinutes().toString().padStart(2, "0");
    if (year === now.getFullYear()) {
      return `${month}-${day} ${hours}:${minutes}`;
    } else {
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
  }
};

const timeStr = "2025-02-25 10:03:51";
const formattedTime = formatTime(timeStr);
console.log(formattedTime);
</script>
<style scoped>
@import url(./index.css);
</style>
