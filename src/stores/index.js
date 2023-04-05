/*
 * @Author: aardpro
 * @Date: 2022-06-19 00:07:08
 * @LastEditors: aardpro
 * @LastEditTime: 2023-04-03 23:13:47
 * @Description: store
 */
import { defineStore } from 'pinia';

export default defineStore('main', {
  state: () => ({
    token: '',
    user: {},
  }),
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ['token', 'userId'] }],
  },
  getters: {
    getToken: (state) => state.token,
    getUserId: (state) => state.userId,
  },
  actions: {
    setToken(val) {
      this.token = val;
    },
    setUser(val) {
      this.user = val;
    },
  },
});
