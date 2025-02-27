<template>
  <div v-if="visible" class="overlay" @click.self="handleOverlayClick">
    <div class="w-full h-full" @click.self="handleOverlayClick">
      <div
        class="my-modal rounded-md relative px-50 py-10"
        :style="`width: ${width}px`"
        @click.stop
      >
        <div class="content flex flex-col flex-ai w-100">
          <div class="title fs-24 flex flex-ai">
            <img
              src="https://www.duya888.com/wp-content/uploads/2024/06/20240617015052106-vip1.webp"
              width="70"
              height="70"
              alt="会员"
            /><span class="ml-12 mt-5">璇机科技-永久会员</span>
          </div>
          <div class="vip_text">开通VIP会员，享受会员专属折扣以及多项特权</div>
          <div class="flex flex-ai flex-jc mt-20 vip-card w-100">
            <img
              src="https://www.duya888.com/wp-content/uploads/2024/06/20240617015052106-vip1.webp"
              width="50"
              height="50"
              alt="会员"
            />
            <div class="vip-baicon"></div>
            <div class="ml-12 mt-5 fs-20">社群永久会员</div>
          </div>
          <div class="flex mt-20 w-100">
            <div class="flex-1">
              <div class="line flex flex-ai w-100 fs-17">
                <div>开通会员尊享以下福利</div>
              </div>
              <div class="dsy flex flex-ai flex-jc w-100 text-center mt-20">
                所有原创引流获客软件免费用
                <br />一年小红书ai云控矩阵克隆系统<br />全行业自热实战sop<br />
                自热打粉底层实操教学 <br />全平台ad投流实操打粉教程
                <br />璇机跳转外链平台至尊会员1个月 20000+群友的源头资源对接
                <br />社群专属微信群 <br />飞书万人大群 <br />
                388元((原价688元)一次付费<br />
                3年制服务<br />
                不定期涨价<br />
                过时不候！提供的服务价值远远大于门槛价格
              </div>
            </div>
            <div class="flex flex-col ml-20 flex-1">
              <div class="flex flex-ai flex-wrap">
                <div
                  class="flex flex-col member_price_box flex-ai flex-jc ml-10 cp"
                  v-for="(item, index) in levelList"
                  :key="index"
                  :class="{ active: memberIndex === index }"
                  @click="handleMemberClick(item, index)"
                >
                  <div class="level fs-18">{{ item.levelName }}</div>
                  <div class="flex flex-ai mt-25" style="color: red">
                    <div class="fs-14 mt-5">会员价</div>
                    <div class="fs-20 pl-3">{{ item.money }}</div>
                  </div>
                  <div class="flex flex-ai fs-12 member_price_box_zk mt-2">
                    <div>会员价</div>
                    <div>{{ item.originalPrice }}</div>
                  </div>
                  <div class="fs-14 mt-2" style="color: #2997f7">永久</div>
                </div>
              </div>
              <div class="fs-12 muted-box" style="line-height: 22px; letter-spacing: 1px">
                <div>购买后不支持退款</div>
                <div>VIP权益仅适用于本站</div>
                <div>欢迎与站长联系</div>
                <div>购买后不支持退款</div>
              </div>
              <div class="mt-20">
                <div class="fs-14">支付方式</div>
                <div class="flex flex-col pay-box mt-10 flex-ai flex-jc">
                  <img src="@/assets/wx.png" width="30" height="30" alt="微信" />
                  <div class="fs-12 pt-5">微信</div>
                </div>
              </div>
              <div class="btn mt-20 cp" @click="handlePay" v-if="!btnShow">立即支付</div>
              <div class="btn mt-20 cp" style="background: #999 !important" v-else>
                已缴纳过
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="qrcode-box" v-if="showQrcode" @click="hideQrcode">
    <div class="qrcode-container flex flex-col flex-ai">
      <div class="fs-17">微信扫码支付</div>
      <canvas ref="qrcodeCanvas"></canvas>
    </div>
  </div>
  <div class="payStatus" v-if="showPayStatus" @click="hidePayStatus">
    <div class="payStatus-container">
      <div class="flex flex-col flex-ai">
        <img
          src="https://www.duya888.com/wp-content/uploads/2024/06/20240617015052106-vip1.webp"
          width="100"
          height="100"
          alt="会员"
        />
        <div class="fs-20">璇机科技</div>
      </div>
      <div class="flex flex-ai flex-jc mt-20">
        <div class="payText flex flex-ai flex-jc">{{ payText }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref, nextTick } from "vue";
import { useUserStore } from "@/store";
import { getMemberLevel, createOrder, getOrderDetail } from "@/api/member";
import { ElMessage } from "element-plus";
import QRCode from "qrcode";
import { getLoginDetail } from "@/api/login";

const qrcodeCanvas = ref(null);

// 定义 props
const props = defineProps({
  width: {
    type: Number,
    default: 870,
  },
});

onMounted(() => {
  getMemberLevels();
});
const showQrcode = ref(false);
const showPayStatus = ref(false);
const payText = ref("");
const levelId = ref(0);
const levelList = ref([]);
const memberIndex = ref(0);
const payQr = ref(true);
const getMemberLevels = async () => {
  const { data } = await getMemberLevel();
  levelList.value = data;
  levelId.value = data[0].id;
  btnShow.value = data[0].isShow;
};
const hideQrcode = () => {
  showQrcode.value = false;
};
const btnShow = ref(false);
const handleMemberClick = (item, index) => {
  memberIndex.value = index;
  levelId.value = item.id;
  btnShow.value = levelList.value[index].isShow;
};

const hidePayStatus = () => {
  showPayStatus.value = false;
  handleOverlayClick();
  showQrcode.value = false;
  clearInterval(timer);
};

const getOrderDetails = async (portalOrderId) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const res = await getOrderDetail({
    portalOrderId,
  });
  if (res.data.orderState === 1) {
    clearInterval(timer.value);
    showPayStatus.value = true;
    payText.value = "支付成功";
    const userData = await getLoginDetail({
      userId: userInfo.id,
    })
    // 把userData.data对象转成字符串的形式
    const userDataString = JSON.stringify(userData.data);
    // 将字符串存储到localStorage中
    localStorage.setItem("userInfo", userDataString);
    showQrcode.value = false;
    setTimeout(() => {
      handleOverlayClick();
      window.location.reload();
    },4000)
  } else if (res.data.orderState === 2) {
    clearInterval(timer.value);
    showPayStatus.value = true;
    payText.value = "支付失败";
    const userData = await getLoginDetail({
      userId: userInfo.id,
    })
    localStorage.setItem("userInfo", userData);
    showQrcode.value = false;
    setTimeout(() => {
      handleOverlayClick();
      window.location.reload();
    },4000)
  }
};
const userStore = useUserStore();
const timer = ref(null);
const handlePay = async () => {
  const isLogin = userStore.getIsLogin();
  if (!isLogin) {
    ElMessage.warning("你还未登录，请先登录！");
    userStore.hideMemberModal();
    userStore.showLoginModal();
  } else {
    const userInfo = userStore.getUserInfo();
    if (payQr.value) {
      payQr.value = false;
      const res = await createOrder({
        levelId: levelId.value,
        userId: userInfo.id,
      });
      payQr.value = true;
      showQrcode.value = true;
      const url = res.data.codeUrl;
      await nextTick(() => {
        const canvas = qrcodeCanvas.value;
        QRCode.toCanvas(
          canvas,
          url,
          {
            width: 200,
            height: 200,
          },
          (error) => {
            if (error) {
              clearInterval(timer.value);
            } else {
              // if(showPayStatus.value){
              timer.value = setInterval(() => {
                getOrderDetails(res.data.portalOrderId);
              }, 2000);
              // }
              console.log("canvas", canvas);
              console.log("二维码生成成功");
            }
          }
        );
      });
    }
  }
};

