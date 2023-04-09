# Node概述

## 我们通常用node干什么

### 开发桌面端应用程序(很少)

### 开发服务端应用程序

#### 结构1

- 这种结构通常应用在微型的站点上
- 这种一般出现在个人博客,或者较小的公司官网
- Node服务器要完成请求的处理、响应、和数据库交互、各种业务逻辑
- 前端可以直接写不需要后端

![](/Node/img/9e063240e54e99e37e2ec6331a06ce4fa96c15ec24cb49b012d6231c858828cb.png)

#### 结构2

- 这种结构公司非常常见，应用在各种规模的站点上
- 可以处理或者记录一些轻量的数据的,主要的数据给后端处理
- 为什么中间件要用node，后端也可以写这种中间件
- 因为node的强项是吞吐量，可以接受大量的请求，它用的异步的模式，没有进程的开销
- Node服务器不做任何与业务逻辑有关的事情。绝大部分时候，只是简单的转发请求。但可能会有一些额外的功能（简单信息记录，静态资源管理，缓存）

![](/Node/img/50f55a93d5224c1681eb0fcc671e6af004d0b28b8125a937a2d89c7dce17ed8b.png)

# 全局对象（global）
## setTimeout

## setInterval

## setImmediate

类似于 setTimeout 0

## console

## Buffer

- 类型化数组,继承自 UInt8Array
- 计算机中存储的基本单位：字节
- 使用时,输出时可能需要用十六进制表示
## process

- cwd() 
    - 返回当前nodejs进程的工作目录(绝对路径)
- exit()
    - 强制退出当前node进程
    - 可传入退出码，0表示成功退出，默认为0
- argv
    - 获取命令中的所有参数
- platform
    - 获取当前的操作系统
- kill(pid)
    - 根据进程ID杀死进程
- env
    - 获取环境变量对象

## __dirname（并非global属性）

获取当前模块所在的目录

## __filename（并非global属性）

获取当前模块的文件路径

# 模块化

module对象 记录当前模块的信息

require.resolve(路径) 会根据相对路径转成绝对路径
当执行一个模块或使用require时，会将模块放置在一个函数环境中

模块要么是commonjs，要么是ES

# 常用基本内置模块

## os

- cpus()：获取cpu每个核的信息
- tmpdir()：获取主机名

## path

1. basename
```js
path.basename('/foo/bar/baz/asdf/quux.html');
// 返回最后的文件: 'quux.html'
```

2. dirname
```js
path.dirname('/foo/bar/baz/asdf/quux');
// 返回目录: '/foo/bar/baz/asdf'
```

3. extname
```js
path.extname('index.html');
// 返回后缀: '.html'
```

4. join
```js
path.join('a', 'b', 'c', 'd.js');
// 返回: '/a/b/c/d.js'

path.join('a', 'b', '../', 'd.js');
// 返回: '/a/d.js'
```

5. resolve
path.resolve() 方法将路径或路径片段的序列解析为绝对路径
```js
path.resolve(__dirname, './baz');
// 返回当前模块的绝对路径

path.resolve('/foo/bar', './baz');
// 返回: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// 返回: '/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// 如果当前工作目录是 /home/myself/node，
// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
```

6. relative
path.relative() 方法根据当前工作目录返回从 from 到 to 的相对路径。 如果 from 和 to 都解析为相同的路径（在分别调用 path.resolve() 之后），则返回零长度字符串。
```js
path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
// 返回: '../../impl/bbb'
```

## url

```js
const URL = require('url');
const obj = {
  href: 'https://nodejs.org:80/a/b/c?t=3&u=5#abc',
  origin: 'https://nodejs.org:80',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'nodejs.org:80',
  hostname: 'nodejs.org',
  port: '80',
  pathname: '/a/b/c',
  search: '?t=3&u=5',
  hash: '#abc',
};
const url = URL.format(obj);// 将对象转换成字符串
console.log(url);
// 输出：https://nodejs.org:80/a/b/c?t=3&u=5#abc
```

