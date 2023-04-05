/*
 * @Author: aardpro
 * @Date: 2023-03-11 11:36:13
 * @LastEditors: aardpro
 * @LastEditTime: 2023-03-11 11:46:02
 * @Description: 路由页面类
 */
class PageItem {
  /**
   * @description: 路由页面类
   * @param {Object} params
   * @param {String} params.path 路由路径
   * @param {Object} params.component 路由的组件文件路径引用，需要通过 ()=>import('')导入
   * @param {String} [params.title] 页面标题
   * @param {String} [params.icon] 图标
   * @param {String} [params.iconActive] 激活图标
   * @param {String} [params.keywords] 关键词
   * @param {String} [params.description] 说明文字
   * @param {Boolean} [params.shouldHide] 是否隐藏
   * @param {Boolean} [params.shoudLogin] 是否需要登录
   */
  constructor(params = { path: '', component: '' }) {
    this.path = params.path;
    this.title = params.title;
    this.icon = params.icon;
    this.iconActive = params.iconActive;
    this.keywords = params.keywords;
    this.description = params.description;
    this.component = params.component;
    this.shouldHide = params.shouldHide;
    this.shoudLogin = params.shoudLogin;
  }
}

export default PageItem;
