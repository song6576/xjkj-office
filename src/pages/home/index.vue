<template>
  <div>
    <!-- <Header /> -->
    <Banner />
    <div class="flex flex-col flex-ai pb-50" style="background-color: #f8f9fb">
      <Carousel />
      <div class="content">
        <div class="title w-100 flex flex-jc flex-ai">
          <div>七大境界铸素人蜕变路，<span class="dsy">精准引流破私域矩阵图</span></div>
        </div>
        <div class="flex flex-jc content_box" style="margin-top: 40px">
          <div class="flex flex-col flex-ai" style="width: 780px">
            <div
              class="flex flex-col cp"
              style="background-color: #fff; border-radius: 18px; position: relative"
              @click="goNavContent(bigTitleContent)"
            >
              <div
                class="box_img"
                style="width: 748px; height: 308px; position: relative"
              >
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
                <div class="fs-40" style="font-family: alibb-medium;">矩阵引流实战</div>
                <div class=" fs-16 mt-10" style="color: #637693;width: 305px">
                  在数字海洋中，矩阵引流，不止是数字游戏 更是策略的艺术
                </div>
              </div>
              <div class="content_dsy p-15">
                <div class="box_img_title">{{ bigTitleContent?.title }}</div>
                <div class="box_img_content fs-12 mt-5" style="color: #637693">
                  {{ bigTitleContent?.content }}
                </div>
              </div>
              <div class="fs_count flex flex-ai flex-jc">
                {{ bigTitleContent?.articleSum }}
              </div>
            </div>
            <div class="flex flex-ai flex-wrap">
              <div
                v-for="(item, index) in cardList"
                :key="index"
                class="flex flex-col ml-15 card_item mt-20 cp"
                style="background-color: #fff; border-radius: 18px;position: relative"
                @click="goNavContent(item)"
              >
                <div class="box_img" style="width: 240px; height: 95px;position: relative">
                  <img src="@/assets/content_box.png" class="content_box" alt="" />
                </div>
                <img
                src="@/assets/content_box_logo.png"
                width="80"
                height="21"
                alt=""
                style="position: absolute; left: -10px; top: 5px;transform: scale(0.4)"
              />
              <div class="flex flex-col" style="position: absolute; top: 0px; left:-90px;transform: scale(0.25)">
                <div class="fs-40" style="font-family: alibb-medium;">矩阵引流实战</div>
                <div class=" fs-16 mt-10" style="color: #637693;width: 305px">
                  在数字海洋中，矩阵引流，不止是数字游戏 更是策略的艺术
                </div>
              </div>
                <div class="content_dsy p-15">
                  <div class="box_img_title fs-14">{{ item.title }}</div>
                  <div class="box_img_content_item fs-12 mt-5" style="color: #637693">
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
                  class="flex flex-ai p-20 mt-20 tab_item_box"
                  style="background-color: #fff; border-radius: 10px; position: relative"
                >
                  <div class="tab_box_img" style="position: relative">
                    <img
                      :src="item.image"
                      alt="img"
                      width="100%"
                      height="100%"
                      style="object-fit: cover; border-radius: 6px"
                    />
                    <div class="userLevelName" v-if="item.isMembersAreRequired">
                      {{ item.userLevelName }}
                    </div>
                  </div>
                  <div class="flex flex-col ml-15">
                    <div
                      class="fs-18 cp"
                      style="font-weight: 500"
                      @click="toDetail(item)"
                    >
                      {{ item.title }}
                    </div>
                    <div class="pt-15 fs-13" style="color: #637693">
                      {{ item.describeContent }}
                    </div>
                    <div class="flex flex-ai mt-15">
                      <el-tag class="tag_nav mr-10 fs-13" size="small">{{
                        item.portalNavigationBarName
                      }}</el-tag>

                      <el-tag
                        v-for="(tag, index) in item.portalNavigationBarLabelIdName"
                        type="info"
                        :key="index"
                        class="tag_nav mr-10 fs-13"
                        size="small"
                        >#{{ tag }}</el-tag
                      >
                    </div>
                    <div class="flex flex-ai fs-13 mt-10" style="color: #637693">
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
                    <div class="flex flex-ai ml-15 cp" @click="changeGn(item, 0)">
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
              <div class="fs-12" style="color: #989ea6; margin-top: 60px">
                Hi,欢迎登录
              </div>
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
            <div class="office mt-20">
              <div class="title_office m-20">璇机官方联创</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-ai flex-col flex-jc about w-100">
    <div class="about_title">关于我们</div>
    <div
      class="about_content flex flex-ai flex-jc fs-12 text-center mt-20"
      style="width: 820px; line-height: 40px; color: #1f2329"
    >
      杭州璇机星炬科技有限公司专注于中小企业及素人IP打造领域，致力于为每一位怀揣梦想的客户开启成功之路。
      <br />我们凭借前沿的AI匹配技术，结合庞大的爆款内容库，仅需3个月，就能将素人成功孵化为垂直领域的KOC，让普通人在互联网浪潮中崭露头角。<br />
      公司独创的 “数据筛选 - 脚本生成 - 矩阵分发”
      标准化流程，是0基础用户快速起号的法宝。无论你是毫无经验的小白，还是寻求突破的中小企业，都能<br />借助这一流程，迅速在网络平台站稳脚跟。
      <br />我们还集成了10万+行业案例库，为客户提供从人设定位、内容创作到流量变现的全链路服务。仅需7天，就能帮助客户完成冷启动，与传统MCN相比，<br />效率提升200%，大大缩短了成长周期，让客户更快收获成功。<br />
      选择杭州璇机星炬科技有限公司，就是选择专业、高效的素人IP打造服务，携手共创辉煌未来！
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Banner from "@/components/banner";
import Carousel from "@/components/carousel";
import { getPopularRecommendations, getArticleList, getArticleThumbs } from "@/api/home";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/index";
import { ElMessage } from "element-plus";
import AvatorImg from "@/assets/login/icon.png";

