/*
 * @Author: aardpro
 * @Date: 2023-04-05 09:40:11
 * @LastEditors: aardpro
 * @LastEditTime: 2023-04-05 09:40:38
 * @Description: https://cn.vitejs.dev/guide/env-and-mode.html
 */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
