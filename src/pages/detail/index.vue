<template>
  <div class="detail mt-50" id="detail">
    <div class="content p-30 fs-14">
      <div class="flex flex-jc content_box mt-40">
        <div class="left_modal flex flex-col p-25" style="position: relative">
          <div class="flex flex-ai nav_flex">
            <div class="cp" @click="goHome">首页 /</div>
            <div class="cp" @click="goDetail">{{ data?.portalNavigationBarName }} /</div>
            <div>正文</div>
          </div>
          <div class="title mt-10">{{ data?.title }}</div>
          <div class="userLevelName" v-if="data?.isMembersAreRequired">
            {{ data?.userLevelName }}
          </div>
          <div class="flex flex-between mt-20">
            <div class="flex flex-ai">
              <img
                :src="data?.profilePicture"
                style="object-fit: contain"
                class="profilePicture"
                alt="头像"
              />
              <div class="flex flex-col ml-10">
                <div class="fs-14" style="color: #4e5358">{{ data?.nickname }}</div>
                <div class="fs-12 mt-4" style="color: #989ea6">
                  {{ data?.createTime }}
                </div>
              </div>
            </div>
            <!-- <div></div> -->
          </div>
          <div class="line mt-20"></div>
          <div class="content_html flex flex-col flex-ai mt-20">
            <div
              class="content-wrapper flex flex-col flex-ai flex-jc"
              @click="handleClick"
              v-html="data?.content"
              v-if="data?.isTrue"
            ></div>
            <div v-else class="flex zf_box mt-20">
              <div class="member_s">会员专享</div>
              <div class="left_img"></div>
              <div class="flex flex-col ml-15">
                <div class="fs-16">{{ data?.title }}</div>
                <div class="fs-12 mt-20" style="color: #989ea6">
                  此内容为会员专享阅读，请充值后查看
                </div>
                <div class="flex flex-ai mt-20" style="color: red">
                  <div class="fs-12">会员价</div>
                  <div class="fs-32 money pl-3">{{ data?.money }}</div>
                </div>
                <div class="member_btn cp" @click="openMemberModal">立即购买</div>
              </div>
              <!-- <div class="user_menu_member fs-14 flex flex-ai flex-jc mt-20 cp" >
                <img src="https://www.duya888.com/wp-content/uploads/2024/06/20240617015052106-vip1.webp" width="30" height="30" alt="" />
                <div class="ml-10" @click="openMemberModal">开通会员 尊享会员权益</div>
              </div> -->
            </div>
            <div class="mt-40" style="color: #b1b1b1">
              <div class="fs-12"><span>©</span>版权声明</div>
            </div>
            <fieldset
              style="
                border: 1px dashed #008cff;
                padding: 10px;
                border-radius: 5px;
                line-height: 2em;
                color: #6d6d6d;
              "
            >
              <legend
                align="center"
                style="
                  width: 30%;
                  text-align: center;
                  border-radius: 5px;
                  background-image: linear-gradient(
                    to right,
                    rgba(49, 125, 255, 0.7),
                    rgba(60, 187, 255, 0.7)
                  );
                  text-align: center;
                  color: #fff;
                "
              >
                文章声明
              </legend>
              <div class="fs-14">
                1、本网站名称：<span style="color: #3333ff"
                  ><span style="color: #ff6666; font-size: 16px"
                    ><strong>璇机科技社</strong></span
                  ></span
                ><br />
                2、本站永久网址：<font color="#FF6666">http://www.xjkj66.com/</font><br />
                3、本网站的文章部分内容可能来源于网络，仅供大家学习与参考，如有侵权必删，请联系大拿【梁哥/郑哥】进行删除处理。<br />
                4、本站一切资源不代表本站立场，并不代表本站赞同其观点和对其真实性负责。<br />
                5、本站一律禁止以任何方式发布或转载任何违法的相关信息，访客发现请向站长举报<br />
                6、本站资源大多存储在云盘，如发现链接失效，请联系我们，我们会第一时间更新。<br />
                7、使用本站服务即表示同意<a href="#">【免责声明】</a>
                <a href="#">【用户服务及隐私协议】</a>
              </div>
            </fieldset>
          </div>
          <div class="flex flex-ai flex-jc mt-50 fs-12 separator">THE END</div>
          <div class="fs-12 flex flex-ai flex-jc mt-30 w-100" style="color: #9a9a9a">
            <div>喜欢就支持一下吧</div>
          </div>
          <div class="flex flex-ai flex-jc fs-12 mt-20" style="color: #9a9a9a">
            <div class="flex flex-ai flex-col cp dz" @click="changeStatus(0)">
              <img src="@/assets/dz2.png" alt="img" width="32" height="32" />
              <div class="mt-3">{{ data?.numberOfLikes }}</div>
            </div>
            <!-- <div class="flex flex-ai flex-col ml-20 cp sc" @click="changeStatus(1)">
              <img src="@/assets/sc.png" alt="img" width="32" height="32" />
              <div class="mt-3">{{ data?.previewQuantity }}</div>
            </div> -->
          </div>
          <div>
            <u-comment :config="config" @submit="submit" @reply-page="replyPage">
              <template #header>
                <div class="fs-22">评论</div>
              </template>
              <template #info="{ id, user }">
                <div class="flex flex-ai">
                  <div
                    class="appUserUserLevelName fs-8"
                    :style="{
                      backgroundColor:
                        user.appUserUserLevelColor === '普通会员'
                          ? '#9a9a9a'
                          : 'linear-gradient(126deg, #fd7808 0%, #f8b41a 100%)',
                    }"
                  >
                    {{ user.appUserUserLevelName }}
                  </div>
                </div>
              </template>
              <template #avatar="{ id, user }">
                <div style="position: relative">
                  <img
                    :src="user.avatar"
                    alt="avatar"
                    width="40"
                    height="40"
                    style="border-radius: 50%"
                  />
                  <img
                    class="appUserUserLevelLogin"
                    :src="user.appUserUserLevelLogin"
                    alt="等级"
                  />
                </div>
              </template>
              <template #action="{ id, user }">
                <div
                  class="viewReply cp fs-11 mt-2"
                  @click="viewReply(user)"
                  v-if="user.isShow && user.level === 1"
                >
                  查看更多评论
                </div>
              </template>
            </u-comment>
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
import { ref, onMounted, onBeforeUnmount, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getArticleContent, getArticleThumbs } from "@/api/nav-content";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/index";
import AvatorImg from "@/assets/login/icon.png";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
import {
  UToast,
  Time,
  CommentApi,
  CommentSubmitApi,
  ConfigApi,
  cloneDeep,
  usePage,
  CommentReplyPageApi,
} from "undraw-ui";
import { getArticleCommentList, getArticleUserComment } from "@/api/comment";

