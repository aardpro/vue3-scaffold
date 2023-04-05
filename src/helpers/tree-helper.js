/* eslint-disable no-loop-func */
/*
 * @Author: aardpro
 * @Date: 2022-06-18 16:21:56
 * @LastEditors: aardpro
 * @LastEditTime: 2023-04-01 11:53:58
 * @Description: 树形数组操作函数
 */
import cloneDeep from 'lodash/cloneDeep';
import isPlainObject from 'lodash/isPlainObject';
import uniqBy from 'lodash/uniqBy';
import uniq from 'lodash/uniq';

/**
 * @description: 判断变量是否基础类型
 * @param {any} val 变量
 * @return {boolean}
 */
function isBasic(val) {
  return val === null || ['string', 'number', 'boolean', 'undefined'].includes(typeof val);
}
/**
 * @description: 基拷贝，即去除非基本类型的属性
 * @return {any}
 */
function basicCopy(obj) {
  if (!isBasic(obj)) {
    return obj;
  }
  const result = {};
  Object.keys(obj).forEach((i) => {
    if (isBasic(obj[i])) {
      result[i] = obj[i];
    }
  });
  return result;
}

/**
 * @description: 深复制，但是去除指定属性（一般是去除children）
 * @param {object} obj 对象
 * @param {string|array} properties 属性名，字符串或者字符串数组
 * @return {object}
 */
function cloneExclude(obj, properties = 'children') {
  if (!isPlainObject(obj)) {
    return {};
  }
  const params = properties instanceof Array ? properties : [properties];
  const data = cloneDeep(obj);
  params.forEach((item) => {
    delete data[item];
  });
  return data;
}

/**
 * @description 遍历树 针对树结构数组的每一层的每个元素(节点)进行一些操作(N叉树的层序遍历)，并且在完成所有(同步)操作后返回结果
 * @param {Array} nodes 树结构数组
 * @param {string} childAttrName 子树节点数组的属性名
 * @param {Function} callback 操作函数(三个参数：level:层级(从1开始)，node:节点, controller控制器：可以通过controller.abort()终止)
 * @returns {undefined}
 * 使用方法
    walkTree(useCascaderAreaData(), 'children', (_, node, ctl) => {
      if (_ < 3) {
        console.log(_, node.text, node.value)
        count++
      } else {
        ctl.abort()
      }
    })
 */
function walkTree(nodes = [], childAttrName = 'children', callback = () => {}) {
  if (!(nodes instanceof Array)) {
    return;
  }
  const controller = new AbortController();
  const queue = nodes.slice();
  let level = 0;
  const imTrue = true; // eslint:no-constant-condition
  // eslint-disable-next-line no-unmodified-loop-condition
  while (imTrue) {
    level++;
    let count = queue.length;
    if (count === 0) {
      break;
    }
    while (count--) {
      const node = queue.shift();
      callback(level, node, controller);
      if (controller.signal.aborted) {
        return;
      }
      if (node[childAttrName] && node[childAttrName].length) {
        for (let i = 0; i < node[childAttrName].length; i++) {
          queue.push(node[childAttrName][i]);
        }
      }
    }
  }
}

/**
 * @description 根据value值从多级cascade数据对象中取出数据链
 * @param {array} treeArr 树形结构数组
 * @param {string} key 元素得键名，一般是id
 * @param {string} parentName 返回值中指向父元素的key值的字段
 * @param {string} childrenName 包含子元素的数组树形名，如children
 * @returns {array} 带上parentId链接的扁平数组
 */

function flatten(
  treeArr,
  key = 'id',
  parentName = 'parentId',
  childrenName = 'children',
) {
  const data = [];
  walkTree(treeArr, childrenName, (level, node) => {
    if (node[childrenName] instanceof Array) {
      node[childrenName].forEach((child) => {
        child[parentName] = node[key];
      });
    }
    data.push({
      ...cloneExclude(node, childrenName),
      level,
      [parentName]: node[parentName],
    });
  });

  return data;
}
/**
 * @description 把带parentId链结构的平级数组转换成树形结构
 * @param {array} arr 数组
 * @param {string} key 保存关键值的键名
 * @param {string} parentId 指向父记录值的键名
 * @param {string} childrenName 子节点的键名
 */
function makeTree(
  arr,
  key = 'id',
  parentId = 'parentId',
  childrenName = 'children',
) {
  // 检查arr是否数组
  if (!(arr instanceof Array)) {
    console.warn('arr is not Array');
    return [];
  }
  // 检查每一个数据是否对象
  if (arr.find((item) => !isPlainObject(item))) {
    console.warn('some item is not plain object');
    return [];
  }
  // 检查是否存在无id的数据
  if (arr.find((item) => !item[key])) {
    console.warn(`some item without key:${key}`);
    return [];
  }
  // 检查是否存在childrenName字段
  // if (arr.find((item) => Object.prototype.hasOwnProperty.call(item, childrenName))) {
  //   console.warn(`some item with ${childrenName}`);
  //   return [];
  // }
  // 检查是否有重复id
  if (arr.length !== uniqBy(arr, (item) => item[key]).length) {
    console.warn(`duplicate ${key} values exist`);
    return [];
  }
  const flat = cloneDeep(arr);
  const result = [];
  const keyList = uniq(flat.map((item) => item[key]));
  const parentKeyList = uniq(flat.map((item) => item[parentId]));
  const rootIds = parentKeyList.filter((id) => !keyList.includes(id));
  const map = {};
  let node;

  for (let i = 0; i < flat.length; i += 1) {
    map[flat[i][key]] = i;
    flat[i][childrenName] = [];
  }
  for (let i = 0; i < flat.length; i += 1) {
    node = flat[i];
    if (!rootIds.includes(node[parentId])) {
      flat[map[node[parentId]]][childrenName].push(node);
    } else {
      result.push(node);
    }
  }
  return result;
}

/**
 * @description: 根据id从平铺数组中找到它的祖先
 * @param {array} flatArray 平铺数组
 * @param {string} value 用于模糊搜索的关键字的值
 * @param {string} key 保存关键值的键名
 * @param {string} parentId 指向父节点的值
 * @return {array} 新的树形数组
 */
function getAncestors(flatArray, value, key = 'id', parentId = 'parentId') {
  let node = flatArray.find((item) => item[key] === value);
  if (!node) {
    return [];
  }
  const ancestores = [node];
  while (true) {
    node = flatArray.find((item) => item[key] === node[parentId]);
    if (!node) {
      break;
    }
    ancestores.unshift(node);
  }
  return ancestores;
}
/**
 * @description: 搜索树
 * @param {array} flatArray 平铺数组
 * @param {string} value 用于模糊搜索的关键字的值
 * @param {string} field 要搜索的字段，一般是name
 * @param {string} key 保存关键值的键名
 * @param {string} parentId 指向父节点的值
 * @return {array} 新的树形数组
 */
function searchTree(flatArray, value, field = 'name', key = 'id', parentId = 'parentId', childrenName = 'children') {
  const rows = flatArray.filter((item) => item[field].includes(value));
  const allNodes = [];
  rows.forEach((node) => {
    allNodes.push(...getAncestors(flatArray, node[key], key, parentId));
  });
  return makeTree(uniqBy(allNodes, (item) => item.id), key, parentId, childrenName);
}

export default {
  isBasic,
  basicCopy,
  cloneDeep,
  cloneExclude,
  flatten,
  getAncestors,
  makeTree,
  walkTree,
  searchTree,
};
