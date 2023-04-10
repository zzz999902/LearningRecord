const fs = require('fs');
const path = require('path');
const dirname = path.resolve(__dirname, './myfiles/1.txt');

const rs = fs.createReadStream(dirname, {
  encoding: 'utf-8',
  highWaterMark: 1,
  autoClose: true, //读完自动关闭 默认为true
});

rs.on('open', () => {
  console.log('文件被打开了');
});

rs.on('error', () => {
  console.log('报错');
});

rs.on('close', () => {
  console.log('文件被关闭了');
});

// 注册data事件后，才会真正开始读取
// 每次读取highWaterMark指定的数量
rs.on('data', (chunk) => {
  console.log(chunk, 'chunk');
  // rs.pause(); //暂停
});

// rs.on('pause', () => {
//   console.log('暂停');
//   rs.resume(); //恢复
// });

// rs.on('resume', () => {
//   console.log('恢复');
// });

rs.on('end', () => {
  console.log('读取完毕');
});
