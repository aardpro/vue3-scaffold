/*
 * @Author: aardpro
 * @Date: 2023-03-10 22:14:52
 * @LastEditors: aardpro
 * @LastEditTime: 2023-03-24 22:46:12
 * @Description:
 */
export default {
  'api-start': 'api开始请求',
  'api-end': 'api请求结束',
  'api-warning': 'api警告',
  'api-error': 'api报错(400-600错误)',
  theme: '存储dark/light模式,默认是light',
  toast: '通过@zerodevx/svelte-toast发出自动消失的通知',
  'row-created': '成功创建了记录', // 参数：{name:表的名字如user, [id]:记录id, [data]:{新纪录对象}}
  'row-updated': '成功修改了记录', // 参数：{name:表的名字如user, [id]:记录id, result:true/false 结果}
  'row-destroyed': '成功删除了记录', // 参数：{name:表的名字如user, [id]:记录id, result:true/false 结果}
  'row-restored': '成功恢复了记录', // 参数：{name:表的名字如user, [id]:记录id, result:true/false 结果}
};
