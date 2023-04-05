/*
 * @Author: aardpro
 * @Date: 2023-04-03 21:35:17
 * @LastEditors: aardpro
 * @LastEditTime: 2023-04-03 23:28:59
 * @Description:  阿里云oss直传拦截器
 */
import axios from 'axios';
import Responser from '@/entities/Responser';

const instance = axios.create({
  timeout: 0,
  method: 'post',
  headers: { 'Content-Type': 'multipart/form-data' },
});
// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    const formData = new FormData();
    Object.entries(config.data).forEach(([key, val]) => {
      formData.append(key, val);
    });
    config.data = formData;
    return config;
  },
  () => false,
);

instance.interceptors.response.use(
  () => new Responser(true),
  (err) => {
    console.error(err);
    let errMsg;
    if (err.response && err.response.data) {
      errMsg = err.response.data.errMsg;
    } else if (err.message) {
      errMsg = err.message;
    }
    return new Responser(null, -1, errMsg);
  },
);

export default async function request(options) {
  const result = await instance.request(options);
  return result;
}
