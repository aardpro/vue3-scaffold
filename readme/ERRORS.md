
## 报错处理
## api报错
- 拦截器直接catch到error,返回封装类 Responser
- 当拦截到 400，直接toast 报警，并且把错误信息放入store的 errMsg
- 当拦截到 500，直接toast 报错，并且把错误信息放入store的 errMsg

