/*
 * @Author: aardpro
 * @Date: 2022-06-19 15:30:43
 * @LastEditors: aardpro
 * @LastEditTime: 2023-04-05 09:59:28
 * @Description: home下的子路由页面
 */
const homeChildren = [
  {
    path: 'bim-lite',
    name: 'BimLite',
    component: () => import('@/pages/home/bim-app/bim-app.vue'),
    meta: { en: 'BIM Lite', 'zh-cn': 'BIM应用' },
  },
  {
    path: 'bim-mobile',
    name: 'BimMobile',
    component: () => import('@/pages/home/bim-mobile/bim-mobile.vue'),
    meta: { en: 'BIM Mobile', 'zh-cn': '移动BIM' },
  },
  {
    path: 'gis-lite',
    name: 'GisLite',
    component: () => import('@/pages/home/gis-app/gis-app.vue'),
    meta: { en: 'Gis Lite', 'zh-cn': 'Gis应用' },
  },
  {
    path: 'smart-man',
    name: 'SmartMan',
    component: () => import('@/pages/home/smart-man/smart-man.vue'),
    meta: { en: 'Smart Building', 'zh-cn': '智慧建造' },
  },
];

// 输出给菜单使用，有可能跟路由数组有所不同，可以在此处进行调整
export const homeMenuChildren = [...homeChildren];

export default homeChildren;