const avator = ref(null);
const userStore = useUserStore();
const router = useRouter();
const cardList = ref([]);
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const tabList = [
  {
    name: "最新发布",
    id: 1,
  },
];
const tabIndex = ref(0);
const tabChange = (item, index) => {
  tabIndex.value = index;
};
const changeGn = async (item, type) => {
  const targetItem = tabListContent.value.find(
    (it) => it.numberOfLikes === item.numberOfLikes
  );
  if (targetItem) {
    targetItem.numberOfLikes++;
  }
  await getArticleThumbs({
    portalNavigationBarArticleId: item.id,
    type,
  });
};
const current = ref(0);
const dataListPage = ref([1, 2, 3, 4, 5]);
const changePage = (item, index) => {
  current.value = index;
  getArticleLists();
};
const next = () => {
  current.value = current.value + 1;
  getArticleLists();
  if (current.value >= dataListPage.value.length) {
    current.value = 0;
    getArticleLists();
  }
};
const toDetail = (item) => {
  router.push({ name: "detail", params: { id: item.id } });
};
const goNavContent = (item) => {
  router.push({ name: "navContent", params: { id: item.id } });
};
const userPage = () => {
  router.push({ name: "userDetail" });
};
const bigTitleContent = ref({});
// 获取文章页
const getHomePage = async () => {
  const res = await getPopularRecommendations();
  bigTitleContent.value = res.data[0];
  console.log(res);
  // 去掉第一条数据，配置到cardList中
  cardList.value = res.data.slice(1);
};
const getArticleLists = async () => {
  const res = await getArticleList({
    pageNum: current.value + 1,
    pageSize: 10,
  });
  tabListContent.value = res.data;
  totalPages.value = Math.ceil(res.count / 10);
  visiblePages();
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
const openMyModal = async (text) => {
  if (text === "注册") {
    userStore.showRegisterModal();
  } else {
    userStore.showLoginModal();
  }
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
const isShow = ref(true);
onMounted(() => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (user) {
    isShow.value = false;
    avator.value = user?.headSculpture;
  } else {
    isShow.value = true;
    avator.value = AvatorImg;
  }
  setInterval(() => {
    if (localStorage.getItem("token")) {
      isShow.value = false;
    }
  }, 100);
  getHomePage();
  getArticleLists();
});
const tabListContent = ref([]);
</script>
<style scoped>
.content {
  background-color: #f8f9fb;
  /* height: 100vh; */
}
/* 鼠标悬浮加上阴影，向上缓慢移动一点点 */
.card_item:hover {
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  transition: transform 0.8s;
  transform: translateY(-5px);
}
.tab_item_box:hover {
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  transition: transform 0.8s;
  transform: translateY(-5px);
}
.about_title {
  font-family: "alibb-medium";
  font-size: 28px;
  color: #1f2329;
}
.about {
  height: 400px;
  background: url(../../assets/about.png) no-repeat;
  background-size: 100% 100%;
}
.title {
  font-family: "alibb-bord", sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #1f2329;
  margin-top: 80px;
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
.user_btn {
  width: 101px;
  height: 30px;
  background: linear-gradient(126deg, #0c2b2f 0%, #39ece3 100%);
  border-radius: 20px;
  color: #fff;
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
  width: 190px;
  height: 130px;
  border-radius: 10px;
  overflow: hidden;
}
.avator {
  width: 32px;
  height: 32px;
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
