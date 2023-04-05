/*
 * @Author: aardpro
 * @Date: 2023-03-17 10:19:08
 * @LastEditors: aardpro
 * @LastEditTime: 2023-04-01 14:05:37
 * @Description: 团队接口
 */
import request from '@/api/interceptor';

import Responser from '@/entities/Responser';
import Team from '@/entities/Team';
import User from '@/entities/User';

function create(data) {
  return request({ url: '/teams/create', data });
}

async function query(data) {
  const res = await request({ url: '/teams/query', data: { ...data, paranoid: false } });
  if (res.errCode) {
    return res;
  }
  const rows = res.data.rows.map((item) => new Team(item));
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
  return request({ url: '/teams/count', data: { ...data, paranoid: false } });
}

function destroy(ids) {
  return request({ url: '/teams/destroy', data: { ids } });
}
function restore(ids) {
  return request({ url: '/teams/restore', data: { ids } });
}

function update(data) {
  return request({ url: '/teams/update', data });
}

/**
 * @description: 根据团队id获取详情
 * @param {String} tid
 * @return {Promise<Responser>}
 */
function detailRow(tid) {
  return request({ url: '/teams/detail-row', data: { tid } });
}

/**
 * @description: 保存团队详情
 * @param {Object} data
 * @param {String} data.tid team记录的id
 * @param {Object} data.detail team记录的详情是一个对象
 * @return {Promise<Responser>}
 */
function SaveDetail(data) {
  return request({ url: '/teams/save-detail', data });
}

async function teamRowUsers(id) {
  const res = await request({ url: '/teams/row/users', data: { id } });
  if (res.errCode) {
    return res;
  }
  const rows = res.data.map((item) => new User(item));
  return new Responser(
    rows,
    res.errCode,
    res.errMsg,
  );
}

async function teamTreeUsers(id) {
  const res = await request({ url: '/teams/tree/users', data: { id } });
  if (res.errCode) {
    return res;
  }
  const rows = res.data.map((item) => new User(item));
  return new Responser(
    rows,
    res.errCode,
    res.errMsg,
  );
}
function teamLinkUsers(id, userIds) {
  return request({ url: '/teams/link/users', data: { id, userIds } });
}
function teamUnlinkUsers(id, userIds) {
  return request({ url: '/teams/unlink/users', data: { id, userIds } });
}

export default {
  detailRow,
  SaveDetail,
  create,
  count,
  query,
  destroy,
  restore,
  update,
  teamRowUsers,
  teamTreeUsers,
  teamLinkUsers,
  teamUnlinkUsers,
};
