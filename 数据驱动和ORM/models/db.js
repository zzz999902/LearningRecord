const { Sequelize, DataTypes } = require('sequelize');

// 方法 3: 分别传递参数 (其它数据库)
// 参数分别是 数据库名字 账号 密码
const sequelize = new Sequelize('myschooldb', 'root', '823164975', {
  host: 'localhost',
  dialect: 'mysql',
  /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
  //   logging: console.log, // 日志
});

module.exports = {
  sequelize,
  DataTypes,//类型引用
};
