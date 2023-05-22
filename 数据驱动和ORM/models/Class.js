// const { sequelize, DataTypes } = require('./db');
// const Student = require('./Student')
// // 创建一个模型对象
// const Class = sequelize.define(
//   'Class',
//   {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     openDate: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//   },
//   {
//     createdAt: false,
//     updatedAt: false,
//     paranoid: true,
//   }
// );
// // 关联关系 班级对应多个学生
// Class.hasMany(Student);

// module.exports = Class;
const { sequelize, DataTypes } = require('./db');
const Class = sequelize.define(
  'Class',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    openDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    paranoid: true,
  }
);

module.exports = Class;
