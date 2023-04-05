/*
 * @Author: aardpro
 * @Date: 2023-04-05 14:18:48
 * @LastEditors: aardpro
 * @LastEditTime: 2023-04-05 14:45:48
 * @Description: 注册 $formatDate
  在main.js注册 引入
  import formatDate from "./directives/format-date.js"
  app.use(formatDate);

  在template页面中使用: {{ $formatDate() }}
*/

import dayjs from 'dayjs';

/**
 * @description: 返回格式化的日期字符串; 如果日期不合法，则返回空字符串
 * @param {any} time 任何可以被dayjs使用的时间格式
 * @param {String} fmt 符合dayjs要求的格式模板 参考 https://day.js.org/docs/en/display/format
 * @return {String}
 */
function formatDate(time, fmt = 'YYYY/MM/DD') {
  return dayjs(time).isValid() ? dayjs(time).format(fmt) : '';
}

export default {
  install: (app) => {
    app.config.globalProperties.$formatDate = formatDate;
  },
};
