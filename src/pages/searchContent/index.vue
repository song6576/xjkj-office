<template>
  <div class="search-content" id="search-content">
    <div class="content p-30">
      <div class="flex flex-jc content_box" style="margin-top: 40px">
        <div class="flex flex-col flex-ai" style="width: 780px">
          <div class="flex flex-col flex-ai cp left_content box_style">
            <div class="mt-50 input_box flex flex-ai">
              <img src="@/assets/search.png" class="search" alt="搜索" />
              <input
                class="input pl-50"
                placeholder="开启精彩搜索"
                v-model="searchValue"
              />
              <div class="search-btn cp flex flex-ai flex-jc" @click="toSearch">搜索</div>
            </div>
            <div
              class="history_box mt-30 flex flex-ai flex-col fs-14"
              style="color: #888"
            >
              <div class="history_title flex flex-ai w-100 flex-between fs-14">
                <div>历史搜索</div>
                <img
                  src="@/assets/delete.png"
                  class="delete cp"
                  width="14"
                  height="14"
                  alt="删除"
                  @click="deleteHistory"
                />
              </div>
              <div class="history_content flex flex-ai flex-wrap mt-10">
                <div
                  v-for="(item, index) in historyList"
                  :key="index"
                  class="fs-14 mr-10 py-2 px-4 cp"
                  style="
                    color: #888 !important;
                    background-color: #f5f5f5;
                    border-radius: 4px;
                  "
                  @click="tabSearch(item)"
                >
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
          <div class="box_style mt-10 left_content_bottom">
            <div class="flex flex-col p-20">
              <div>文章</div>
              <div class="line"></div>
              <div class="flex flex-ai mt-20 search_box">
                <div class="fs-14 search-box_content py-2 px-5" style="color: #888">
                  搜索[<span class="text">{{ searchValue }}</span
                  >]，共找到<span class="text">{{ contentTotal }}</span
                  >篇文章
                </div>
              </div>
              <div class="tabList_content flex flex-col mt-10">
                <div
                  v-for="(item, index) in tabListContent"
                  :key="index"
                  class="flex flex-ai p-20 mt-20 card_item"
                  style="background-color: #fff; border-radius: 10px; position: relative"
                >
                  <div class="tab_box_img">
                    <img :src="item.image" alt="img" width="100%" height="100%" />
                  </div>
                  <div class="flex flex-col ml-15">
                    <div
                      class="fs-14 cp"
                      style="font-weight: 500"
                      @click="toDetail(item)"
                    >
                      {{ item.title }}
                    </div>
                    <div class="pt-15 fs-12" style="color: #637693">
                      {{ item.describeContent }}
                    </div>
                    <div class="flex flex-ai mt-15">
                      <el-tag class="tag_nav mr-10 fs-10" size="small">{{
                        item.portalNavigationBarName
                      }}</el-tag>

                      <el-tag
                        v-for="(tag, index) in item.portalNavigationBarLabelIdName"
                        type="info"
                        :key="index"
                        class="tag_nav mr-10 fs-10"
                        size="small"
                        >#{{ tag }}</el-tag
                      >
                    </div>
                    <div class="flex flex-ai fs-12 mt-10" style="color: #637693">
                      <div class="avator flex flex-ai">
                        <img
                          :src="item.profilePicture"
                          style="border-radius: 50%;object-fit: contain;"
                          alt="img"
                          width="100%"
                          height="100%"
                        />
                      </div>
                      <div class="ml-10">{{ item.nickname }}</div>
                      <div class="ml-10 mr-10">|</div>
                      <div class="time">{{ item.createTime }}</div>
                    </div>
                  </div>
                  <div class="flex flex-ai fs-12 card_data" style="color: #9a9a9a">
                    <div class="flex flex-ai">
                      <img src="@/assets/pl.png" alt="img" width="12" height="12" />
                      <div class="ml-5">{{ item.numberOfComments }}</div>
                    </div>
                    <div class="flex flex-ai ml-15">
                      <img src="@/assets/gk.png" alt="img" width="12" height="12" />
                      <div class="ml-5">{{ item.previewQuantity }}</div>
                    </div>
                    <div class="flex flex-ai ml-15">
                      <img src="@/assets/dz.png" alt="img" width="12" height="12" />
                      <div class="ml-5">{{ item.numberOfLikes }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-ai flex-jc p-15">
              <div
                v-for="(item, index) in dataListPage"
                :key="index"
                class="px-10 py-3 fs-12 ml-10 cp pageItem text_box"
                style="border-radius: 5px"
                :class="{ activePage: current === index }"
                @click="changePage(item, index)"
              >
                <div>{{ item }}</div>
              </div>
              <div class="cp fs-12 ml-10 px-5 py-3 text_box" @click="next" v-if="dataListPage.length > 1">下一页</div>
            </div>
          </div>
        </div>
        <div class="ml-10 flex flex-col flex-ai right_modal">
          <div
            class="login flex flex-ai flex-col"
            style="background-color: #fff; border-radius: 10px"
          >
            <div style="position: relative">
              <img src="@/assets/login/bg.png" alt="bg" width="100%" height="100%" />
              <img
                :src="avator"
                alt="icon"
                width="80"
                height="80"
                class="icon"
                style="
                  position: absolute;
                  top: 100%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  border-radius: 50%;
                  object-fit: cover;
                "
              />
            </div>
            <div class="fs-12" style="color: #989ea6; margin-top: 60px">Hi,欢迎登录</div>
            <div class="flex flex-ai mt-5" v-if="!isShow">
                <div class="fs-15">{{ userInfo?.nickname }}</div>
                <img
                  :src="userInfo?.levelLogin"
                  width="20"
                  height="20"
                  alt=""
                  class="ml-3"
                />
              </div>
            <div class="btn_box flex flex-ai mt-26" v-if="isShow">
              <div
                class="btn flex flex-ai flex-jc login_btn cp"
                @click="openMyModal('登录')"
              >
                登录
              </div>
              <div
                class="btn flex flex-ai flex-jc register_btn ml-10 cp"
                @click="openMyModal('注册')"
              >
                注册
              </div>
            </div>
            <div class="btn_box flex flex-ai mt-26" v-else>
              <div
                class="btn flex flex-ai flex-jc register_btn ml-10 cp"
                @click="loginOut"
              >
                退出登录
              </div>
              <div class="btn flex flex-ai flex-jc user_btn ml-10 cp" @click="userPage">
                  用户中心
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted,onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getArticleList } from "@/api/home";
import { useUserStore } from "@/store/index";
import AvatorImg from "@/assets/login/icon.png";
import { ElMessage } from "element-plus";

