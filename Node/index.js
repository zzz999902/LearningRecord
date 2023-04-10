const fs = require('fs');
const path = require('path');

async function mothod1() {
  const dirname = path.resolve(__dirname, './myfiles/1.txt');
  const to = path.resolve(__dirname, './myfiles/2.txt');
  console.time('1');
  const content = await fs.promises.readFile(dirname);
  await fs.promises.writeFile(to, content);
  console.timeEnd('1');
  console.log('ok');
}
// mothod1();
async function mothod2() {
  const dirname = path.resolve(__dirname, './myfiles/1.txt');
  const to = path.resolve(__dirname, './myfiles/2.txt');
  console.time('方式2');
  const rs = fs.createReadStream(dirname); //读
  const ws = fs.createWriteStream(dirname); //写

  rs.pipe(ws);

  // 读完了
  rs.on('close', () => {
    ws.end(); //停止写入
    console.timeEnd('方式2');
  });
}
mothod2();
