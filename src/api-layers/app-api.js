/*
 * @Author: aardpro
 * @Date: 2023-03-17 10:19:08
 * @LastEditors: aardpro
 * @LastEditTime: 2023-03-24 22:44:44
 * @Description:
 */
import request from '@/api/interceptor';

import Responser from '@/entities/Responser';
import App from '@/entities/App';

function create(data) {
  return request({ url: '/apps/create', data });
}

function update(data) {
  return request({ url: '/apps/update', data });
}

async function query(data) {
  const res = await request({ url: '/apps/query', data: { ...data, paranoid: false } });
  if (res.errCode) {
    return res;
  }
  const rows = res.data.rows.map((item) => new App(item));
  return new Responser(
    {
      count: res.data.count,
      rows,
    },
    res.errCode,
    res.errMsg,
  );
}

async function count(data) {
  return request({ url: '/apps/count', data: { ...data, paranoid: false } });
}

export default {
  create,
  update,
  query,
  count,
};