## util

https://nodejs.cn/api/util.html

1. isDeepStrictEqual：如果 val1 和 val2 之间存在深度严格相等，则返回 true。 否则，返回 false。
2. promisify
```js
// 将一个回调模式转换成一个异步模式
function delayCallBack(duration, callback) {
  setTimeout(() => {
    callback(null, duration);
  }, duration);
}

const delay = util.promisify(delayCallBack);
delay().then(d=>console.log(d))
// and
const data = await delay()
console.log(data)
```

# fs 文件流IO

1. 凡是对外部设备的输入输出都是IO
2. IO的速度往往低于内存和CPU的交互速度
3. 外部设备：磁盘（硬盘），网卡，显卡，打印机，其他

下面操作的文件目录结构：![](/Node/img/微信截图_20230409205044.png)
## readFile(读文件)

```js
const fs = require("fs");
const path = require("path");
const filename = path.resolve(__dirname, "./myfiles/1.txt");

// 第一种方法
fs.readFile(filename, "utf-8", (err, content) => {
  console.log(content);
});

// 第二种方法
async function test() {
  const content = await fs.promises.readFile(filename, "utf-8");
  console.log(content);
}
test();

// 第三种方法
// Sync函数是同步的，会导致JS运行阻塞，极其影响性能
// 通常，在程序启动时运行有限的次数即可
const content = fs.readFileSync(filename, "utf-8");
console.log(content);
```

## writeFile(写入文件)
```js
const fs = require("fs");
const path = require("path");
const filename = path.resolve(__dirname, "./myfiles/2.txt");

async function test() {
  await fs.promises.writeFile(filename, "阿斯顿发发放到发", {
    flag: "a" //类型a为追加内容类型 阿斯顿发发放到发才是追加的内容
  });
//   buffer也能识别
//   const buffer = Buffer.from("abcde", "utf-8");
//   await fs.promises.writeFile(filename, buffer);
  console.log("写入成功");
}
test();
```
## stat(获取文件或目录信息)

```js
const fs = require('fs');
const path = require('path');
const fileName = path.resolve(__dirname, './myfiles/1.jpeg');

async function test() {
  const date = await fs.promises.stat(fileName);
  console.log('状态信息', date);
}
test();

打印: Stats {
  dev: 3055156246,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: 4096,
  ino: 1407374883721736,
  size: 13305,
  blocks: 32,
  atimeMs: 1681043948079.0984,
  mtimeMs: 1632029772000,
  ctimeMs: 1640577339553.3872,
  birthtimeMs: 1681030641686.3047,
  atime: 2023-04-09T12:39:08.079Z,
  mtime: 2021-09-19T05:36:12.000Z,
  ctime: 2021-12-27T03:55:39.553Z,
  birthtime: 2023-04-09T08:57:21.686Z
}
```
![](/Node/img/微信截图_20230409204223.png)

## readdir(获取目录中的文件和子目录)

```js
const fs = require("fs");
const path = require("path");
const dirname = path.resolve(__dirname, "./myfiles/");
async function test() {
  const pathes = await fs.promises.readdir(dirname);
  console.log(pathes);
}
test();
打印:[ '1', '1.jpeg', '1.txt', '2.jpeg', '3.jpeg', 'sub' ]
```
## mkdir(创建目录)
```js
const fs = require("fs");
const path = require("path");
const dirname = path.resolve(__dirname, "./myfiles/sub/2");
async function test() {
  await fs.promises.mkdir(dirname);
  console.log("创建目录成功",dirname);
}
test();
```

## stat(判断文件或目录是否存在)
```js
const fs = require('fs');
const path = require('path');
const dirname = path.resolve(__dirname, './myfiles/sub/6.txt');
async function test() {
  try {
    const data = await fs.promises.stat(dirname);
    console.log(data, '存在,拿到状态');
  } catch (error) {
    console.log(error, '不存在,拿不到状态');
  }
}
test();
```