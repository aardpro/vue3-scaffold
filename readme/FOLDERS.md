## 目录布局规范

-src  
|--api 接口、拦截器的定义  
|--api-layers 接口中间层  
|--assets 样式、图片等资源文件  
|--components 可以复用、但是跟业务相关度比较大的组件  
|--configs 配置型的常量
|--const-data 记录型的常量
|--entities 实体对象
|--helpers 工具函数  
|--pages 页面组件，以及它们的非通用组件  
|--plugins 插件函数，一般用于打包功能
|--routes 路由  
|--stores 状态管理  
|--svg-icons svg图标文件管理    
|--widgets 跟业务无关的通用组件（比components组件更加抽象）  
|--App.vue 根vue文件
|--main.js  
-public
.env
.env.development
.eslintrc.cjs
.gitignore
commitlint.config.js
index.html
jsconfig.json
package.json  
postcss.config.cjs  
tailwind.config.cjs  
vite.config.js