const avator = ref(null);
const userStore = useUserStore();
const routePage = useRouter();
// 接收传递过来的路由携带的参数
const route = useRoute();
const historyList = ref([]);
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const getSearchArr = () => {
  historyList.value = userStore.getKeyWord();
};
const keyword = route.params?.keyword;
const searchValue = ref(keyword);
const current = ref(0);
const dataListPage = ref([1, 2, 3, 4, 5]);
const totalPages = ref(0);
const userPage = () => {
  routePage.push({ name: "userDetail" });
};
const visiblePages = () => {
  let startPage = Math.max(current.value - Math.floor(10 / 2), 1);
  let endPage = startPage + 10 - 1;

  if (endPage > totalPages.value) {
    endPage = totalPages.value;
    startPage = Math.max(endPage - 10 + 1, 1);
  }
  const aa = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  dataListPage.value = aa;
}
const contentTotal = ref(0);
const changePage = (item, index) => {
  current.value = index;
  getArticleLists(keyword);
};
const next = () => {
  current.value = current.value + 1;
  getArticleLists(keyword);
  if (current.value >= dataListPage.value.length) {
    current.value = 0;
    getArticleLists(keyword);
  }
};
const deleteHistory = () => {
  userStore.clearKeyWord();
  getSearchArr();
};
const tabSearch = (item) => {
  // getArticleLists(item)
  routePage.push({ name: "searchContent", params: { keyword: item } });
  searchValue.value = item;
};
const toSearch = () => {
  if (!searchValue.value) {
    searchValue.value = "";
    getArticleLists()
    routePage.push({ name: "searchContent", params: { keyword: searchValue.value} });
    return;
  }
  userStore.setKeyWord(searchValue.value);
  routePage.push({ name: "searchContent", params: { keyword: searchValue.value } });
  getArticleLists(searchValue.value);
};

