import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  // 状态
  state: () => ({
    isLoginModalVisible: false, // 管理登录注册弹窗的显示隐藏状态
    isRegisterModalVisible: false,
    isMemberModalVisible: false, // 显示会员弹窗
    isLogin: false, // 是否是登录状态，true 表示登录，false 表示注册
    reset: false, // 重置密码状态
    isShowUserInfo: false, // 是否显示用户信息
    userInfo: {}, // 用户信息
    isShowPhoneMask: true, // 是否显示手机端的全局遮罩--true---隐藏，false---显示
    keyWord: [], // 搜索关键字
  }),

  // 相当于 mutations 和 actions 的组合
  actions: {
    showLoginModal() {
      this.isLoginModalVisible = true;
    },
    hideLoginModal() {
      this.isLoginModalVisible = false;
    },
    showRegisterModal() {
      this.isRegisterModalVisible = true;
      this.isLoginModalVisible = false;
    },
    hideRegisterModal() {
      this.isRegisterModalVisible = false;
      this.isLoginModalVisible = false;
    },
    showMemberModal() {
      this.isMemberModalVisible = true;
      this.isMyModalVisible = false;
    },
    hideMemberModal() {
      this.isMemberModalVisible = false;
      this.isMyModalVisible = false;
    },
    // 平滑到指定内容
    scrollToTabContent(id) {
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: y, behavior: "smooth" }); // 平滑滚动到指定内容模块
      }
    },
    // 切换登录注册状态
    toggleLoginState() {
      this.isLogin = !this.isLogin;
    },
    // 重置密码状态
    setResetState(value) {
      this.reset = value;
    },
    // 重置所有状态
    resetAllState() {
      this.isLogin = true;
      this.reset = false;
    },
    // 显示用户信息
    showUserInfo() {
      this.isShowUserInfo = true;
    },
    // 隐藏用户信息
    hideUserInfo() {
      this.isShowUserInfo = false;
    },
    // 设置用户信息
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
      this.isLogin = true;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('isLogin', true);
    },
    // 获取用户信息
    getUserInfo() {
      const storedValue = localStorage.getItem('userInfo');
      this.userInfo = storedValue ? JSON.parse(storedValue) : {};
      return this.userInfo;
    },
    // 获取是否是登录状态
    getIsLogin() {
      const storedValue = localStorage.getItem('isLogin');
      return storedValue;
    },
    // 清除用户信息
    clearUserInfo() {
      this.userInfo = {};
      this.isLogin = false;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('isLogin',false);
    },
    // 设置手机端全局遮罩
    setPhoneMask(value) {
      this.isShowPhoneMask = value;
    },
    setKeyWord(value) {
      if (value.trim() !== '') {
        // 检查数组中是否已经存在该值
        if (!this.keyWord.includes(value)) {
          // 如果不存在相同的值，则添加到数组中
          this.keyWord.push(value);
          // 将更新后的数组存储到 localStorage 中
          localStorage.setItem('keyWord', JSON.stringify(this.keyWord));
        }
      }
      return this.keyWord;
    },
    getKeyWord() {
      const storedValue = localStorage.getItem('keyWord');
      this.keyWord = storedValue ? JSON.parse(storedValue) : [];
      return this.keyWord;
    },
    clearKeyWord() {
      this.keyWord = [];
      localStorage.setItem('keyWord', []);
      return this.keyWord;
    }
  }
});