// 组件卸载时清除定时器
onBeforeUnmount(() => {
  clearInterval(timer.value);
});

// 计算属性 visible
const visible = computed(() => userStore.isMemberModalVisible);

// 定义方法
const handleOverlayClick = () => {
  userStore.hideMemberModal();
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.my-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  max-width: 90%;
  z-index: 1035;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.line {
  color: #6d6d6d;
}
.line::after,
.line::before {
  content: "";
  background: rgba(50, 50, 50, 0.18);
  width: 50px;
  height: 2px;
  margin: 0 10px;
  flex: 1;
}
.vip_text {
  font-size: 14px;
  color: red;
  margin-top: 10px;
}
.vip-card {
  overflow: hidden;
  position: relative;
  border-radius: 6px;
  padding: 15px;
  height: 80px;
  background: #d2b484;
  background: linear-gradient(25deg, #e6aa4f 10%, #f1d7ad 70%, #f5b97b 100%);
  color: #866127;
  box-shadow: 0 0 10px rgba(98, 98, 98, 0.6);
  transform: translateY(-1px);
}
.vip-baicon {
  position: absolute;
  top: -4px;
  left: -3%;
  opacity: 0.2;
  z-index: 0;
  width: 600px;
  height: 600px;
  background: url(https://www.duya888.com/wp-content/uploads/2024/06/20240617015052106-vip1.webp)
    no-repeat;
}
.dsy {
  color: #6d6d6d;
  line-height: 28px;
}
.member_price_box_zk {
  position: relative;
  color: #6d6d6d;
}
.member_price_box_zk::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  background: red;
  top: 0.6em;
  left: 0;
  transform: rotate(5deg);
}
.member_price_box {
  position: relative;
  width: 90px;
  padding: 5px 15px;
  border-radius: 8px;
  border: 1px solid #6d6d6d;
}
.active {
  border: 2px solid red;
}
.level {
  position: absolute;
  top: 5px;
  left: 10px;
  color: #6d6d6d;
}
.muted-box {
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  color: #999;
  padding: 10px;
  margin-top: 20px;
}
.btn {
  background: linear-gradient(135deg, #fd7a64 10%, #fb2d2d 100%);
  color: #fff;
  border-radius: 18px;
  padding: 10px;
  text-align: center;
}
.pay-box {
  width: 50px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #1e73be;
}
.qrcode-box,
.payStatus {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* left: 50%; */
  z-index: 9999999;
  /* width: 100%;
  height: 100%; */
  background-color: rgba(0, 0, 0, 0.5);
}
.qrcode-container {
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 10px;
  transform: translate(-50%, -50%);
}
.payStatus-container {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 10px;
  transform: translate(-50%, -50%);
  width: 220px;
  height: 200px;
  border-radius: 12px;
  background-color: #fff;
}
.payText {
  width: 100px;
  border-radius: 15px;
  color: #866127;
  padding: 2px 8px;
  background: linear-gradient(25deg, #e6aa4f 10%, #f1d7ad 70%, #f5b97b 100%);
}
</style>
