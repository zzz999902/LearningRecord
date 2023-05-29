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