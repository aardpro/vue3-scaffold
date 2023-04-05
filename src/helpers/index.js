/*
 * @Date: 2022-02-12 15:25:01
 * @LastEditors: aardpro
 * @LastEditTime: 2023-03-24 23:04:05
 * @Description: 工具函数
 */

/**
 * @description 延时执行
 * @param {Number} t 毫秒数
 * @return {Promise}
 * 用法1: sleep(5000).then(() => {要运行的代码})
 * 用法2: await sleep(5000);要运行的代码
 */
export const sleep = (t = 1000) => new Promise((resolve) => {
  setTimeout(resolve, +t || 1000);
});

/**
 * @description: 随机生成头像 参考
 * @param {any} avatarName
 * @return {String}
 *  参考 https://api.multiavatar.com/
 */
export function getAvatar(avatarName) {
  // 使用前缀，防止和别人"撞脸"
  const prefix = import.meta.env.VITE_APP_NAME || 'myprefix';
  // 如果avatarName是非空的字符串或者数字，直接用；
  if (avatarName && ['string', 'number'].indexOf(typeof avatarName) !== -1) {
    return `https://api.multiavatar.com/${prefix}${avatarName}.png`;
  }
  // 如没有提供合适参数，则用undefined
  return `https://api.multiavatar.com/${prefix}undefined.png`;
}

// 是否本地开发环境
export function isLocalhost() {
  return window.location.host.includes('localhost') || window.location.host.includes('127.0.0.1');
}

/**
 * @description: 安全的JSON.parse方法
 * @param {String} str 待解码的字符串
 * @param {any} def 当解码失败时的默认值
 * @return {*}
 */
export function safeJsonParse(str, def = false) {
  try {
    const res = JSON.parse(str);
    if (!res) {
      return def;
    }
    return res;
  } catch (err) {
    console.error(err.message);
  }
  return def;
}
/**
 * @description: 安全的JSON.stringify方法
 * @param {any} val 任意值
 * @return {String}
 */
export function safeJsonStringify(val) {
  try {
    return JSON.stringify(val);
  } catch (err) {
    console.error(err.message);
  }
  return '';
}
/**
 * @description: 把网址路径作为命名空间的键值
 * @param {String} key 键值
 * @return {String} "路径-key-",小写的字符串
 */
export function getLocationNamespace(key) {
  const namespace = !window.location.origin || !window.location.pathname
    ? import.meta.env.VITE_APP_NAME
    : `${window.location.origin}${window.location.pathname}`;
  return (`${namespace}-${key}-`).toLowerCase();
}
