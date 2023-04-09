const fs = require('fs');
const path = require('path');
const dirname = path.resolve(__dirname, './myfiles/sub');
async function test() {
  try {
    const data = await fs.promises.stat(dirname);
    console.log(data, '存在');
  } catch (error) {
    console.log(error, '不存在');
  }
}
test();