// 监听键盘回车
document.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    toSearch();
    console.log("searchValue2", searchValue.value,keyword);
  }
});
const toDetail = (item) => {
  routePage.push({ name: "detail", params: { id: item.id } });
};
const tabListContent = ref([]);
const getArticleLists = async (keyword) => {
  const res = await getArticleList({
    pageNum: current.value + 1,
    pageSize: 10,
    keyword,
  });
  console.log("res", res.data);
  contentTotal.value = res.count;
  tabListContent.value = res.data;
  totalPages.value = Math.ceil(res.count/ 10)
  visiblePages()
};
const loginOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  ElMessage({
    message: "退出登录成功",
    type: "success",
  });
  isShow.value = true;
  avator.value = AvatorImg;
  // 刷新页面
  window.location.reload();
};
const openMyModal = async (text) => {
  if (text === "注册") {
    userStore.showRegisterModal();
  } else {
    userStore.showLoginModal();
  }
};
const isShow = ref(true);
// 监听id的变化
watch(
  () => route.params?.keyword,
  (newVal, oldVal) => {
    getArticleLists(newVal);
  }
);
const timer = ref(null)
onMounted(() => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (user) {
    isShow.value = false;
    avator.value = user?.headSculpture;
  } else {
    isShow.value = true;
    avator.value = AvatorImg;
  }
  timer.value = setInterval(() => {
    if (localStorage.getItem("token")) {
      isShow.value = false;
    }
  }, 1000);
  getArticleLists(keyword);
  getSearchArr();
});
// 卸载时清除定时器
onBeforeUnmount(() => {
  clearInterval(timer.value);
});

</script>
<style scoped>
.content {
  background-color: #f8f9fb;
}

.left_content_bottom {
  width: 748px;
  background: #fff;
}
.box_style {
  border-radius: 18px;
  box-shadow: 0 0 10px rgba(116, 116, 116, 0.08);
}
.text_box {
  border-radius: 4px;
  background: rgba(136, 136, 136, 0.1);
}
.left_content {
  background: #fff;
  width: 748px;
  height: 308px;
  position: relative;
}
.card_item:hover {
  transition: margin-top 1s;
  margin-top: 5px;
  box-shadow: 0 0 10px rgba(116, 116, 116, 0.3);
}
.search-box_content {
  border-radius: 4px;
  background: rgba(136, 136, 136, 0.1);
}
.text {
  font-size: 15px;
  font-weight: 500;
  color: #268df7;
}
.dsy {
  font-weight: 600;
  font-size: 18px;
  color: #265aff;
}
.line {
  width: 100%;
  height: 1px;
  margin-top: 20px;
  background-color: rgba(116, 116, 116, 0.18);
}
.box_img img {
  width: 100%;
  height: 100%;
}
.right_modal {
  width: 296px;
}
.box_img_content_item {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.login {
  width: 296px;
  height: 308px;
}
.login_btn {
  width: 101px;
  height: 40px;
  background: linear-gradient(126deg, #0961fe 0%, #0b99f5 100%);
  border-radius: 20px;
  color: #fff;
  border-image: linear-gradient(153deg, rgba(50, 201, 255, 1), rgba(171, 255, 255, 1)) 1 1;
}
.register_btn {
  width: 101px;
  height: 30px;
  background: linear-gradient(126deg, #fd7808 0%, #f8b41a 100%);
  border-radius: 20px;
  color: #fff;
  border-image: linear-gradient(153deg, rgba(248, 169, 55, 1), rgba(255, 216, 161, 1)) 1 1;
}
.office {
  width: 296px;
  height: 900px;
  background-color: #fff;
  border-radius: 10px;
}
.active {
  background: #3873ff;
  border-radius: 10px;
  color: #fff;
}
.tab_box_img {
  width: 160px;
  height: 113px;
  border-radius: 10px;
}
.avator {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
.activePage {
  color: #fff;
  background: #3873ff !important;
}
.pageItem {
  background-color: #fff;
}
.card_data {
  position: absolute;
  right: 3%;
  bottom: 13%;
}
.fs_count {
  position: absolute;
  top: 5%;
  right: 2%;
  padding: 5px 10px;
  border-radius: 8px;
  background-color: #fff;
  color: #4d4d4d;
  font-size: 12px;
  opacity: 0.7;
}
.sort::before {
  content: "";
  width: 4px;
  height: 4px;
  margin: 0 0.5rem;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  background: #6c6d6e;
  opacity: 0.3;
}
input {
  border: none;
  outline: none;
  border-bottom: 1px solid #ccc;
}
.input {
  width: 480px;
  height: 50px;
  background: rgba(255, 255, 255, 0.44);
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.07);
  border-radius: 25px;
  border: 1px solid #ffffff;
  backdrop-filter: blur(10px);
}
.input_box {
  position: relative;
}
.search {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  z-index: 99;
}
.search-btn {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  width: 91px;
  height: 38px;
  background: #3873ff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
  border-radius: 19px;
  color: #fff;
}
</style>
