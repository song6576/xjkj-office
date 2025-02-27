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
                  <input placeholder="手机号" v-model="form.phone" />
                  <input
                    class="mt-20"
                    placeholder="密码"
                    type="password"
                    v-model="form.portalPasswords"
                  />
                </div>
              </div>
            </div>
            <div class="submit_btn cp flex flex-ai flex-jc px-5 py-5" @click="submit">
              <img src="@/assets/login.png" width="20" height="20" />
              <div class="ml-10">{{ btnText }}</div>
            </div>
            <div class="login_btnGo cp flex flex-ai flex-jc px-5 py-5" @click="goregiter">
              <div class="ml-10">去注册</div>
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
import { ref, reactive,computed } from "vue";
import { useUserStore } from "@/store";
import { login, getLoginDetail } from "@/api/login";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const btnText = ref("登录");
const form = reactive({
  phone: "",
  portalPasswords: "",
});

const submit = async () => {
  // 验证手机号是否是11位和数字,同时去掉空格
  if (!/^1[3456789]\d{9}$/.test(form.phone.replace(/\s/g, ""))) {
    ElMessage.error("请输入正确的手机号");
    return;
  }
    await login({
      phone: form.phone,
      portalPasswords: form.portalPasswords,
    })
      .then(async (res) => {
        ElMessage({
          message: "登录成功",
          type: "success",
        });
        localStorage.setItem("token", res.data.token);
        const userdata = await getLoginDetail({
          userId: res.data.userId,
        });
        userStore.setUserInfo(userdata.data);
        // 刷新页面
        window.location.reload();
        userStore.hideLoginModal();
        userStore.hideRegisterModal();
      })
      .catch((err) => {
        console.log(err);
        ElMessage.error(err);
      });
};
// 计算属性 visible
const visible = computed(() => userStore.isLoginModalVisible);
const goregiter = () => {
  userStore.hideLoginModal();
  userStore.showRegisterModal();
}
// 定义方法
const handleOverlayClick = () => {
  userStore.hideLoginModal();
};
</script>

<style scoped>
@import url('./index.css');
</style>
