/*
 * @Author: aardpro
 * @Date: 2022-06-18 14:12:13
 * @LastEditors: aardpro
 * @LastEditTime: 2023-04-05 09:54:47
 * @Description: vite配置
 * 参考 https://vitejs.dev/config/
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { readFileSync } from "fs"
// import path, { resolve, dirname } from 'path';
// import { fileURLToPath } from 'url';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { createHtmlPlugin } from 'vite-plugin-html';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';

import { parse } from "envfile"
import svgBuilder from './src/plugins/svg-builder';

// const rootDir = typeof __dirname !== 'undefined'
//   ? __dirname
//   : dirname(fileURLToPath(import.meta.url));


const env = parse(readFileSync(`${path.resolve(__dirname, '.env')}`))

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "~/assets/styles/element/index.scss" as *;',
      },
    },
  },
  plugins: [
    vue(),
    vueSetupExtend(),
    svgBuilder('./src/svg-icons/icons/'),
    // appendContentsToHead(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus({
      useSource: true,
    }),
    createHtmlPlugin({
      minify: true,
      entry: 'src/main.js',
      template: 'index.html',
      inject: {
        data: {
          title: env.VITE_APP_TITLE
        }
      }
    })
  ],
});
