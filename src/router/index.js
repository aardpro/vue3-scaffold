/*
 * @Author: aardpro
 * @Date: 2022-06-18 22:22:48
 * @LastEditors: aardpro
 * @LastEditTime: 2023-04-05 09:57:01
 * @Description: 路由设置，导航守卫设置
 */
import { createRouter, createWebHashHistory } from 'vue-router';

import routes from './routes';

const appTitle = import.meta.env.VITE_APP_TITLE;

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

router.afterEach((to) => {
  document.title = [appTitle, to.meta.title || ''].filter(item => !!item).join(' - ')
});

export default router;
