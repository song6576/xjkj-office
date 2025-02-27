// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/home/index.vue';
import NavContent from '../pages/navContent/index.vue';
import Detail from '../pages/detail/index.vue';
import SearchContent from '../pages/searchContent/index.vue';
import UserDetail from '../pages/userDetail/index.vue';
import Comment from '../pages/comment/index.vue'

const routes = [
  // 重定向
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/nav-content/:id',
    name: 'navContent',
    component: NavContent
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail
  },
  {
    path: '/search-content/:keyword?',
    name: 'searchContent',
    component: SearchContent
  },
  {
    path: '/user-detail',
    name: 'userDetail',
    component: UserDetail
  },
  {
    path: '/comment',
    name: 'comment',
    component: Comment
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;