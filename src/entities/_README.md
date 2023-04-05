# 类的定义目录
+ IndexedDb -- 通过localforage管理indexdb缓存
+ NamespaceStorage -- 封装带命名空间前缀的存储方法，避免在同域多个目录的相同应用实例的缓存发生冲突
+ Responser -- 规范带异步操作的函数返回数据格式
+ Entity -- 接口返回数据对象的根类，其它具体对象都是扩展它的子类，如class User extends Entity
  `实力类通过把原始数据进行deepClone后存在于实例的data对象中，而通过getter返回需要使用的字段`