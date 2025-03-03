<template>
  <div class="nav-content" id="nav-content">
    <div class="content p-30">
      <div class="flex flex-jc content_box" style="margin-top: 40px">
        <div class="flex flex-col flex-ai" style="width: 780px">
          <div
            class="flex flex-col cp"
            style="background-color: #fff; border-radius: 18px; position: relative"
          >
            <div class="box_img" style="width: 748px; height: 308px; position: relative">
              <img src="@/assets/content_box.png" class="content_box" alt="" />
            </div>
            <img
              src="@/assets/content_box_logo.png"
              width="80"
              height="21"
              alt=""
              style="position: absolute; left: 25px; top: 25px"
            />
            <div class="flex flex-col" style="position: absolute; top: 120px; left: 50px">
              <div class="fs-40 text_out-1" style="font-family: alibb-medium">
                {{ bigTitleContent?.title }}
              </div>
              <div class="fs-16 mt-10 text_out-2" style="color: #637693; width: 305px">
                {{ bigTitleContent?.ziTitle }}
              </div>
            </div>
            <div class="content_dsy p-15">
              <div class="box_img_title text_out-1">{{ bigTitleContent?.title }}</div>
              <div class="box_img_content text_out-2 fs-12 mt-5" style="color: #637693;width: 700px">
                {{ bigTitleContent?.content }}
              </div>
            </div>
            <div class="fs_count flex flex-ai flex-jc">
              {{ bigTitleContent?.articleSum }}
            </div>
          </div>
          <div class="flex flex-ai w-100 mt-20 pl-30">
            <div class="fs-14">排序 |</div>
            <div
              v-for="(item, index) in sort"
              :key="index"
              class="ml-10 cp flex flex-ai fs-12 tabItem"
              :class="{ TabItemActive: initSort === index }"
              style="color: #637693"
              @click="sortChange(item, index)"
            >
              <div>{{ item.name }}</div>
              <div class="sort"></div>
            </div>
          </div>
          <div class="flex flex-ai flex-wrap">
            <div
              v-for="(item, index) in cardList"
              :key="index"
              class="flex flex-col ml-15 card_item mt-10 cp"
              style="background-color: #fff; border-radius: 18px"
            >
              <div class="box_img" style="width: 240px; height: 95px">
                <img src="@/assets/content_box.png" class="content_box" alt="" />
              </div>
              <div class="content_dsy p-15">
                <div class="box_img_title fs-14 cp">{{ item.title }}</div>
                <div class="box_img_content_item fs-10 mt-5" style="color: #637693">
                  {{ item.content }}
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="tabList flex mt-30">
              <div
                class="tabList_item flex flex-ai ml-10 px-10 py-3 fs-14"
                v-for="(item, index) in tabList"
                :key="index"
                :class="{ active: index === tabIndex }"
                @click="tabChange(item, index)"
              >
                <div>{{ item.name }}</div>
              </div>
            </div>
            <div class="tabList_content flex flex-col">
              <div
                v-for="(item, index) in tabListContent"
                :key="index"
                class="flex flex-ai p-20 mt-20"
                style="background-color: #fff; border-radius: 10px; position: relative"
              >
                <div class="tab_box_img" style="position: relative">
                  <img :src="item.image" alt="img" width="100%" height="100%" />
                  <div class="userLevelName" v-if="item.isMembersAreRequired">
                    {{ item.userLevelName }}
                  </div>
                </div>
                <div class="flex flex-col ml-15">
                  <div class="fs-14 cp" style="font-weight: 500" @click="toDetail(item)">
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
                        style="border-radius: 50%; object-fit: contain"
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
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getNavContentList,
  getNavContentBanner,
  getNavContentListTop,
} from "@/api/nav-content";
import { useUserStore } from "@/store/index";
import AvatorImg from "@/assets/login/icon.png";
import { ElMessage } from "element-plus";

const avator = ref(null);
const userStore = useUserStore();
// 接收传递过来的路由携带的参数
const route = useRoute();
const routePage = useRouter();
const id = route.params.id;
const bigTitleContent = ref({});
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
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
  const aa = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  dataListPage.value = aa;
};
const changePage = (item, index) => {
  current.value = index;
  getNavContentLists(initSort.value, id);
};
const next = () => {
  current.value = current.value + 1;
  getNavContentLists(initSort.value, id);
  if (current.value >= dataListPage.value.length) {
    current.value = 0;
    getNavContentLists(initSort.value, id);
  }
};
const getSortData = async () => {
  const res = await getNavContentListTop();
  sort.value = res.data;
};
const toDetail = (item) => {
  routePage.push({ name: "detail", params: { id: item.id } });
};
const initSort = ref(0);
const sort = ref();
const sortChange = (item, index) => {
  initSort.value = index;
  getNavContentLists(item.id, id);
};
const tabListContent = ref([]);
const getNavContentLists = async (sort = initSort.value, id) => {
  const res = await getNavContentList({
    pageNum: current.value + 1,
    pageSize: 10,
    portalNavigationBarId: id,
    sortType: sort,
  });
  tabListContent.value = res.data;
  totalPages.value = Math.ceil(res.count / 10);
  visiblePages();
};
const getNavContentBanners = async (id) => {
  const res = await getNavContentBanner({ portalNavigationBarId: id });
  bigTitleContent.value = res.data;
  console.log(res.data);
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
  () => route.params.id,
  (newVal, oldVal) => {
    // id = newVal
    getNavContentBanners(newVal);
    getNavContentLists(initSort.value, newVal);
  }
);
const timer = ref(null);
// 卸载时清除定时器
onBeforeUnmount(() => {
  clearInterval(timer.value);
});

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
  getNavContentBanners(id);
  getNavContentLists(initSort.value, id);
  getSortData();
});
</script>
<style scoped>
.content {
  background-color: #f8f9fb;
}

.dsy {
  font-weight: 600;
  font-size: 18px;
  color: #265aff;
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
.tabItem {
  color: #637693;
}
.TabItemActive {
  color: #000 !important;
}
.login_btn {
  width: 101px;
  height: 30px;
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
.tabList_content {
  width: 760px;
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
.userLevelName {
  position: absolute;
  left: 0;
  top: 0px;
  font-size: 12px;
  background-color: red;
  border-radius: 0px 2px 10px 0;
  padding: 2px 10px;
  color: #fff;
}
</style>
