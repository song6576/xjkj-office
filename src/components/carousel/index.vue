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
    <div class="flex flex-ai flex-jc mt-28 w-100">
      <div class="card flex flex-ai flex-jc">
        <div
          class="card_item flex flex-col ml-25 cp"
          v-for="(item, index) in cardlist"
          :key="index"
        >
        <div class="card-content">
          <div class="avator_box flex flex-ai flex-between w-100">
            <img :src="item.image" class="avator" alt="头像" style="object-fit: cover;" />
            <!-- <img :src="`@/assets/icon/${item.iconName === '抖音' ? 'douyin' : item.iconName}.png`" class="icon_name" alt="平台" /> -->
          </div>
          <div class="p-10">
            <div class="fs-18 name">{{ item.nickname }}</div>
            <div class="fs-14 dsy mt-5 carousel_content" :title="item.content">{{ item.content }}</div>
          </div>
          <div class="mt-30 fs-12 count">粉丝：{{ item.numberOfFans }}</div>
          <img src="@/assets/icon/douyin.png" class="icon_name" alt="平台" />
        </div>
        </div>
        <img src="@/assets/icon-left.png" class="left" alt="箭头" v-if="cardlist.length > 4" />
        <img src="@/assets/icon-right.png" class="right" alt="箭头" v-if="cardlist.length > 4" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { getRedPeople,getRedPeopleList } from "@/api/home";
import { ref, onMounted } from 'vue';

onMounted(() => {
  getTabList()
})

const getTabList = async () => {
  const res = await getRedPeople();
  tabList.value = res.data;
  const data = await getRedPeopleLists({
    sourceTypeId: res.data[0].id
  })
  console.log(data,res.data);
  cardlist.value = data;
}
const getRedPeopleLists = async (params) => {
  const res = await getRedPeopleList({
    pageNum: 1,
    pageSize: 4,
    ...params
  });
  return res.data;
}
const tabList = ref([]);
const tabIndex = ref(0);
const tabChange = async(item, index) => {
  console.log(item, index);
  const data = await getRedPeopleLists({
    sourceTypeId: item.id
  })
  cardlist.value = data;
  console.log(data);
  tabIndex.value = index;
};
const cardlist = ref([]);
</script>
<style scoped>
.title {
  font-family: "alibb-medium";
  font-size: 34px;
  color: #1f2329;
  line-height: 47px;
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
  height: 260px;
  background: linear-gradient(360deg, #e6f5fc 0%, #ffffff 100%);
  border-radius: 15px;
}
.card_item:hover {
  transition: box-shadow 0.8s;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
}
.avator_box {
  width: 100%;
  /* background-color: red; */
  height: 125px;
  border-radius: 10px 10px 20px 0;
}
.avator {
  width: 100%;
  height: 100%;
  /* border-radius: 50%; */
  border-radius: 10px 10px 0px 0;
  background-color: #e6f5fc;
}
.icon_name {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 18px;
  height: 18px;
}
.count {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: #949494;
}
.card-content {
  overflow: hidden;
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
  -webkit-line-clamp: 3;
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
</style>
