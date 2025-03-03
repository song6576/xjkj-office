<template>
  <div v-if="visible" class="overlay" @click.self="handleOverlayClick">
    <div class="w-100 h-full" @click.self="handleOverlayClick">
      <div class="my-modal rounded-md relative" :style="`width: 800px`" @click.stop>
        <div class="content flex">
          <div class="flex-1">
            <div style="position: relative">
              <img
                src="@/assets/logo.png"
                class="logo_modal"
                width="90"
                height="25"
                alt="logo"
              />
              <div class="bg"></div>
            </div>
          </div>
          <div class="flex-1">
            <div class="flex flex-col flex-ai flex-jc p-25" style="position: relative">
              <img src="@/assets/big-logo.png" width="200" height="50" alt="logo" />
              <div class="login_title fs-32 mt-30">{{ btnText }}</div>
              <div class="form mt-20">
                <div class="flex flex-col flex-ai">
                  <input
                    placeholder="手机号"
                    v-model="form.phone"
                    @change="phoneChange"
                  />
                  <div class="flex flex-col mt-10" style="width: 105%">
                    <input
                      placeholder="密码"
                      type="password"
                      v-model="form.portalPasswords"
                      style="width: 95%"
                    />
                    <div class="flex flex-ai flex-between mt-10">
                      <input placeholder="图形验证码" v-model="form.photo" />
                      <div class="mt-10 ml-10 cp" @click="photoChangeCode">
                        <img
                          :src="photoImg"
                          width="100"
                          height="30"
                          @click="photoCode"
                          v-if="photoImg"
                        />
                      </div>
                    </div>
                    <div class="flex flex-ai flex-between mt-10">
                      <input placeholder="验证码" v-model="form.code" />
                      <div
                        class="codeBtn mt-10 ml-10 cp flex flex-ai flex-jc"
                        @click="sendCode"
                      >
                        {{ isCountingDown ? countdownText : "发送验证码" }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="submit_btn cp flex flex-ai flex-jc px-5 py-5" @click="submit">
              <img src="@/assets/login.png" width="20" height="20" />
              <div class="ml-10">{{ btnText }}</div>
            </div>
            <div class="login_btnGo cp flex flex-ai flex-jc px-5 py-5" @click="goLogin">
              <div class="ml-10">去登录</div>
            </div>
            <div class="fs-12 flex flex-ai flex-jc form_dsy">
              使用社交账号登录即表示同意<span style="color: #467bf8"
                >用户协议、隐私声明</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useUserStore } from "@/store";
import { register, generateGraphicalCaptcha, getPhoneCode } from "@/api/login";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const btnText = ref("注册");
const form = reactive({
  phone: "",
  portalPasswords: "",
  codePassWord: "",
  code: "",
  photo: "",
});
const photoImg = ref("");
const photoImgName = ref("");
const isCountingDown = ref(false);
const countdownTime = ref(60);
const countdownInterval = ref(null);
const countdownText = computed(() => {
  return `${countdownTime.value}秒`;
});
const startCountdown = () => {
  console.log("startCountdown");
  isCountingDown.value = true;
  countdownInterval.value = setInterval(() => {
    if (countdownTime.value > 0) {
      countdownTime.value--;
    } else {
      stopCountdown();
    }
  }, 1000);
};
const stopCountdown = () => {
  clearInterval(countdownInterval.value);
  isCountingDown.value = false;
  countdownTime.value = 60;
};

const phoneChange = async () => {
  if (!/^1[3456789]\d{9}$/.test(form.phone.replace(/\s/g, ""))) {
    ElMessage.warning("请输入正确的手机号");
    return;
  }
  const res = await generateGraphicalCaptcha({
    phone: form.phone,
  });
  photoImg.value = res.data.imgUrl;
  photoImgName.value = res.data.imageName;
};
const sendCode = async () => {
  if (!/^1[3456789]\d{9}$/.test(form.phone.replace(/\s/g, ""))) {
    ElMessage.warning("请输入正确的手机号");
    return;
  }
  if (form.photo == "") {
    ElMessage.warning("请输入图形验证码");
    return;
  }
  if (!isCountingDown.value) {
    startCountdown();
    await getPhoneCode({
      phone: form.phone,
      imageName: photoImgName.value,
      code: form.photo,
    })
      .then(() => {
        ElMessage({
          message: "发送成功",
          type: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        ElMessage.error(err);
      });
  }
};

const registers = async (params) => {
  await register(params)
    .then((res) => {
      ElMessage({
        message: "注册成功",
        type: "success",
      });
      userStore.hideRegisterModal();
      userStore.showLoginModal();
    })
    .catch((err) => {
      console.log(err);
      ElMessage.error(err);
    });
};
const photoChangeCode = async () => {
  const res = await generateGraphicalCaptcha({
    phone: form.phone,
  });
  photoImg.value = res.data.imgUrl;
  photoImgName.value = res.data.imageName;
};
const submit = async () => {
  // 验证手机号是否是11位和数字,同时去掉空格
  if (!/^1[3456789]\d{9}$/.test(form.phone.replace(/\s/g, ""))) {
    ElMessage.warning("请输入正确的手机号");
    return;
  }
  registers({
    phone: form.phone,
    portalPasswords: form.portalPasswords,
    code: form.code,
  });
};
// 计算属性 visible
const visible = computed(() => userStore.isRegisterModalVisible);
const goLogin = () => {
  userStore.hideRegisterModal();
  userStore.showLoginModal();
};
// 定义方法
const handleOverlayClick = () => {
  userStore.hideRegisterModal();
};
const isCodeShow = ref(false);
const code = () => {
  isCodeShow.value = !isCodeShow.value;
};
</script>

<style scoped>
@import url("./index.css");
</style>
