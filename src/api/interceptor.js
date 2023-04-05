/* eslint-disable no-param-reassign */
/*
 * @Date: 2022-01-31 16:51:21
 * @LastEditors: aardpro
 * @LastEditTime: 2023-03-26 19:11:32
 * @Description: 拦截器
 */
import axios from 'axios';
import Responser from '@/entities/Responser';
import PubsubHelper from '@/utils/pubsub-helper';
import storage from '@/utils/local-storage';
import { sleep } from '@/utils';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASEURL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    PubsubHelper.publish('api-start', config);
    config.headers.Authorization = storage.getItem('token');
    return config;
  },
  (err) => {
    PubsubHelper.publish('api-end');
    PubsubHelper.publish('api-error', err.message);
    return false;
  },
);

instance.interceptors.response.use(
  (response) => {
    PubsubHelper.publish('api-end');
    if (!response.data) {
      return new Responser(null, -1);
    }
    if (response.data.errCode !== 0) {
      PubsubHelper.publish('api-warning', response.data.errMsg);
    }
    const { data, errCode, errMsg } = response.data;
    return new Responser(data, errCode, errMsg);
  },
  async (err) => {
    PubsubHelper.publish('api-end');
    let msg;
    if (err.response && err.response.data) {
      msg = err.response.data.errMsg;
    } else if (err.message) {
      msg = err.message;
    }
    PubsubHelper.publish('api-error', msg);

    if (err.response.status === 401) {
      storage.removeItem('token');
      window.location.reload();
      await sleep();
    }

    return new Responser(null, err.response.status, msg);
  },
);

export default function request(options) {
  return instance.request(options);
}
