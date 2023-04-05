/*
 * @Author: aardpro
 * @Date: 2023-03-17 10:19:08
 * @LastEditors: aardpro
 * @LastEditTime: 2023-03-28 22:10:59
 * @Description: 文档相关api
 */
import request from '@/api/interceptor';
import aliyunRequest from '@/api/aliyun-interceptor';
import Responser from '@/entities/Responser';

/**
 * @description: 获取公用文件的上传凭证
 * @param {Object} data
 * @param {String} data.name 如1.txt
 * @param {Number} data.size 如1024
 * @return {Response}
 */
function publicUploadPolicy(data) {
  return request({ url: '/oss/file/public/upload-policy', data });
}

async function uploadAvatar(data, file) {
  const policyData = {
    ...data,
    size: file.size,
  };
  const ossRes = await request({ url: '/oss/file/public/upload-policy', data: policyData });
  if (ossRes.errCode) {
    return ossRes;
  }

  const url = `https${ossRes.data.url}`;
  const uploadRes = await aliyunRequest({
    url,
    data: { ...ossRes.data.policy, file },
  });
  if (uploadRes.errCode) {
    return uploadRes;
  }
  return new Responser(`${url}/${data.key}`);
}

export default {
  publicUploadPolicy,
  uploadAvatar,
};
