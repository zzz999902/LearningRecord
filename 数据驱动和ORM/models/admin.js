const { sequelize, DataTypes } = require('./db');
// const { DataTypes } = require('sequelize'); //类型引用

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
    // name: {
    //   type: DataTypes.STRING, //类型
    //   allowNull: false, // 是否允许为null
    // },
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
