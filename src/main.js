import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import '@/common/common.scss'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'; // 引入持久化插件
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import router from './router';
import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'


const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
// 页面滚动条置顶
router.beforeEach((to, from, next) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.pageYOffset = 0;
    next()
})
app.use(pinia);
app.use(router);
app.use(UndrawUi)
app.use(ElementPlus, {
  locale: zhCn // 设置中文语言环境
});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount('#app')
