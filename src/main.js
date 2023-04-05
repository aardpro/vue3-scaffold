/*
 * @Author: aardpro
 * @Date: 2022-06-18 14:12:13
 * @LastEditors: aardpro
 * @LastEditTime: 2023-04-05 14:42:40
 * @Description:
 */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist';

import svgIcon from './svg-icons/svg-icon.vue';
import router from './router';
import 'animate.css';
// 暗黑模式 https://element-plus.gitee.io/zh-CN/guide/dark-mode.html
// import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/styles/index.scss';

import $formatDate from './directives/format-date';

import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersist);

app.use(pinia);
app.use(router);
app.use($formatDate);

app.component('svg-icon', svgIcon);

app.mount('#app');
