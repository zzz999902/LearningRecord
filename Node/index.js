const http = require('http');
const URL = require('url');
const path = require('path');
const fs = require('fs');

//静态资源服务器
// http://localhost:9527/index.html  -> public/index.html 文件内容
// http://localhost:9527/css/index.css  -> public/css/index.css 文件内容

/**
 * 得到要处理的文件内容
 */
async function getFliename(url) {
  const urlObj = URL.parse(url);
  let filename; //要处理的文件路径
  filename = path.resolve(__dirname, 'public', urlObj.pathname.substr(1));
  console.log(filename);
}

async function handler(req, res) {
  // console.log(req, res);
  getFliename(req.url);
  res.write('hello!!!');
  res.end();
}

const server = http.createServer(handler);
server.on('listening', () => {
  console.log('server listen 6000');
});

server.listen(6000);
