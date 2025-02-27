<template>
  <div class="box flex flex-col flex-jb" ref="scrollContainer" id="header">
    <div class="flex flex-ai w-100 header flex-jb">
      <div class="nav flex flex-ai flex-jc flex-2 fs-15" style="font-weight: 400">
        <img
          src="@/assets/logo.png"
          class="logo cp"
          alt="logo"
          @click="handleNavClick('menu', 'home',0)"
        />
        <div class="pc-nav flex flex-ai">
          <div
            class="nav-item ml-30"
            v-for="(item, index) in navList"
            :key="index"
            @mouseenter="handleMouseEnter(index)"
            @mouseleave="handleMouseLeave(index)"
          >
            <div
              class="flex flex-ai nav_text"
              style="width: max-content"
              :class="{ cp: item.children?.length <= 0 }"
              @click="item.children?.length <= 0 && handleNavClick('menu', item, index)"
            >
              <div :class="{ navActive: navActiveIndex === index }">{{ item.title }}</div>
              <span v-if="item.children?.length > 0" class="dropdown-icon ml-5">
                <img src="@/assets/jt_down.png" width="12" height="12" alt="dropdown" />
              </span>
            </div>
            <div
              class="dropdown-menu"
              v-if="item.children?.length > 0 && showDropdown[index]"
            >
              <div
                class="dropdown-item"
                v-for="(child, childIndex) in item.children"
                :key="childIndex"
                @click="handleNavClick('child', child, childIndex)"
              >
                {{ child.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-ai flex-1 fs-12">
        <div class="flex flex-ai" v-if="isShow">
          <div
            class="header_btn flex flex-ai flex-jc cp"
            style="color: #a1aabc; border: 1px solid #a1aabc"
            @click="openMyModal('注册')"
          >
            注册
          </div>
          <div
            class="header_btn flex flex-ai flex-jc cp ml-12"
            style="color: #467bf8; border: 1px solid #467bf8"
            @click="openMyModal('登录')"
          >
            登录
          </div>
        </div>
        <div class="flex flex-ai p-20 cp" v-else>
          <div
            @mouseenter="handleUserMouseEnter"
            @mouseleave="handleUserMouseLeave"
            style="position: relative"
          >
            <img src="@/assets/user.png" width="18" height="18" alt="头像" />
            <div v-if="userShow" class="user_menu flex flex-col p-20">
              <div class="flex flex-ai user_menu_title">
                <img :src="userInfo?.headSculpture" class="user_menu_head" alt="头像" style="object-fit: cover;" />
                <div class="fs-16 ml-5">{{ userInfo?.nickname }}</div>
                <img
                  :src="userInfo?.levelLogin"
                  width="20"
                  height="20"
                  class="ml-5"
                  alt=""
                />
              </div>
              <div class="user_menu_member fs-14 flex flex-ai mt-20 cp" @click="openMemberModal">
                <img src="https://www.duya888.com/wp-content/uploads/2024/06/20240617015052106-vip1.webp" width="30" height="30" alt="" />
                <div class="ml-10">开通会员 尊享会员权益</div>
              </div>
              <div class="line mt-20"></div>
              <div class="flex flex-ai flex-between mt-10 px-20">
                <div class="flex flex-col flex-ai fs-12 p-10 cp" @click="userPage">
                  <img
                    src="@/assets/user_active.png"
                    class="user_count p-10"
                    width="20"
                    height="20"
                    alt=""
                  />
                  <div class="pt-5 fs-12" style="color: #467bf8">用户中心</div>
                </div>
                <div class="flex flex-col flex-ai fs-12 cp ml-10" @click="loginOutPersonal">
                  <img
                    src="@/assets/login_out.png"
                    class="user_login_out p-10"
                    width="20"
                    height="20"
                    alt=""
                  />
                  <div class="pt-5 fs-12" style="color: red">退出登录</div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="header_btn flex flex-ai flex-jc cp ml-20"
            style="color: #467bf8; border: 1px solid #467bf8"
            @click="loginOut"
          >
            退出登录
          </div>
        </div>
        <div
          class="header_btn flex flex-ai flex-jc cp ml-5"
          style="color: #894509; border: 1px solid #894509; background: #ffce87"
          @click="openMemberModal"
        >
          开通会员
        </div>
      </div>
    </div>
  </div>
  <LoginModal />
  <RegisterModal />
  <MemberModal width="680" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/store";
import { ElMessage } from "element-plus";
import { getHomeNav } from "@/api/home";
import { useRouter } from "vue-router";
import MemberModal from "@/complex/member/index.vue";
import LoginModal from "@/complex/login/index.vue";
import RegisterModal from "@/complex/register/index.vue";

const userStore = useUserStore();
const userInfo = ref({});
onMounted(() => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  userInfo.value = user;
  if (user) {
    isShow.value = false;
  } else {
    isShow.value = true;
  }
  if (localStorage.getItem("token")) {
    isShow.value = false;
  }
  getHomeNavList();
});
const userPage = () => {
  router.push({ name: "userDetail" });
};
const getHomeNavList = async () => {
  const res = await getHomeNav();
  navList.value = res.data;
  showDropdown.value = navList.value.map(() => false);
};
const showDropdown = ref([]);
const navActiveIndex = ref(null);
// 处理鼠标进入导航项事件
const handleMouseEnter = (index) => {
  showDropdown.value[index] = true;
};

// 用户中心鼠标悬浮
const userShow = ref(false);
const handleUserMouseEnter = () => {
  userShow.value = true;
};
const handleUserMouseLeave = () => {
  userShow.value = false;
};
// 路由跳转
const router = useRouter();
const handleNavClick = (text, item, index) => {
  if (item === "home") {
    navActiveIndex.value = null;
    router.push({ path: "/home" });
  } else {
    navActiveIndex.value = index;
    router.push({ name: "navContent", params: { id: item.id } });
  }
};

// 处理鼠标离开导航项事件
const handleMouseLeave = (index) => {
  showDropdown.value[index] = false;
};
const navList = ref([]);
const openMyModal = async (text) => {
  if (text === "注册") {
    userStore.showRegisterModal();
  } else {
    userStore.showLoginModal();
  }
};
const openMemberModal = () => {
  userStore.showMemberModal();
};
const loginOut = () => {
  localStorage.removeItem("token");
  userStore.clearUserInfo();
  localStorage.removeItem("userInfo");
  ElMessage({
    message: "退出登录成功",
    type: "success",
  });
  // 刷新页面
  window.location.reload();
  isShow.value = true;
};
const loginOutPersonal = () => {
  router.push({ path: "/" });
  localStorage.removeItem("token");
  userStore.clearUserInfo();
  localStorage.removeItem("userInfo");
  ElMessage({
    message: "退出登录成功",
    type: "success",
  });
  // // 刷新页面
  // window.location.reload();
  // // 回到首页
  // router.push({ path: "/" });
  isShow.value = true;
}
const isShow = ref(true);
</script>

<style scoped>
@import "./index.css";
</style>