const config = reactive({
  user: {}, // 当前用户信息
  comments: [], // 评论数据
  relativeTime: true, // 开启人性化时间
  show: {
    level: false, // 关闭等级显示
    homeLink: false, // 关闭个人主页链接跳转
    address: false, // 关闭地址信息
    likes: false, // 关闭点赞按钮显示
  },
  page: true, // 开启分页
});
const comments = ref([]);
const getArticleCommentLists = async (params) => {
  const { data } = await getArticleCommentList({
    portalNavigationBarArticleId: route.params.id,
    ...params,
  });
  comments.value = data.map((item) => {
    return {
      id: item.id,
      parentId: item.parentId,
      uid: item.businessId,
      content: item.content,
      createTime: item.createTime,
      user: {
        username: item.appUserNickname,
        avatar: item.appUserHeadSculpture,
        appUserUserLevelLogin: item.appUserUserLevelLogin,
        appUserUserLevelName: item.appUserUserLevelName,
        isShow: item.isShow,
        id: item.id,
        level: item.level,
      },
    };
  });
  config.comments = comments.value;
};
// pageNum: 1,
//     pageSize: 10,
const viewReplyId = ref(null);
const viewReply = async (item) => {
  viewReplyId.value = item.id;
  const { data } = await getArticleCommentList({
    portalNavigationBarArticleId: route.params.id,
    portalCommentId: item.id,
  });
  console.log(data);
  // 对比comments里面的id和data里面的parentId，如果相同，则添加reply字段
  comments.value.forEach((comment) => {
    if (comment.id === item.id) {
      comment.reply = {
        total: data.length,
        list: data.map((item) => {
          return {
            id: item.id,
            parentId: item.parentId,
            uid: item.businessId,
            content: item.content,
            createTime: item.createTime,
            user: {
              username: item.appUserNickname,
              avatar: item.appUserHeadSculpture,
              appUserUserLevelLogin: item.appUserUserLevelLogin,
              appUserUserLevelName: item.appUserUserLevelName,
              isShow: item.isShow,
              id: item.id,
              level: item.level,
            },
          };
        }),
      };
    }
  });
};
// 模拟请求接口获取评论数据
setTimeout(() => {
  // 当前登录用户数据
  config.user = {
    id: userInfo.id,
    username: userInfo.username,
    avatar: userInfo.headSculpture,
  };
  config.comments = comments.value;
}, 500);
// 评论提交事件
let temp_id = 100;
// 提交评论事件
const submit = async ({ content, parentId, reply, mentionList, finish }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    openMyModal();
    return;
  }
  const res = await getArticleUserComment({
    portalNavigationBarArticleId: route.params.id,
    appUserId: config.user.id,
    content,
    type: parentId ? 2 : 1,
    portalCommentId: reply?.id ? reply?.id : null,
  });
  console.log(res.data);
  const newReply = {
    id: res.data.id,
    parentId: parentId,
    uid: res.data.businessId,
    content: res.data.content,
    createTime: new Date().toString(),
    user: {
      username: res.data.appUserNickname,
      avatar: res.data.appUserHeadSculpture,
      appUserUserLevelLogin: res.data.appUserUserLevelLogin,
      appUserUserLevelName: res.data.appUserUserLevelName,
      isShow: res.data.isShow,
      id: res.data.id,
      level: res.data.level,
    },
    reply: null,
  };
  setTimeout(() => {
    // getArticleCommentLists();
    finish(newReply);
    UToast({ message: "评论成功!", type: "info" });
  }, 200);
};
//回复分页
const replyPage = async ({ parentId, current, size, finish, reply }) => {
  console.log(reply);
  const replyItem = comments.value.find((item) => item.id === Number(parentId));
  console.log(replyItem);
  const res = await getArticleCommentList({
    portalNavigationBarArticleId: route.params.id,
    portalCommentId: replyItem.id,
    pageNum: current,
    pageSize: size,
  });
  console.log(res);
  // 根据 parentId查询后端分页回复列表返回并覆盖回复
  if (replyItem) {
    let tmp = {
      total: replyItem.reply.total,
      // 分页提取回复
      list: res.data.map((item) => {
        return {
          id: item.id,
          parentId: item.parentId,
          uid: item.businessId,
          content: item.content,
          createTime: item.createTime,
          user: {
            username: item.appUserNickname,
            avatar: item.appUserHeadSculpture,
            appUserUserLevelLogin: item.appUserUserLevelLogin,
            appUserUserLevelName: item.appUserUserLevelName,
            isShow: item.isShow,
            id: item.id,
            level: item.level,
          },
        };
      }),
    };
    setTimeout(() => {
      finish(tmp);
    }, 200);
  }
};
const userStore = useUserStore();
const route = useRoute();
const data = ref({});
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const avator = ref(null);
const getData = async () => {
  const res = await getArticleContent({ portalNavigationBarArticleId: route.params.id });
  data.value = res.data;
  if (!res.data.isTrue) {
    openMemberModal();
  }
};
const openMemberModal = () => {
  userStore.showMemberModal();
};
const handleClick = (e) => {
  if (e.target.tagName === "IMG") {
    const viewer = new Viewer(e.target, {});
  }
};
const router = useRouter();
const goDetail = () => {
  router.push({ name: "navContent", params: { id: data.value.portalNavigationBarId } });
};
const goHome = () => {
  router.push({ name: "home" });
};
const changeStatus = async (type) => {
  if (data.value) {
    data.value.numberOfLikes++;
  }
  await getArticleThumbs({
    portalNavigationBarArticleId: route.params.id,
    type,
  });
  console.log("changeStatus", data);
};
const loginOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  ElMessage({
    message: "退出登录成功",
    type: "success",
  });
  avator.value = AvatorImg;
  // 刷新页面
  window.location.reload();
  isShow.value = true;
};
const openMyModal = async (text) => {
  if (text === "注册") {
    userStore.showRegisterModal();
  } else {
    userStore.showLoginModal();
  }
};
const userPage = () => {
  router.push({ name: "userDetail" });
};
const isShow = ref(true);
const timer = ref(null);
onMounted(() => {
  getData();
  getArticleCommentLists();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (user) {
    avator.value = user?.headSculpture;
  } else {
    avator.value = AvatorImg;
  }
  timer.value = setInterval(() => {
    if (localStorage.getItem("token")) {
      isShow.value = false;
    }
  }, 1000);
});
// 卸载时清除定时器
onBeforeUnmount(() => {
  clearInterval(timer.value);
});
</script>
<style scoped>
.user_menu_member {
  padding: 3px;
}
.content {
  position: relative;
  background-color: #f8f9fb;
}
.content_html {
  overflow: hidden;
}
.content-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.nav_flex {
  position: absolute;
  top: -34px;
  left: 0px;
  color: #999;
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

/* 去掉a标签的默认样式 */
a {
  text-decoration: none;
  color: #333;
}

/* 去掉a标签的默认下划线 */
a:hover {
  text-decoration: none;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.zoomed-image {
  max-width: 90%;
  max-height: 90%;
}

/* 去掉a标签的默认下划线 */
a:visited {
  text-decoration: none;
}

/* 去掉a标签的默认下划线 */
a:active {
  text-decoration: none;
}

/* 去掉a标签的默认下划线 */
a:link {
  text-decoration: none;
}

.separator {
  color: #6d6d6d;
}
.separator::after,
.separator::before {
  content: "";
  background: rgba(50, 50, 50, 0.06);
  max-width: 20%;
  height: 1px;
  margin: 0 1em;
  flex: 1;
}
.left_modal {
  width: 880px;
  border-radius: 10px;
  background-color: #fff;
}
.line {
  height: 1px;
  background-color: rgba(50, 50, 50, 0.06);
  width: 100%;
}

.profilePicture {
  width: 40px;
  height: 40px;
  border-radius: 50%;
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
.dz {
  opacity: 0.7;
}
.dz:hover {
  opacity: 1;
}
.sc {
  opacity: 0.8;
}
.sc:hover {
  opacity: 1;
}
.zf_box {
  position: relative;
  width: 500px;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 18px 0px rgba(0, 0, 0, 0.1);
}
.member_s {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 14px;
  background-color: red;
  border-radius: 8px 5px 20px 0;
  padding: 2px 12px;
  color: #fff;
}
.left_img {
  width: 300px;
  height: 200px;
  border-radius: 15px;
  background: url(../../assets/content_box.png) no-repeat;
  background-size: cover;
}
.member_btn {
  width: 200px;
  padding: 5px 0;
  background: linear-gradient(135deg, #fd7a64 10%, #fb2d2d 100%);
  border-radius: 18px;
  color: #fff;
  font-size: 16px;
  text-align: center;
  margin: 0 auto;
  margin-top: 30px;
}
.money {
  margin-top: -12px;
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
.appUserUserLevelName {
  padding: 1px 4px;
  border-radius: 12px;
  color: #ffffff;
  background: linear-gradient(126deg, #fd7808 0%, #f8b41a 100%);
}
.appUserUserLevelLogin {
  position: absolute;
  top: -5px;
  left: -5px;
  width: 20px;
  height: 20px;
}
.viewReply {
  color: #3873ff;
}
</style>
