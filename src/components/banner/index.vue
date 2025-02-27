<template>
  <div class="banner flex flex-jc">
    <div class="banner-content">
      <div class="flex flex-col flex-jc flex-ai">
        <img src="@/assets/big-logo.png" class="logo" alt="logo" />
        <div class="dsy flex flex-ai flex-jc mt-16">
          <div>素人获客飞升社，前沿术法藏经阁</div>
        </div>
        <div class="mt-50 input_box">
          <img src="@/assets/search.png" class="search" alt="搜索" />
          <input class="input pl-50" placeholder="开启精彩搜索" v-model="searchValue" />
          <div class="search-btn cp flex flex-ai flex-jc" @click="toSearch">搜索</div>
        </div>
        <div class="mt-50 flex flex-jc">
          <div
            class="flex flex-ai flex-jc tag-btn cp py-5 px-10 fs-15 ml-23"
            v-for="(item, index) in tags"
            :key="index"
            :style="{ background: item.titleColour }"
            @click="toTag(item)"
          >
            <div>{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getHomeSearch } from "@/api/home";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/index";

onMounted(() => {
  getSearchTag();
});
const router = useRouter();
const searchValue = ref("");
const store = useUserStore();
const toSearch = () => {
  console.log('121212',searchValue.value);
  store.setKeyWord(searchValue.value);
  router.push({ name: "searchContent", params: { keyword: searchValue.value } });
};
// 监听键盘回车
document.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    toSearch();
  }
});
const getSearchTag = async () => {
  const res = await getHomeSearch();
  tags.value = res.data;
  console.log(res.data);
};
const toTag = (item) => {
  console.log(item);
  router.push({ name: "navContent", params: { id: item.id } });
}
const tags = ref([
  {
    name: "引流软件",
    color: "#D1DFFF",
  },
  {
    name: "引流教程",
    color: "#DEDBFB",
  },
  {
    name: "引流技巧",
    color: "#D9EAFE",
  },
  {
    name: "引流案例",
    color: "#ACE6E5",
  },
  {
    name: "引流工具",
    color: "#C5DEFF",
  },
  {
    name: "引流平台",
    color: "#D9EAFE",
  },
  {
    name: "引流方法",
    color: "#C5DEFF",
  },
  {
    name: "引流技巧",
    color: "#D9EAFE",
  },
]);
</script>
<style scoped>
.banner {
  width: 100%;
  height: 540px;
  background: url("@/assets/bg.png") no-repeat;
  background-size: 100% 100%;
}
.banner-content {
  margin-top: 10rem;
}
.tag-btn {
  border-radius: 8px;
}
.logo {
  width: 16.25rem;
  height: 4.25rem;
}
input {
  border: none;
  outline: none;
  border-bottom: 1px solid #ccc;
}
.dsy {
  width: 17.5rem;
  height: 2.25rem;
  border-radius: 8px;
  color: #fff;
  background-image: linear-gradient(
    to right,
    rgba(49, 125, 255, 0.7),
    rgba(60, 187, 255, 0.7)
  );
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
