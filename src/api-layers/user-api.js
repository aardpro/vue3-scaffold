/*
 * @Author: aardpro
 * @Date: 2023-03-17 10:19:08
 * @LastEditors: aardpro
 * @LastEditTime: 2023-04-02 16:45:53
 * @Description:
 */
import request from '@/api/interceptor';

import storage from '@/utils/local-storage';

import Responser from '@/entities/Responser';
import User from '@/entities/User';
import IndexedDB from '@/entities/IndexedDb';

function login(data) {
  return request({ url: '/users/open/login', data });
}

function loginByCode(data) {
  return request({ url: '/users/open/login-by-code', data: { ...data, shouldCheckUser: true } });
}
/**
 * @description: 刷新 token
 * @return {Promise<undefined>}
 */
async function refreshToken() {
  if (!storage.getItem('token')) {
    return;
  }
  const res = await request({ url: '/users/refresh-token' });
  if (!res.errCode) {
    storage.setItem('token', res.data.token);
    storage.setItem('user', res.data.user);
  }
}

function create(data) {
  return request({ url: '/users/create', data });
}

async function row(id) {
  const res = await request({ url: '/users/row', data: { id } });
  if (res.errCode) {
    return res;
  }
  const db = new IndexedDB();
  await db.setItem(res.data, res.data.id);

  return new Responser(
    new User(res.data),
    res.errCode,
    res.errMsg,
  );
}
async function query(data) {
  const res = await request({ url: '/users/query', data: { ...data, paranoid: false } });
  if (res.errCode) {
    return res;
  }
  const rows = res.data.rows.map((item) => new User(item));

  const db = new IndexedDB();
  for (let i = 0; i < res.data.rows.length; i++) {
    const user = res.data.rows[i];
    await db.setItem(user, user.id);
  }
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
  return request({ url: '/users/count', data: { ...data, paranoid: false } });
}

function destroyUser(ids) {
  return request({ url: '/users/destroy', data: { ids } });
}
function restoreUser(ids) {
  return request({ url: '/users/restore', data: { ids } });
}

function updateUser(data) {
  return request({ url: '/users/update-user', data });
}

function updateSelf(data) {
  return request({ url: '/users/update-self', data });
}

export default {
  login,
  loginByCode,
  create,
  row,
  count,
  query,
  refreshToken,
  destroyUser,
  restoreUser,
  updateSelf,
  updateUser,
};
