/*
 * @Author: aardpro
 * @Date: 2023-03-10 23:03:21
 * @LastEditors: aardpro
 * @LastEditTime: 2023-03-31 22:46:35
 * @Description: 基础类，一般是其它类的父类
 */
import { cloneDeep, isNil } from 'lodash';
import dayjs from 'dayjs';

class Entity {
  constructor(data = {}) {
    if (isNil(data)) {
      console.warn(`data is ${data}!`);
    }
    this.data = cloneDeep(data) || {};
  }

  get id() {
    return this.data.id;
  }

  get name() {
    return this.data.name;
  }

  get content() {
    return this.data.content;
  }

  get createdBy() {
    return this.data.created_by;
  }

  get updatedBy() {
    return this.data.updated_by;
  }

  get deletedBy() {
    return this.data.deleted_by;
  }

  get avatar() {
    return this.data.avatar_url;
  }

  get status() {
    return this.data.status;
  }

  get isRoot() {
    return Object.prototype.hasOwnProperty.call(this.data, 'pid') && !this.data.pid;
  }

  get createAtValue() {
    if (!Object.prototype.hasOwnProperty.call(this.data, 'created_at')) {
      return '';
    }
    if (dayjs(this.data.created_at).isValid()) {
      return dayjs(this.data.created_at).format('YYYY-MM-DD hh:mm');
    }
    return '';
  }

  get updatedAtValue() {
    if (!Object.prototype.hasOwnProperty.call(this.data, 'updated_at')) {
      return '';
    }
    if (dayjs(this.data.updated_at).isValid()) {
      return dayjs(this.data.updated_at).format('YYYY-MM-DD hh:mm');
    }
    return '';
  }

  get deletedAtValue() {
    if (!Object.prototype.hasOwnProperty.call(this.data, 'deleted_at')) {
      return '';
    }
    if (dayjs(this.data.deleted_at).isValid()) {
      return dayjs(this.data.deleted_at).format('YYYY-MM-DD hh:mm');
    }
    return '';
  }
}

export default Entity;
