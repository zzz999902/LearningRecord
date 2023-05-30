const express = require('express');
const app = express(); //创建一个express应用

app.listen(3000, () => {
  console.log(`server listen on 3000`);
});

app.get(
  '/news',
  (req, res, next) => {
    next(new Error('abc'));
  },
  require('./errorMiddleware')
);

app.get('/news', (req, res, next) => {
  console.log('header3');
  next();
});
