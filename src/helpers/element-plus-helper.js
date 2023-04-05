/*
 * @Author: aardpro
 * @Date: 2022-06-18 16:21:56
 * @LastEditors: aardpro
 * @LastEditTime: 2022-06-19 21:52:26
 * @Description: 把element plus组件做重新包装
 */
import { ElMessageBox } from 'element-plus';

/**
 * @description: 信息框
 * @param {string} action alert|confirm|prompt
 * @param {object} options https://element-plus.gitee.io/zh-cn/component/message-box.html#messagebox-%E9%85%8D%E7%BD%AE%E9%A1%B9
 * @return {string|boolean}
 */
export function ProMessage(action, options) {
  const MessageBox = ['alert', 'confirm', 'prompt'].includes(action) ? ElMessageBox[action] : ElMessageBox;
  try {
    return MessageBox(options.message, options.title, { ...options });
  } catch (error) {
    return false;
  }
}

/**
 * @description: 以promise方式返回表单验证结果
 * @param {HTMLElement} formEl
 * @return {Promise.<boolean>}
 */
export function ProValidForm(formEl) {
  if (!formEl) {
    return false;
  }
  return new Promise((resolve) => {
    formEl.validate((valid) => {
      if (valid) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}
