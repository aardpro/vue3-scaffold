/*
 * @Author: aardpro
 * @Date: 2022-08-18 22:57:45
 * @LastEditTime: 2023-03-04 22:04:11
 * @LastEditors: aardpro
 * @Description: Responser类
 */

/**
 * @apiDefine Responser
 * @apiSuccessExample {json} Responser
 *     {
 *       "errCode": 0, // errCode: 0，无报错; -1/401/500/...， 有报错
 *       "errMsg": "" // 报错信息
 *       "data": "any" // 数据负载，可以是任何格式
 *     }
 */
/**
 * @api {CLASS} Responser Responser
 * @apiGroup Entity
 * @apiUse Responser
 * @apiSampleRequest off
 */
/**
 * @description: 应答对象
 * @param {any} data 值
 * @param {Number} errCode 错误值。0：无错误；其它：错误代码;401：权限验证错误；500：系统级别错误
 * @param {String} errMsg 错误信息
 * @return {Responser} { data:any, errCode:0, errMsg:'' }
*/
class Responser {
  constructor(data, errCode = 0, errMsg = '') {
    this.data = data;
    this.errCode = errCode;
    this.errMsg = errMsg;
  }
}

export default Responser;
