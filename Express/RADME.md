[TOC]
# 基础使用

[中文官网](https://express.nodejs.cn/)

```js
const express = require('express');
const app = express(); //创建一个express应用
// app实际是一个函数，用于处理请求的函数

// 监听端口3000
app.listen(3000, () => {
  console.log('监听');
});

// 配置一个请求映射，如果请求方法和请求路径均满足匹配，交给处理函数进行处理
// app.请求方法("请求路径", 处理函数)

app.get('/abc/:id', (req, res) => {
  // req 和 res 是被express封装过后的对象
  // 获取请求信息
  console.log('请求头', req.headers); //获取请求头，对象
  console.log('请求路径', req.path);
  console.log('query', req.query);
  console.log('params', req.params);

  //   响应
  res.send({
    id: 123,
    name: '成哥',
    age: 18,
  });
  //   重定向
  //   res.status(302).header("location", "https://duyi.ke.qq.com").end();
  //   res.status(302).location("https://duyi.ke.qq.com").end();
  //   res.redirect(302, "https://duyi.ke.qq.com");
});

```

# nodemon

https://github.com/remy/nodemon#nodemon

nodemon是一个监视器，用于监控工程中的文件变化，如果发现文件有变化，可以执行一段脚本

```js
// 定义nodemon.json文件
{ 
    "env": { 
        "NODE_ENV": "development" //环境变量
    },
    "watch": [ //监听
        "*.js",
        "*.json"
    ],
    "ignore": [  //忽略文件
        "package*.json",
        "nodemon.json",
        "node_modules",
        "public"
    ]
}
```

# Express中间件

![](/Express/img/中间件示意图.jpg)


- 当匹配到了请求后 : 交给第一个处理函数处理,函数中需要手动的交给后续中间件处理
- 中间件处理的细节 : 如果后续已经没有了中间件,express发现如果响应没有结束,express会响应404
- 如果中间件发生了错误: 不会停止服务器,相当于调用了 next(错误对象),寻找后续的错误处理中间件,如果没有，则响应500

## 常用的中间件

- express.static() ： 映射 public 目录中的静态资源
- express.json() ：  解析  application/json 格式请求体 
- express.urlencoded()  解析 application/x-www-form-urlencoded 格式请求体
