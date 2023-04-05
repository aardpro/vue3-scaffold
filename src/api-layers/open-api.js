/*
 * @Author: aardpro
 * @Date: 2023-03-13 20:34:57
 * @LastEditors: aardpro
 * @LastEditTime: 2023-03-19 21:54:11
 * @Description:
 */
import request from '@/api/interceptor';

function getCaptcha(data) {
  return request({ url: '/sys/open/get-captcha', data });
}
function sendCode(data) {
  return request({ url: '/sys/open/send-code', data });
}
function checkEmail(data) {
  return request({ url: '/sys/open/check-email', data });
}
function checkMobile(data) {
  return request({ url: '/sys/open/check-mobile', data });
}

export default {
  getCaptcha,
  sendCode,
  checkEmail,
  checkMobile,
};
