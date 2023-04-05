# 提交格式的规范
+ [参考文章](https://zhuanlan.zhihu.com/p/182553920)
## 提交的格式为：
```
<type>(<scope>): <subject>
即：
类型(范围):空格 标题
如：
feat(视图): 开发项目管理入口
或者：
fix: 登录页报错
```

## 类型type(必须)
  用于说明git commit的类别，只允许使用下面的标识。
+ feat：新功能（feature）。
+ fix：修复bug。
+ docs：文档（documentation）。
+ style：格式（不影响代码运行的变动）。
+ refactor：重构（即不是新增功能，也不是修改bug的代码变动）。
+ perf：优化相关，比如提升性能、体验。
+ test：增加测试。
+ build：构建流程、外部依赖变更 (如升级 npm 包、修改打包配置等)。
+ ci：修改 CI 配置、脚本。
+ revert：回滚到上一个版本。
+ chore：构建过程或辅助工具的变动。
+ wip：正在开发中。
+ workflow：工作流程改进。
+ types：类型定义文件修改。

## scope(可选)
+ scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。
+ 例如在Angular，可以是location，browser，compile，compile，rootScope， ngHref，ngClick，ngView等。如果你的修改影响了不止一个scope，你可以使用*代替。

## subject(必须)
+ subject是commit目的的简短描述，不超过50个字符。
+ 结尾不加句号或其他标点符号。 