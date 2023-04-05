
## 缓存处理

## localStorage/sessionStorage
+ 使用带命名空间的$localStorage/$sessionStorage 
+ key值必须在const-data/storage-keys.js定义,否则抛出错误

# 远程数据记录
## 使用indexedDB缓存用户等数据
+ 读取对象数据后，将其保存在indexedDB中
+ 保存格式是
  ```javascript
  {
    key: { // 如果不指定,用自动生产的timeid
      expired_at: 0 // 缓存过期时间，单位是毫秒
      value: {
        id... // 对象的原始数据
      }
    }
  }
  ```
+ 缓存数据一般是用户记录
+ 缓存时间存在于env文件中，建议开发版30分钟，生产版6小时