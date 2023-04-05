# 文件、文件夹命名规范
- kebab-case 命名，如my-page.vue

# 变量命名规范
- 全局常量用大写kebab-case如CONST_NAMES
- 模块文件导出用pascal-case如ConstData
- 多个单词组成的变量用Camel-case,如teamLeadUserId
- 单个单词组成的变量用lowercase，如name
- 数组变量
  + 元素是基本变量的，camel-case+s,如userIds
  + 元素是对象的，camel-case加list,如teamUserList


## 引入模块的顺序规范

 1. 跟框架最接近的package模块，如 import { onMounted } from 'vue'
 2. 其它package模块，如 import uniq from 'lodash/uniq'
 3. 组件对象, 如 import Confirm from "@/widgets/Confirm.vue";
 4. entity
 5. 工具函数
 6. api，中间层
 7. css，图片等资源文件
 8. 组件内变量
 9. 组件内函数
