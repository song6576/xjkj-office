<template>
  <div class="user_detail bg-color flex flex-jc" id="user_detail">
    <div class="content_detail flex flex-col">
      <div class="user_detail_top flex flex-col" style="position: relative;">
        <img src="@/assets/content_box.png" class="user_detail_top_img" alt="" />
        <img
                src="@/assets/content_box_logo.png"
                width="80"
                height="21"
                alt=""
                style="position: absolute; left: 25px; top: 25px"
              />
              <div class="flex flex-col" style="position: absolute; top: 120px; left: 50px">
                <div class="fs-48" style="font-family: alibb-medium;">矩阵引流实战</div>
                <div class=" fs-16 mt-10" style="color: #637693;width: 305px">
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
          <div class="user_menu_member fs-14 flex flex-ai mt-20 cp">
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
              <div class="flex flex-col flex-ai flex-start cp">
                <img src="@/assets/order.png" width="35" height="35" alt="" />
                <div class="fs-12" style="opacity: 0.7">我的订单</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-2 flex flex-start">
          <div class="card_vip2">
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

const router = useRouter();
const userStore = useUserStore();
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const openMemberModal = () => {
  userStore.showMemberModal();
};
onMounted(() => {
  getLoginDetails();
});
const list = ref([]);
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
