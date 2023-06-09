[TOC]
# mysql驱动程序


## 驱动程序

- 驱动程序是连接内存和其他存储介质的桥梁
- mysql驱动程序是连接内存数据和mysql数据的桥梁
- mysql驱动程序通常使用
      -  mysql
      -  mysql2 - mysql-native (推荐)

## mysql2

官方文档：https://github.com/sidorares/node-mysql2#readme
中文文档：http://sidorares.github.io/node-mysql2/documentation_zh-cn/

```js
// 回调方式
// 导入模块
const mysql = require('mysql2');

// 创建一个数据库连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '823164975',
  database: 'test',
});

// 简单查询
connection.query('SELECT * FROM `product`', function (err, results, fields) {
  // err 错误
  console.log(results); // 结果集
  // console.log(fields); // 额外的元数据（如果有的话）
});

// Promise方式
async function main() {
  // get the client
  const mysql = require('mysql2/promise');
  // create the connection
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '823164975',
    database: 'test',
  });
  // query database
  const [rows, fields] = await connection.query('SELECT * FROM `product`');
  console.log(rows);
  connection.end();
}
main();
```

**以上都是简单的演示，平时不能这么写**

## 防止sql注入

- sql注入：用户通过注入sql语句到最终查询中，导致了整个sql与预期行为不符
- mysql支持变量：变量的内容不作为任何sql关键字

```js
// 使用execute方法
// 使用连接池createPool 节约空间
// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// execute will internally call prepare and query
connection.execute(
  'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
  ['Rick C-137', 53],
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
  }
);
```

# Sequelize简介

https://github.com/demopark/sequelize-docs-Zh-CN 

## ORM

**Object Relational Mapping 对象关系映射**

- 通过ORM框架，可以自动的把程序中的对象和数据库关联
- ORM框架会隐藏具体的数据库底层细节，让开发者使用同样的数据操作接口，完成对不同数据库的操作(「ORM原理图」)
- ORM的优势
      - 开发者不用关心数据库，仅需关心对象
      - 可轻易的完成数据库的移植
      - 无须拼接复杂的sql语句即可完成精确查询

![](/数据驱动和ORM/img/ORM原理图.jpg)

## Node中的ORM

### Sequelize（推荐）

- JS
- TS
- 成熟

### TypeORM

- TS
- 不成熟

# 例子入门

https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/getting-started.md

**连接创建例子在models中，这里少量举例**

## 安装

```js
Sequelize 的使用可以通过 npm (或 yarn).
// # 使用 npm
npm i sequelize # 这将安装最新版本的 Sequelize
// # 使用 yarn
yarn add sequelize
你还必须手动为所选数据库安装驱动程序：

// # 使用 npm
npm i pg pg-hstore # PostgreSQL
npm i mysql2 # MySQL
npm i mariadb # MariaDB
npm i sqlite3 # SQLite
npm i tedious # Microsoft SQL Server
npm i ibm_db # DB2
// # 使用 yarn
yarn add pg pg-hstore # PostgreSQL
yarn add mysql2 # MySQL
yarn add mariadb # MariaDB
yarn add sqlite3 # SQLite
yarn add tedious # Microsoft SQL Server
yarn add ibm_db # DB2
```

## 连接数据库

```js
const { Sequelize, DataTypes } = require('sequelize');

// 方法 3: 分别传递参数 (其它数据库)
// 参数分别是 数据库名字 账号 密码
const sequelize = new Sequelize('myschooldb', 'root', '823164975', {
  host: 'localhost', // 默认连接本地的表
  dialect: 'mysql', //type
  /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
});

module.exports = sequelize;
```

## 创建模型

```js
const { Sequelize, DataTypes } = require('sequelize');

// 方法 3: 分别传递参数 (其它数据库)
// 参数分别是 数据库名字 账号 密码
const sequelize = new Sequelize('myschooldb', 'root', '823164975', {
  host: 'localhost',
  dialect: 'mysql',
  /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
  //   logging: console.log, // 日志
});

// 创建一个模型对象
const Admin = sequelize.define(
  'Admin',
  {
    // 在这里定义模型属性
    loginId: {
      type: DataTypes.STRING, //类型
      allowNull: false, // 是否允许为null
    },
    loginPwd: {
      type: DataTypes.STRING, //类型
      allowNull: false, // 是否允许为null
    },
    name: {
      type: DataTypes.STRING, //类型
      allowNull: false, // 是否允许为null
    },
  },
  {
    // 这是其他模型参数

    // tableName: 'admin', // 自动设置表明

    // freezeTableName: true, // 加了名字后面不会自动加s 不加就会自动加s

    // 不要忘记启用时间戳！
    // timestamps: true,

    // 不想要 createdAt updatedAt
    createdAt: false,
    updatedAt: false,

    // 想要 updatedAt 但是希望名称叫做 updateTimestamp
    // updatedAt: 'updateTimestamp',

    //从此以后，该表的数据不会真正的删除，而是增加一列deletedAt，记录删除的时间
    paranoid: true,
  }
);

module.exports = Admin;

// 关联关系 班级对应多个学生
// 例子：一对多 class对多个student
Class.hasMany(Student);
```

