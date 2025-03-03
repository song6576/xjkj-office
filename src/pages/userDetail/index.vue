<template>
  <div class="user_detail bg-color flex flex-jc" id="user_detail">
    <div class="content_detail flex flex-col">
      <div class="user_detail_top flex flex-col" style="position: relative">
        <img src="@/assets/content_box.png" class="user_detail_top_img" alt="" />
        <img
          src="@/assets/content_box_logo.png"
          width="80"
          height="21"
          alt=""
          style="position: absolute; left: 25px; top: 25px"
        />
        <div class="flex flex-col" style="position: absolute; top: 120px; left: 50px">
          <div class="fs-48" style="font-family: alibb-medium">矩阵引流实战</div>
          <div class="fs-16 mt-10" style="color: #637693; width: 305px">
            在数字海洋中，矩阵引流，不止是数字游戏 更是策略的艺术
          </div>
        </div>
        <div class="user_detail_top_text">
          <div class="user_detail_content flex flex-ai">
            <div class="user_detail_header_box" @click="avatorChange">
              <img
                :src="userInfo?.headSculpture"
                class="user_detail_top_text_img cp"
                alt=""
              />
              <input
                type="file"
                ref="fileInput"
                style="display: none"
                @change="handleFileChange"
                accept="image/*"
              />
            </div>

            <div class="flex flex-ai mt-40">
              <div class="fs-26 ml-15">{{ userInfo?.nickname }}</div>
              <img :src="userInfo?.levelLogin" width="40" height="40" class="ml-5" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex mt-25">
        <div class="flex flex-col left">
          <div class="user_detail_content_fs flex p-10">
            <div
              class="flex flex-col flex-ai w-100 cp ml-10"
              v-for="(item, index) in list"
              :key="index"
              @click="goPage(item)"
            >
              <div>{{ item.count }}</div>
              <div class="fs-14 pt-5" style="opacity: 0.7">{{ item.name }}</div>
            </div>
          </div>
          <div
            class="user_menu_member fs-14 flex flex-ai mt-20 cp"
            @click="openMemberModal"
          >
            <img
              src="https://www.duya888.com/wp-content/uploads/2024/06/20240617015052106-vip1.webp"
              width="20"
              height="20"
              alt=""
            />
            <div class="ml-10">开通会员 尊享会员权益</div>
          </div>
          <div class="user_detail_content_fs mt-20 p-10">
            <div class="ml-5">我的服务</div>
            <div class="flex flex-ai mt-10">
              <div class="flex flex-col flex-ai flex-start cp" @click="myOrder(1)">
                <img src="@/assets/order-icon.png" width="35" height="35" alt="" />
                <div class="fs-12 mt-5" style="opacity: 0.7">我的订单</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-2 flex flex-start">
          <div class="card_vip2" v-if="currentTabIndex === 0">
            <div class="flex flex-ai">
              <img
                src="https://www.duya888.com/wp-content/uploads/2024/06/20240617015052106-vip1.webp"
                width="30"
                height="30"
                alt=""
              />
              <div>开通社群会员</div>
            </div>
            <ul class="card_text" style="position: relative">
              <li>所有原创引流获客软件免费用</li>
              <li>一年小红书ai云控矩阵克隆系统</li>
              <li>全行业自热实战sop</li>
              <li>自热打粉底层实操教学</li>
              <li>全平台ad投流实操打粉教程</li>
              <li>璇机跳转外链平台至尊会员1个月</li>
              <li>20000+群友的源头资源对接</li>
              <li>社群专属微信群</li>
              <li>飞书万人大群</li>
              不定期涨价 过时不候！提供的服务价值远远大于门槛价格
            </ul>
            <div class="flex flex-ai">
              <div class="btn_text fs-14 cp" @click="openMemberModal">开通社群会员</div>
            </div>
          </div>
          <div class="w-100" v-if="currentTabIndex === 1">
            <div class="flex flex-ai">
              <div class="bar_order"></div>
              <div>我的订单</div>
            </div>
            <div class="flex flex-ai flex-between order_all_box">
              <div>
                <div class="flex flex-ai">
                  <img src="@/assets/order-icon.png" width="23" height="23" />
                  <div class="ml-5 fs-14">全部订单</div>
                </div>
                <div class="mt-20 fs-24">{{ orderTotal }}<span class="fs-14 pl-5">笔</span></div>
              </div>
              <img src="@/assets/order-icon.png" width="60" height="60" />
            </div>
            <div class="flex flex-ai mt-20">
              <div class="bar_order"></div>
              <div>订单明细</div>
            </div>
            <div class="flex flex-col w-100 mt-14">
              <div v-if="orderList.length === 0">
                <img
                  src="https://www.duya888.com/wp-content/themes/zibll/img/null-order.svg"
                  width="280"
                  height="100%"
                  alt=""
                />
                <p style="margin-top: 40px" class="fs-12 separator">暂无支付订单</p>
              </div>
              <div v-else>
                <div class="flex flex-col">
                  <div
                    v-for="(item, index) in orderList"
                    :key="index"
                    class="order_box flex flex-between"
                    style="width: 100% !important"
                  >
                    <div class="flex flex-col">
                      <div>{{ item.productName }}</div>
                      <div class="py-14 fs-14" style="color: #637693">
                        订单编号：{{ item.orderNumber }}
                      </div>
                      <div class="fs-14" style="color: #637693">
                        {{ item.createTime }}
                      </div>
                    </div>
                    <div class="flex flex-col flex-between flex-ai">
                      <div class="">
                        $<span class="fs-24 pl-5">{{ item.getTheAmount }}</span>
                      </div>
                      <div class="flex flex-ai">
                        <div class="fs-14 mr-4" style="color: #637693">{{ item.content }}</div>
                        <el-tag :type="item.orderState === 1 ? 'success' : item.orderState === 2 ? 'danger' : 'warning'">
                          {{
                            item.orderState === 1
                              ? "支付成功"
                              : item.orderState === 2
                              ? "支付失败"
                              : "待支付"
                          }}
                        </el-tag>
                        <!-- <div class="ml-10 fs-14">
                          {{
                            item.orderState === 1
                              ? "支付成功"
                              : item.orderState === 2
                              ? "支付失败"
                              : "待支付"
                          }}
                        </div> -->
                        <div></div>
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
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";
import axios from "axios";
import { uploadAvatar } from "@/api/user";
import { getLoginDetail } from "@/api/login";
import { getOrderList } from "@/api/order";

