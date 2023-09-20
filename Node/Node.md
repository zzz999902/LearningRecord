[TOC]
# Node概述


## NodeJS组成原理
![](http://mdrs.yuanjin.tech/img/node组成原理图.jpg)

1. 用户代码

JS代码，开发者编写的



2. 第三方库

大部分仍然是JS代码，由其他开发者编写



3. 本地模块代码

JS代码



4. V8引擎

c/c++代码，作用：把JS代码解释成为机器码

可以通过v8引擎的某种机制，扩展其功能



V8引擎的扩展和对扩展的编译，是通过一个工具：gyp工具

某些第三方库需要使用`node-gyp`工具进行构建，因此需要先安装`node-gyp`
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

# 文件IO

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

## unlink(删除文件)

```js
const fs = require('fs');
const path = require('path');
const dirname = path.resolve(__dirname, './myfiles/3.jpeg');

fs.promises.unlink(dirname);
```

# 流

流是指数据的流动，数据从一个地方缓缓的流动到另一个地方

![](/Node/img/b72468dcc9cb82fb6ddc5acdd22dfeeb9646629179ba26e818a446d267693a43.png)

流是有方向的：

     1. 可读流（Readable）：数据从源头流向内存
     2. 可写流（Writable）：数据从内存流向源头
     3. 双工流（Duplex）：数据即可从源头流向内存,又可从内存流向源头

## 为什么需要流

1. 其他介质和内存的数据规模不一致


![](/Node/img/2.png)

2. 其他介质和内存的数据处理能力不一致

![](/Node/img/1.png)

## 文件流（可读流）

**createReadStream**

内存数据和磁盘文件数据之间的流动

**文件流的创建**

https://nodejs.cn/api-v18/fs.html#fscreatereadstreampath-options

配置
![](/Node/img/3.png)

返回
![](/Node/img/4.png)

```js
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
  rs.pause(); //暂停
});

rs.on('pause', () => {
  console.log('暂停');
  rs.resume(); //恢复
});

rs.on('resume', () => {
  console.log('恢复');
});

rs.on('end', () => {
  console.log('读取完毕');
});

```

## 文件流（可写流）

**createWriteStream**

配置
![img](/Node/img/5.png)

返回
![img](/Node/img/6.png)

代码详细
```js
const fs = require('fs');
const path = require('path');
const dirname = path.resolve(__dirname, './myfiles/1.txt');

const ws = fs.createWriteStream(dirname, {
  flags: 'a',
  encoding: 'utf-8',
  highWaterMark: 3,
  autoClose: true,
});
// highWaterMark 对应你写入的数据  超出了就会返回false
const flag = ws.write('你你你');

console.log(flag,'返回值👇');

```
![img](/Node/img/7.png)

复制一个文件数据到另一个地方
```js
// 第一种方式
async function mothod2() {
  const dirname = path.resolve(__dirname, './myfiles/1.txt');
  const to = path.resolve(__dirname, './myfiles/2.txt');
  console.time('1');
  const rs = fs.createReadStream(dirname);//读
  const ws = fs.createWriteStream(dirname);//写
  rs.on('data', (chunk) => {
    // 读一部分
    const flag = ws.write(chunk); //写一部分
    if (!flag) {
      // 产生背压 暂停
      rs.pause();
    }
  });
  ws.on('drain', () => {
    // 背压空了 恢复
    rs.resume();
  });

  // 读完了
  rs.on('end', () => {
    ws.end();//停止写入
    console.timeEnd('1');
    console.log('ok');
  });
}
mothod2();
// 第二种方式
async function mothod2() {
  const dirname = path.resolve(__dirname, './myfiles/1.txt');
  const to = path.resolve(__dirname, './myfiles/2.txt');
  console.time('方式2');
  const rs = fs.createReadStream(dirname); //读
  const ws = fs.createWriteStream(dirname); //写

  // 连接es和ws 省略第一种方式的多余代码 有pipe来做
  rs.pipe(ws);

  // 读完了
  rs.on('close', () => {
    ws.end(); //停止写入
    console.timeEnd('方式2');
  });
}
mothod2();
执行时间不代表一切
大文件一定要使用流,不然内存受不了
```
![img](/Node/img/8.png)

# net模块（网络）

## 回顾一下http请求
1. 普通模式
![img](/Node/img/9.png)
2. 长连接模式
![img](/Node/img/10.png)

## net能干什么

net是一个**通信模块**，利用它可以实现

         1. 进程间的通信 IPC
         2. 网络通信 TCP/IP
## 创建客户端
![img](/Node/img/12.png)
```js
const net = require('net');

const socket = net.createConnection(
  {
    host: 'duyi.ke.qq.com',
    port: 80,
  },
  () => {
    console.log('连接成功');
  }
);

socket.on('data', (chunk) => {
  console.log('服务器消息', chunk.toString('utf-8'));
  socket.end();
});

socket.write(`GET / HTTP/1.1
Host: duyi.ke.qq.com
Connection: keep-alive

`);

socket.on('close', () => {
  console.log('结束了！');
});

```
## 创建服务器
![img](/Node/img/13.png)
![img](/Node/img/14.png)
```js
const net = require('net');
const server = net.createServer();
const fs = require('fs');
const path = require('path');

server.listen(9527); // 服务器监听9527端口

server.on('listening', () => {
  console.log('server listen 9527');
});

server.on('connection', (socket) => {
  console.log('有客户端连接到服务器');

  socket.on('data', async (chunk) => {
    // console.log(chunk.toString("utf-8"));
    // 服务器写入
    const filename = path.resolve(__dirname, './hsq.jpg');
    const bodyBuffer = await fs.promises.readFile(filename);
    const headBuffer = Buffer.from(
      `HTTP/1.1 200 OK
Content-Type: image/jpeg

`,
      'utf-8'
    );
    const result = Buffer.concat([headBuffer, bodyBuffer]);
    socket.write(result);
    socket.end();
  });

  socket.on('end', () => {
    console.log('连接关闭了');
  });
});

```
![img](/Node/img/15.png)

# http模块

**net太麻烦 不会直接使用他的 常见的是直接使用http模块**

![img](/Node/img/16.png)

https://nodejs.cn/api/http.html#httprequestoptions-callback


## request(发送请求)
```js
const http = require('http');

const request = http.request(
  'http://yuanjin.tech:5005/api/movie',
  {
    method: 'GET',
  },
  (resp) => {
    console.log('服务器响应的状态码', resp.statusCode);
    console.log('服务器响应头', resp.headers);
    let result = '';
    resp.on('data', (chunk) => {
      result += chunk.toString('utf-8');
    });

    resp.on('end', (chunk) => {
      console.log(JSON.parse(result));
    });
  }
);

request.end(); //表示消息体结束

```

## createServer（接受请求）

https://nodejs.cn/api/http.html#httpcreateserveroptions-requestlistener

req = IncomingMessage
res = ServerResponse

```js
const http = require('http');

// 创建本地服务器来从其接收数据
// req = IncomingMessage
// res = ServerResponse
const server = http.createServer((req, res) => {
  console.log(req.url, '请求来了');
});

server.listen(9527);

server.on('listening', () => {
  console.log('监听');
});

```

# hppts协议

https保证数据在传输过程中不被窃取和篡改，从而保证**传输安全**

https证书免费流程,具体流程上网查一下把
![img](/Node/img/18.png)

# node生命周期

## node事件循环（面试题爱问）

![img](/Node/img/19.png)

## timers：存放计时器的回调函数
## poll：轮询队列

1. 除了timers、checks
1. 绝大部分的回调都会放入该队列
1. 比如：文件读取、监听用户请求
1. 运作方式
       - 如果poll中有回调、依次执行回调、直到清空队列
       - 如果poll中没有回调👇
       - 1.等待其他队列中出现回调，结束该阶段，进入下一阶段。
       - 2.如果其他队列也没有回调，持续等待，直到出现回调为止

## check:检查阶段

check：检查阶段 **会使用setImmediate的回调会直接进入这个队列** 
 
## 事件循环中，每次打算执行一个回调之前，必须要先清空nextTick然后是promise队列

```js
// 面试题 练习题
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(function() {
  console.log("setTimeout0");
}, 0);
setTimeout(function() {
  console.log("setTimeout3");
}, 3);
setImmediate(() => console.log("setImmediate"));
process.nextTick(() => console.log("nextTick"));
async1();
new Promise(function(resolve) {
  console.log("promise1");
  resolve();
  console.log("promise2");
}).then(function() {
  console.log("promise3");
});
console.log("script end");


timers: setTimeout0 setTimeout3
check: setImmediate
process.nextTick: nextTick
Promise: console.log("async1 end"); promise3

console.log("script start");
console.log("async1 start");
console.log("async2");
console.log("promise1");
console.log("promise2");
console.log("script end");
nextTick
console.log("async1 end");
promise3

setTimeout0
setTimeout3 
setImmediate
// 后面这三个顺序不一定谁在谁的地方上  看程序的卡顿时间了
```

# EventEmitter

自定义事件
```js
const { EventEmitter } = require("events");
// 创建一个事件处理对象
// 可以注册事件，可以触发事件
const ee = new EventEmitter();

ee.on("abc", () => {
  console.log("abc事件触发了1");
});
const fn2 = () => {
  console.log("abc事件触发了2");
}
ee.on("abc", fn2);

ee.once("abc", () => {
  console.log("abc事件触发了3", "该事件只触发一次");
});

ee.on("bcd", () => {
  console.log("bcd事件触发了3");
});

ee.emit("abc"); //触发名为abc的事件，会依次运行注册的事件函数
ee.off("abc", fn2)
ee.emit("abc"); //触发名为abc的事件，会依次运行注册的事件函数
ee.emit("abc"); //触发名为abc的事件，会依次运行注册的事件函数
ee.emit("bcd"); //触发名为bcd的事件，会依次运行注册的事件函数

console.log("script end")
```

# websocket

专门用于解决实时传输的问题

1. 客户端连接服务器（TCP / IP），三次握手，建立了连接通道
2. 客户端发送一个http格式的消息（特殊格式），服务器也响应一个http格式的消息（特殊格式），称之为http握手
3. 双发自由通信，通信格式按照websocket的要求进行
4. 客户端或服务器断开，通道销毁

# CSRF 特点和原理

CSRF：Cross Site Request Forgery，跨站请求伪造

本质是：恶意网站把**正常用户**作为**媒介**，通过模拟正常用户的操作，攻击其**登录过**的站点。

<img src="http://mdrs.yuanjin.tech/img/image-20200508122744169.png" alt="image-20200508122744169" style="zoom:50%;" />

它的原理如下：

1. 用户访问正常站点，登录后，获取到了正常站点的令牌，以cookie的形式保存

<img src="http://mdrs.yuanjin.tech/img/image-20200508123116104.png" alt="image-20200508123116104" style="zoom:50%;" />

2. 用户访问恶意站点，恶意站点通过某种形式去请求了正常站点（请求伪造），迫使正常用户把令牌传递到正常站点，完成攻击

<img src="http://mdrs.yuanjin.tech/img/image-20200508123401591.png" alt="image-20200508123401591" style="zoom:50%;" />

## 防御

### cookie的SameSite

现在很多浏览器都支持**禁止跨域附带的cookie**，只需要把cookie设置的`SameSite`设置为`Strict`即可

`SameSite`有以下取值：

- Strict：严格，所有跨站请求都不附带cookie，有时会导致用户体验不好
- Lax：宽松，所有跨站的超链接、GET请求的表单、预加载连接时会发送cookie，其他情况不发送
- None：无限制

这种方法非常简单，极其有效，但前提条件是：用户不能使用太旧的浏览器

### 验证referer和Origin

页面中的二次请求都会附带referer或Origin请求头，向服务器表示该请求来自于哪个源或页面，服务器可以通过这个头进行验证

但某些浏览器的referer是可以被用户禁止的，尽管这种情况极少

### 使用非cookie令牌

这种做法是要求每次请求需要在请求体或请求头中附带token



请求的时候：authorization: token



### 验证码

这种做法是要求每个要防止CSRF的请求都必须要附带验证码

不好的地方是容易把正常的用户逼疯

### 表单随机数

这种做法是服务端渲染时，生成一个随机数，客户端提交时要提交这个随机数，然后服务器端进行对比

该随机数是一次性的



流程：

1. 客户端请求服务器，请求添加学生的页面，传递cookie
2. 服务器
   1. 生成一个随机数，放到session中
   2. 生成页面时，表单中加入一个隐藏的表单域`<input type="hidden" name="hash" value="<%=session['key'] %>">`
3. 填写好信息后，提交表单，会自动提交隐藏的随机数
4. 服务器
   1. 先拿到cookie，判断是否登录过
   2. 对比提交过来的随机数和之前的随机数是否一致
   3. 清除掉session中的随机数



### 二次验证

当做出敏感操作时，进行二次验证

# XSS攻击和防御

XSS：Cross Site Scripting 跨站脚本攻击



## 存储型XSS

1. 恶意用户提交了恶意内容到服务器
2. 服务器没有识别，保存了恶意内容到数据库



1. 正常用户访问服务器
2. 服务器在不知情的情况下，给予了之前的恶意内容，让正常用户遭到攻击



## 反射型

1. 恶意用户分享了一个正常网站的链接，链接中带有恶意内容
2. 正常用户点击了该链接
3. 服务器在不知情的情况，把链接的恶意内容读取了出来，放进了页面中，让正常用户遭到攻击



## DOM型

1. 恶意用户通过任何方式，向服务器中注入了一些dom元素，从而影响了服务器的dom结构
2. 普通用户访问时，运行的是服务器的正常js代码


# 进程和线程
## 进程

一个应用程序，总是通过操作系统启动的，当操作系统启动一个应用程序时，会给其分配一个进程

一个进程拥有**独立的、可伸缩的**内存空间，原则上不受其他进程干扰

进程之间是可以通信的，只要两个进程双方遵守一定的协议，比如ipc

**CPU在不同的进程之间切换执行**



虽然一个应用程序在启动时只有一个进程，但它在运行的过程中，可以开启新的进程，进程之间仍然保持相对独立

如果一个进程是直接由操作系统开启，则它叫做主进程

如果一个进程B是由进程A开启，则A是B的父进程，B是A的子进程，子进程会继承父进程的一些信息，但仍然保持相对独立



```js
// nodejs 中开启子进程
const childProcess = require("child_process"); // 导入内置模块

childProcess.exec(在子进程运行的命令, (err, out, stdErr) => {
  // 回调函数中可以获取子进程的标准输出，这种数据交互是通过IPC完成的，nodejs已经帮你完成了处理
  // err：开启进程过程中发生的错误
  // out: 子进程输出的正常内容
  // stdErr: 子进程输出的错误内容
  // 子进程发生任何的错误，绝不会影响到父进程，它们的内存空间是完全隔离的
});

// 过去，nodejs没有提供给用户创建线程的接口，只能使用进程的方式
// 过去，nodejs还提供了cluster模块，通过另一种模式来创建进程
// 现在，nodejs已经提供了线程模块，对进程的操作已经很少使用了
```

## 线程

操作系统启动一个进程（无论是主进程，还是子进程），都会自动为它分配一个线程，称之为主线程

**程序一定在线程上运行！！**

主线程在运行的过程中，可以创建多个线程，这些线程称之为子线程

当操作系统命令CPU去执行一个进程时，实际上，是在该进程的多个线程中切换执行

线程和进程很相似，它们都是独立运行，最大的区别在于：**线程的内存空间没有隔离**，共享进程的内存空间，线程之间的数据不用遵守任何协议，可以随意使用



什么时候要使用线程？

使用线程的主要目的，是为了充分使用多核cpu。线程执行过程中，尽量的不要阻塞。

最理想的线程效果：

1. 线程数等于cpu的核数
2. 线程永不阻塞
   1. 没有io
   2. 只存在大量运算
3. 线程相对独立，几乎不使用共享数据

线程一般处理cpu密集型操作（运算操作），而io密集型操作不适合使用线程，而适合使用异步



为了避免线程执行过程中共享数据产生的麻烦，nodejs使用独特的线程机制来尽力规避：

```js
// 创建子线程的父线程
const { Worker } = require("worker_threads");
const worker = new Worker(线程执行的入口文件, {
  workerData: 开启线程时向其传递的数据,
}); // worker是子线程实例

// 通过EventEmitter监听子线程的事件
worker.on("exit", () => {
  // 当子线程退出时运行的事件
});
worker.on("message", (msg) => {
  // 收到子线程发送的消息时运行的事件
});
worker.postMessage(任意消息); // 父线程向子线程发送任意消息
worker.terminate(); // 退出子线程
```



```js
const {
  isMainThread, // 是否是主线程
  parentPort, // 用于与父线程通信的端口
  workerData, // 获取线程启动时传递的数据
  threadId, // 获取线程的唯一编号
} = require("worker_threads");

parentPort.on("message", (msg) => {
  // 当收到父线程发送的消息时，触发的事件
});
parentPort.postMessage(workerData); // 向父线程发送消息
```

