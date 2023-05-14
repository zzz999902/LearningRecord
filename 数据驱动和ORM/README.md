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

## 模拟数据

http://mockjs.com/  
