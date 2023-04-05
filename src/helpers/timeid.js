/*
 * @Author: aardpro
 * @Date: 2022-09-08 23:47:57
 * @LastEditors: aardpro
 * @LastEditTime: 2023-03-09 23:03:27
 * @Description: 生成26进制时间戳id
 * 以26个字母代替10进制数字
 * 负数首字母为_
 */
import dayjs from 'dayjs';
import { random } from 'lodash';

// 把数字加上97后转换成字母；97=>a
const num2c = (num) => String.fromCharCode(num + 97);

/**
 * @description: 把数字转换成字符
 * @param {number} num 数字0-25对应a-z
 * @param {number} length 字符串长度；以前置a补齐长度
 * @return {string}
 */
function toBase26(num, length = 0) {
  if (num < 0) {
    return `0${toBase26(-num, length)}`;
  }
  if (num === 0) {
    return num2c(num).padStart(length, num2c(0));
  }
  const arr = [];
  let n = num;
  while (n > 0) {
    const m = n % 26;
    arr.push(m);
    n = (n - m) / 26;
  }
  return arr.reverse().map((item) => num2c(item)).join('').padStart(length, num2c(0));
}

/**
 * @description: 根据时间生成id，格式是时间转码+附加码
 * @param {number|undefined} [timestamp] 时间戳
 * @param {number} [suffixLength] 附加数字的长度
 * @return {string}
 */
function makeId(timestamp, suffixLength = 3) {
  const num = dayjs(timestamp).isValid() ? timestamp : Date.now();
  const id = toBase26(num); // 目前是9位字符串
  if (suffixLength < 1) {
    return id;
  }
  const suffix = random(0, 10 ** suffixLength).toString().padStart(suffixLength, '0');
  return `${id}${suffix}`;
}

export default makeId;
