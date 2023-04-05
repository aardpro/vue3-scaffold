/*
 * @Author: aardpro
 * @Date: 2022-06-18 18:55:47
 * @LastEditors: aardpro
 * @LastEditTime: 2023-04-03 22:53:45
 * @Description: 跟vue3相关的方法
 */
import { ref } from 'vue';

/**
 * @description: 异步读取文件，把其值赋值给ref变量
 * @param {Import} importFunc 如 const importFunc = ()=>import(xxx)
 * @return {Ref}
 */
function import2ref(importFunc) {
  const refVar = ref();
  importFunc().then((file) => {
    refVar.value = file.default;
  });
  return refVar;
}

export default {
  import2ref,
};
