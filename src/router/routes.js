/*
 * @Author: aardpro
 * @Date: 2022-06-19 11:16:56
 * @LastEditors: aardpro
 * @LastEditTime: 2023-04-04 22:26:46
 * @Description:
 */
export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home/home-page.vue'),
    meta: { title: '首页' },
    children: [
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/login.vue'),
    meta: { title: '用户登录' },
  },
  {
    path: '/:w+',
    name: 'NotFound',
    component: () => import('@/pages/not-found/not-found.vue'),
  },
];