## 增删改查

![](/数据驱动和ORM/img/%E4%B8%89%E5%B1%82%E6%9E%B6%E6%9E%84.jpg)

文档：https://demopark.github.io/sequelize-docs-Zh-CN/

对应 services

```js
const adminServ = require("./services/adminService");
adminServ.addAdmin({
  loginId: "asdfasdfasdfssa",
  loginPwd: "adsfasdfd",
});

adminServ.deleteAdmin(4).then((r) => {
  console.log(r);
});

adminServ.updateAdmin(2, {loginId: "aaaaaa"}).then((r) => {
    console.log(r);
});
```

## 模拟数据

http://mockjs.com/  

对应 mock

## 数据抓取

1. axios
2. cheerio

对应 spider

## 数据查询

https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/model-querying-basics.md

1. 查询单个数据：findOne
2. 按照主键查询单个数据：findByPK
3. 查询多个数据：findAll
4. 查询数量：count
5. 包含关系：include

```js
// 1. 查询单个数据：findOne
exports.login = async function (loginId, loginPwd) {
  const result = await Admin.findOne({
    where: {
      loginId,
      loginPwd,
    },
  });
  if (result && result.loginId === loginId && result.loginPwd === loginPwd) {
    return result.toJSON();
  } 
  return null;
};

// 2. 按照主键查询单个数据：findByPK
exports.getAdminById = async function (id) {
  const result = await Admin.findByPk(id);
  if (result) {
    return result.toJSON();
  }
  return null;
};

// 3. 查询多个数据：findAll
exports.getAdmins = async function () {
  const result = await Admin.findAll();
  return JSON.parse(JSON.stringify(result));
};

// 5.包含关系：include
exports.getStudents = async function (
  page = 1,
  limit = 10,
  sex = -1,
  name = ''
) {
  const where = {};
  if (sex !== -1) {
    where.sex = !!sex;
  }
  if (name) {
    where.name = {
      [Op.like]: `%${name}%`,
    };
  }

  const result = await Student.findAndCountAll({
    attributes: ['id', 'name', 'sex', 'birthdady'],
    where,
    include: [Class],
    offset: (page - 1) * limit,
    limit: +limit,
  });
  return {
    total: result.count,
    datas: JSON.parse(JSON.stringify(result.rows)),
  };
};
```

## MD5加密

https://www.npmjs.com/package/md5

**md5加密的特点**

- hash加密算法的一种
- 可以将任何一个字符串，加密成一个固定长度的字符串
- 单向加密：只能加密无法解密
- 同样的源字符串加密后得到的结果固定

# moment

http://momentjs.cn/

![](/数据驱动和ORM/img/%E6%97%B6%E9%97%B4%E5%A4%84%E7%90%86%E6%A8%A1%E5%BC%8F.jpg)
 
服务器的影响： 
1. 服务器可能会部署到世界的任何位置
2. 服务器内部应该统一使用utc时间或时间戳，包括数据库

客户端的影响：
1. 客户端要给不同地区的客户友好的显示时间
2. 客户端应该把时间戳或utc时间转换为本地时间显示

```js
// 尽量使用utc
moment.utc()
```

# 数据验证

## 数据验证的位置

1. 前端（客户端）：为了用户体验
2. 路由层：验证接口格式是否正常
3. 业务逻辑层：保证业务完整性
4. 数据库验证（约束）：保证数据完整性

## 相关的库

- [validator](https://github.com/validatorjs/validator.js): 用于验证某个字符串是否满足某个规则
```js
// 文档的解释
 const rule = {
    //验证规则
    name: {
      presence: {
        allowEmpty: false, // name必须存在
      },
      type: "string", // 类型
      length: {   /长度
        minimum: 1,
        maximum: 10,
      },
       datetime: { // 配置日期
        dateOnly: true,  // 只需要日期
        earliest: +moment.utc().subtract(100, "y"), // 最早不能早于100年前
        latest: +moment.utc().subtract(5, "y"), // 最晚不能晚于五年前
      },
      format: /1\d{10}/, // 正则
    },
 }
```
- [validate.js](http://validatejs.org/):  用于验证某个对象的树形是否满足某些规则


# 日志记录

https://log4js-node.github.io/log4js-node/

## 概念

- level：日志级别

例如调试日志、信息日志、错误日志等等

![](/数据驱动和ORM/img/log等级.jpg)

- category：日志分类 例如：sql日志、请求日志等 等

- appender：日志出口