const router = useRouter();
const userStore = useUserStore();
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const currentTabIndex = ref(0);
const orderList = ref([
  {
    appUserId: 161,
    orderNumber: "portal1091449265529827328",
    getTheAmount: 0.01,
    paymentMethod: 0,
    content: "微信支付",
    businessId: 2,
    businessType: 1,
    orderEndTime: "2025-02-23T12:14:51.000+00:00",
    orderState: 1,
    orderStateContent: "支付成功",
    productName: "超级会员充值",
    id: 16,
    createTime: "2025-02-23 18:14:51",
  },
]);
const orderTotal = ref(0);
const getOrderLists = async () => {
  const res = await getOrderList({
    appUserId: userInfo.id,
    pageSize: 10,
    pageNum: current.value + 1,
  });
  orderList.value = res.data;
  orderTotal.value = res.count;
  totalPages.value = Math.ceil(res.count / 10);
  visiblePages();
};
const openMemberModal = () => {
  userStore.showMemberModal();
};
const current = ref(0);
const dataListPage = ref([1, 2, 3, 4, 5]);
const changePage = (item, index) => {
  current.value = index;
  getOrderLists();
};
const next = () => {
  current.value = current.value + 1;
  getOrderLists();
  if (current.value >= dataListPage.value.length) {
    current.value = 0;
    getOrderLists();
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
onMounted(() => {
  getOrderLists();
  getLoginDetails();
});
const list = ref([]);
const myOrder = (index) => {
  currentTabIndex.value = index;
};
const avatorChange = () => {
  // router.push("/user/upload");
  // 唤起上传，上传头像
  fileInput.value.click();
};
// 用于引用文件输入框
const fileInput = ref(null);
// 存储选中的图片文件
const selectedImage = ref(null);
// 存储图片的 URL，用于预览
const selectedImageUrl = ref(null);
const handleFileChange = (e) => {
  const file = e.target.files[0];
  console.log(file);
  if (file) {
    selectedImage.value = file;
    // 将文件转换为 URL 用于预览
    const reader = new FileReader();
    reader.onload = (event) => {
      selectedImageUrl.value = event.target.result;
    };
    reader.readAsDataURL(file);
    // 选择图片后立即上传
    uploadImage();
  }
};
const getLoginDetails = async () => {
  const res = await getLoginDetail({
    userId: userInfo.id,
  });
  list.value = [
    {
      name: "评论",
      count: res.data.numberOfComments,
      path: "/comment",
    },
    {
      name: "点赞",
      count: res.data.numberOfLikes,
      path: "/like",
    },
  ];
  userStore.setUserInfo(res.data);
};
const uploadImage = async () => {
  const token = localStorage.getItem("token");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (selectedImage.value) {
    const formData = new FormData();
    formData.append("file", selectedImage.value);
    try {
      const response = await axios.post(
        "http://protalapi.xjkj66.com/user/updateImg",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Token: `${token}`,
          },
        }
      );
      console.log("上传成功", response.data.data);
      const res = response.data.data;
      await uploadAvatar({
        headSculpture: res.imgUrl,
      }).then(async (res) => {
        const userdata = await getLoginDetail({
          userId: userInfo.id,
        });
        userStore.setUserInfo(userdata.data);
        // 刷新页面
        window.location.reload();
      });
    } catch (error) {
      console.error("上传失败", error);
    }
  }
};
const goPage = (item) => {
  item.name === "评论" && router.push(item.path);
};
</script>
<style scoped>
@import url(./index.css);
</style>
