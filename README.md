# getApps

## 功能
获取某个公司正在使用的SaaS产品。

## 用法

```
$ npm install getapps

var getApps =  require('getapps').getApps;
var domain = 'mulumu.com';

// 输入一个公司的域名
getApps(domain)
.then(function(apps){
  console.log('domain use ', apps);
})

```

或 CLI

```
npm install -g getapps

# 公司域名作为参数
$ getapps mulumu.com
```


## 获取原理

1. Domain 服务商
2. 邮件服务解析
3. 服务器IP地址
4. 首页的网页分析

## TODO
1. 持续丰富规则库。
2. 添加网页的深度抓取。
3. 网页运行JS后再解析。

欢迎PR提交更多规则。