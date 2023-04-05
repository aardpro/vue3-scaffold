/*
 * @Date: 2022-03-26 23:00:38
 * @LastEditors: aardpro
 * @LastEditTime: 2023-03-20 21:52:36
 * @Description: 使用pubsub模块
 const tokens = [] // 订阅token列表
 PubsubHelper.publish('topic', payload); // 发布消息
 PubsubHelper.subscribe(tokens,'topic', callback); // 订阅消息，把实例存在tokens列表
 PubsubHelper.unsubscribe(tokens); // 取消tokens列表的订阅，并把tokens清空
 PubsubHelper.clearAllSubscriptions(); // 取消全部订阅
 */
import PubSub from 'pubsub-js';

import PubsubNames from '@/const-data/pubsub-topics';

// 检查key值是否在storage-names中定义（不允许使用未预先定义的存储值）
function validateTopic(topic) {
  if (!Object.prototype.hasOwnProperty.call(PubsubNames, topic)) {
    throw new Error(`"${topic}" undefined in pubsub-names`);
  }
}
/**
 * @description: 发布消息
 * @param {String} topic 订阅主题。形式为：on-do-something（如on-click-gantt-table-row），on-something-status（如on-bim-ready）
 * @param {any} payload 负载
 * @return {void}
 */
function publish(topic, payload) {
  validateTopic(topic);
  // console.log('publish - ', topic)
  PubSub.publish(topic, payload);
}
/**
 * @description: 订阅消息
 * @param {Array} tokens 订阅列表
 * @param {String} topic 如on-click-row
 * @param {Function} callback 回调函数
 * @return {void}
 */
function subscribe(tokens, topic, callback) {
  validateTopic(topic);
  if (typeof callback === 'function') {
    tokens.push(PubSub.subscribe(topic, (_, payload) => callback(payload)));
  }
}
/**
 * @description: 销毁订阅
 * @param {Array} tokens 订阅列表
 * @return {void}
 */
function unsubscribe(tokens) {
  tokens.forEach((token) => {
    PubSub.unsubscribe(token);
  });
  tokens.length = 0;
}

// all subscriptions are removed
function clearAllSubscriptions() {
  return PubSub.clearAllSubscriptions();
}

export default {
  subscribe,
  publish,
  unsubscribe,
  clearAllSubscriptions,
};
