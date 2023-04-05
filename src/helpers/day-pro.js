/*
 * @Author: aardpro
 * @Date: 2022-07-19 20:06:24
 * @LastEditors: aardpro
 * @LastEditTime: 2022-10-11 22:03:51
 * @Description: 加载了各种常用插件的dayjs
 */
import dayjs from 'dayjs';
import customParseFormatPlugin from 'dayjs/plugin/customParseFormat';
import isSameOrAfterPlugin from 'dayjs/plugin/isSameOrAfter';
import isSameOrBeforePlugin from 'dayjs/plugin/isSameOrBefore';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import weekdayPlugin from 'dayjs/plugin/weekday';
import weekOfYearPlugin from 'dayjs/plugin/weekOfYear';
import isLeapYearPlugin from 'dayjs/plugin/isLeapYear';
import isTodayPlugin from 'dayjs/plugin/isToday';
import isYesterdayPlugin from 'dayjs/plugin/isYesterday';
import isTomorrowPlugin from 'dayjs/plugin/isTomorrow';
import quarterOfYearPlugin from 'dayjs/plugin/quarterOfYear';
import utcPlugin from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';
// import isoWeekPlugin from 'dayjs/plugin/isoWeek';
// import isoWeeksInYearPlugin from 'dayjs/plugin/isoWeeksInYear';
// import calendarPlugin from 'dayjs/plugin/calendar';
// import durationPlugin from 'dayjs/plugin/duration';

import('dayjs/locale/zh-cn');

dayjs.extend(customParseFormatPlugin);
dayjs.extend(isSameOrAfterPlugin);
dayjs.extend(isSameOrBeforePlugin);
dayjs.extend(isBetweenPlugin);
dayjs.extend(weekdayPlugin);
dayjs.extend(weekOfYearPlugin);
dayjs.extend(isLeapYearPlugin);
dayjs.extend(isTodayPlugin);
dayjs.extend(isYesterdayPlugin);
dayjs.extend(isTomorrowPlugin);
dayjs.extend(quarterOfYearPlugin);
// dayjs.extend(isoWeekPlugin);
// dayjs.extend(isoWeeksInYearPlugin);
// dayjs.extend(calendarPlugin);
// dayjs.extend(durationPlugin);
dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);

dayjs.locale('zh-cn');
dayjs.tz.setDefault('Asia/Shanghai');

// 返回格式化的日期; 如果日期不合法，则返回空字符串
export function formatDate(time, fmt = 'YYYY/MM/DD') {
  return dayjs(time).isValid() ? dayjs(time).format(fmt) : '';
}

// 注册全局用法:
// 在main.js注册 引入
//   import { installFormatDate } from "./utils/Day.js"
//   app.use(installFormatDate);
export const installFormatDate = {
  install: (app) => {
    app.config.globalProperties.$formatDate = formatDate;
  },
};

// 输出引入了插件的 dayjs 实例
export default dayjs;
