/*
 * @Author: aardpro
 * @Date: 2023-03-10 22:02:06
 * @LastEditors: aardpro
 * @LastEditTime: 2023-03-13 20:43:05
 * @Description: 命名空间存储类，可以使用localStorage和sessionStorage
 */
import { getLocationNamespace, safeJsonStringify, safeJsonParse } from '@/utils/';
import StorageNames from '@/const-data/storage-names';

// 检查key值是否在storage-names中定义（不允许使用未预先定义的存储值）
function validateKey(key) {
  if (!Object.prototype.hasOwnProperty.call(StorageNames, key)) {
    throw new Error(`"${key}" undefined in storage-names`);
  }
}
/**
 * @description: 带命名空间前缀的存储方法
 * @param {Object} storage window.localStorage|window.sessionStorage
 * @return {NamespaceStorage}
 */
class NamespaceStorage {
  constructor(storage) {
    // 保存一个键值对
    this.setItem = (key, value) => {
      validateKey(key);
      storage.setItem(getLocationNamespace(key), safeJsonStringify(value));
    };

    // 根据键名获取值
    this.getItem = (key) => {
      validateKey(key);
      const item = storage.getItem(getLocationNamespace(key));
      return safeJsonParse(item);
    };

    // 根据键名删除一个值
    this.removeItem = (key) => {
      validateKey(key);
      storage.removeItem(getLocationNamespace(key));
    };

    // 清空全部存储
    this.clear = () => {
      Object.keys(StorageNames).forEach((key) => {
        storage.removeItem(getLocationNamespace(key));
      });
    };
  }
}

export default NamespaceStorage;
