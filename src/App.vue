<!--
 * @Author: aardpro
 * @Date: 2022-06-18 14:12:13
 * @LastEditors: aardpro
 * @LastEditTime: 2023-04-04 22:30:41
 * @Description: App.vue
-->
<script setup name="App">
import { ElConfigProvider } from 'element-plus';
import 'dayjs/locale/zh-cn';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
