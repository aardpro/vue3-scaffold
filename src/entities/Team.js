/*
 * @Author: aardpro
 * @Date: 2023-03-19 17:57:43
 * @LastEditors: aardpro
 * @LastEditTime: 2023-03-19 23:20:20
 * @Description: 团队类
 */
import dayjs from 'dayjs';
import Entity from './Entity';

class Team extends Entity {
  get shortName() {
    return this.data.short_name || '';
  }

  get expiredAtValue() {
    if (!Object.prototype.hasOwnProperty.call(this.data, 'expired_at')) {
      return '';
    }
    if (dayjs(this.data.expired_at).isValid()) {
      return dayjs(this.data.expired_at).format('YYYY-MM-DD hh:mm');
    }
    return '';
  }
}

export default Team;
