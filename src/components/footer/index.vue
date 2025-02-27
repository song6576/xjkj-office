<template>
  <div class="footer flex flex-col flex-ai flex-jc p-30">
    <div style="width: 1050px" class="mt-20">
      <div class="flex flex-between">
        <!-- <div class="flex flex-ai">
          <div v-for="(item,index) in data" :key="item.title" class="flex flex-col" :class="{'ml-47': index !== 0}">
            <div class="fs-14">{{ item.title }}</div>
            <div
              v-for="child in item.children"
              :key="child.title"
              class="fs-12 mt-10 cp"
              style="color: #9a9a9a"
            >
              {{ child.title }}
            </div>
          </div>
        </div> -->
        <div class="flex flex-col flex-ai">
          <img src="@/assets/qr.png" class="qr" alt="logo" />
          <div class="fs-12 pt-7">璇机公众号</div>
        </div>
      </div>
      <div class="line mt-30 mb-30"></div>
      <div class="flex flex-col">
        <img src="@/assets/logo-s.png" width="100" height="26" alt="logo" />
        <div class="fs-12 mt-20" style="color: #9a9a9a">
          杭州璇机科技传媒有限公司经营范围包括一般项目：技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广；互联网销售（除销售需要许可的商品）；化妆品批发；化妆品零售；美发饰品销售；电子产品销售；玩具销售；鲜肉批发；水产品批发；办公设备耗材销售；办公设备租赁服务；打字复印；信息咨询服务（不含许可类信息咨询服务）；摄像及视频制作服务等
        </div>
      </div>
      <div class="flex flex-ai fs-12 mt-50" style="color: #9a9a9a">
        <div>Copyright @ 2024 网站备案号--浙ICP备202502871号-1</div>
        <div class="ml-44">
          <span class="cp">用户协议及隐私协议</span> <span class="cp">免责声明</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const data = [
  {
    title: "关于我们",
    children: [
      { title: "公司介绍" },
      { title: "联系我们" },
      { title: "加入我们" },
      { title: "法律声明" },
    ],
  },
  {
    title: "产品服务",
    children: [
      { title: "产品介绍" },
      { title: "产品优势" },
      { title: "产品案例" },
      { title: "产品价格" },
    ],
  },
  {
    title: "联系我们",
    children: [
      { title: "联系方式" },
      { title: "商务合作" },
      { title: "加入我们" },
      { title: "法律声明" },
    ],
  },
];
</script>
<style scoped>
.footer {
  color: #fff;
  background-color: #000;
}
.qr {
  width: 100px;
  height: 100px;
  border-radius: 8px;
}
.line {
  width: 100%;
  border: 1px solid #ffffff;
  background-color: #ffffff;
  opacity: 0.2;
}
</style>
