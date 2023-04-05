/*
 * @Author: aardpro
 * @Date: 2022-06-18 21:55:05
 * @LastEditors: aardpro
 * @LastEditTime: 2022-08-25 21:45:13
 * @Description:
 */

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'no-await-in-loop': 'off',
    'vue/no-multiple-template-root': 'off',
    'import/no-unresolved': 'off',
    'vue/multi-word-component-names': 'off',
    'import/extensions': 'off',
    'max-len': ['error', { code: 150 }],
  },
  settings: {
    'import/resolver': {
    },
  },
  globals: {
    app: true,
    viwer3D: true,
    Glodon: true,
    BimfaceSDKLoaderConfig: true,
    BimfaceSDKLoader: true,
  },
};
