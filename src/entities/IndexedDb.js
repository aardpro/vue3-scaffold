/*
 * @Author: aardpro
 * @Date: 2022-09-11 18:10:17
 * @LastEditors: aardpro
 * @LastEditTime: 2023-03-31 23:10:28
 * @Description: 通过localforage操作indexedDB
 * 通过把用户记录等常用数据做缓存，后端可以无需联表查询只返回主表记录，而前端也无需频繁查询用户，用于提高性能
 */
import dayjs from 'dayjs';
import localforage from 'localforage';
import Responser from '@/entities/Responser';
import makeId from '@/utils/timeid';
import { getLocationNamespace } from '@/utils/';

// 默认缓存时间，单位分钟
const CACHED_DURATION = import.meta.env.VITE_APP_CACHE_LIFE ? +import.meta.env.VITE_APP_CACHE_LIFE : 0;

class IndexedDB {
  /**
   * @description: 配置函数
   * @param {Object} config
   * @param {String} [config.name] 数据库名字
   * @param {String} [config.drive] 数据库驱动器
   * @param {String} [config.storeName] 表名
   * @param {String} [config.description] 表介绍文字
   * @param {Number} [config.size] 数据库最大值
   */
  constructor(config = {}) {
    this.store = localforage.createInstance({
      name: getLocationNamespace(config.name ? `${config.name}` : 'cache'),
      driver: config.drive || localforage.INDEXEDDB,
      storeName: config.storeName ? `${config.storeName}` : 'main',
      description: config.description || 'cached table',
      size: config.size || 1024 * 1024 * 1024 * 10,
    });
  }

  /**
   * @description: 根据key获取记录
   * @param {String} key key
   * @param {Number} [duration] 有效期 单位分钟
   * @return {Promise<Responser>}
   */
  async getItem(key, duration = CACHED_DURATION) {
    try {
      const value = await this.store.getItem(`${key}`);
      if (duration > 0) {
        if (value.expiredAt < Date.now()) {
          return new Responser(null, 1, '已过期');
        }
      }
      return new Responser(value.value);
    } catch (err) {
      return new Responser(null, 1, err.message);
    }
  }

  async getItems(keys, duration = CACHED_DURATION) {
    try {
      if (!(keys instanceof Array) || keys.length < 1) {
        return new Responser([]);
      }
      const records = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const key of keys) {
        // eslint-disable-next-line no-await-in-loop
        const result = await this.getItem(key, duration);
        if (!result.errCode) {
          records.push({ key, value: result.data });
        }
      }
      return new Responser(records);
    } catch (err) {
      return new Responser(null, 1, err.message);
    }
  }

  async removeItem(key) {
    try {
      await this.store.removeItem(key);
      return new Responser(key);
    } catch (err) {
      return new Responser(null, 1, err.message);
    }
  }

  async clear() {
    try {
      await this.store.clear();
      return new Responser(true);
    } catch (err) {
      return new Responser(null, 1, err.message);
    }
  }

  async keys() {
    try {
      const keys = await this.store.keys();
      return new Responser(keys.sort());
    } catch (err) {
      return new Responser(null, 1, err.message);
    }
  }

  async length() {
    try {
      const length = await this.store.length();
      return new Responser(length);
    } catch (err) {
      return new Responser(null, 1, err.message);
    }
  }

  /**
   * @description: 写入记录
   * @param {any} value 值
   * @param {string} givingKey 如果不提供此参数，则自动创建
   * @return {Promise<Responser>}
   */
  async setItem(value, givingKey, duration = CACHED_DURATION) {
    try {
      const expiredAt = duration ? Date.now() + duration * 60000 : 0;
      const key = givingKey || makeId();
      const keyStr = `${key}`;
      await this.store.setItem(keyStr, { value, expiredAt });
      return new Responser(keyStr);
    } catch (err) {
      return new Responser(null, 1, err.message);
    }
  }

  /**
   * @description: 获取全部键值对
   * @param {boolean} reverse 是否倒序
   * @return {Promise<Responser>}
   */
  async iterate(reverse = true) {
    try {
      return new Promise((resolve) => {
        const records = [];
        this.store.iterate((value, key) => {
          records.push({ key, value });
        })
          .then(() => {
            resolve(new Responser(reverse ? records.reverse() : records));
          })
          .catch((err) => {
            resolve(new Responser(null, 1, err.message));
          });
      });
    } catch (err) {
      return new Responser(null, 1, err.message);
    }
  }

  // 读取缓存数据
  async getCache(key) {
    if (!import.meta.env.VITE_APP_CACHE_LIFE) {
      return new Responser(null, 1, 'CACHELIFE undefined');
    }
    const res = await this.getItem(key);
    if (res.errCode) {
      return res;
    }
    const { timestamp, data } = res.data;
    if (dayjs().diff(dayjs(timestamp), 'minute') > +import.meta.env.VITE_APP_CACHE_LIFE) {
      return new Responser(null, 1, 'expired');
    }
    return new Responser(data);
  }

  // 存储缓存数据,把数据包装成 key:  { timestamp, data的形式}
  async setCache(key, value) {
    return this.setItem({ timestamp: Date.now(), data: value }, key);
  }
}

export default IndexedDB;
