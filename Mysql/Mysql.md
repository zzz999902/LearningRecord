# 简介

1. 持久的存储数据（数据存储在硬盘文件中）
2. 备份和恢复数据
3. 快速的存取数据
4. 权限控制

## 数据库类型

![](/Mysql/img/1.png)

![](/Mysql/img/2.png)

![](/Mysql/img/3.png)

# 安装使用

## 安装

网站地址 https://pc.qq.com/detail/3/detail_1303.html

一直下一步就行了

检查是否安装成功 打开cmd 输入mysql 如果显示不存在那就配置一下变量

## 使用

1. 用户登录：输入mysql -uroot -p  输入你之前安装的时候设置的密码
![](/Mysql/img/4.png)
2. 查看当前数据库字符编码：（SHOW VARIABLES LIKE 'CHARACTER_SET_%';）
![](/Mysql/img/5.png)
3. 修改my.ini文件中的默认字符编码:位置在C:\ProgramData\MySQL\MySQL Server 8.0 ProgramData是一个隐藏文件夹
4. 打开my.ini：
```js
//  找到66行的
 # default-character-set= 改成 
 default-character-set=utf8mb4
//  99行
# character-set-server= 改成
character-set-server=utf8mb4
```
1. 把my.ini复制到你安装的目录下、比如我是:C:\Program Files\MySQL\MySQL Server 8.0就放到这个文件夹下面
2. 重启mysql服务
3. 打开services.msc 找到 MySQL80 右键重启
4. 或者使用管理员运行net stop mysql80 和 net start mysql80命令
5. 查看当前拥有的数据库（SHOW DATABASES;）
![](/Mysql/img/6.png)

可以使用exit或者quit退出

## navicat

**使用命令行操作mysql太麻烦了**

**navicat**百度自行安装破解吧

请勿用于非法用途,支持正版

# 数据库设计

菜鸟教程：https://www.runoob.com/mysql/mysql-tutorial.html
## SQL

Structured Query Language 结构化查询语言
大部分关系型数据，拥有着基本一致的SQL语法

### DDL

Data Definition Language 数据定义语言

**主要操作数据库对象**
1. 库
2. 表
3. 视图
4. 存储过程

### DML

Data Manipulation Language 数据操控语言

**主要操作数据库中的记录**

### DCL

Data Control Language 数据控制语句

**主要操作用户权限**

## DDL-管理库（命令操作）

数据库不区分大小写
ctrl+r 运行

### 创建库 

CREATE DATABASE 数据库名;

### 切换当前库 

use 数据库名字;

### 删除库

drop database 数据库名;

## DDL-管理表

字段常用类型

1. bit：占1位，0或1，false或true
2. int：占32位，整数
3. decimal(M,N)：能精确计算的实数，M是总的数字位数，N是小数位数
4. char(n)：固定长度位n的字符
5. varchar(n)：长度可变，最大长度位n的字符
6. text：大量的字符
7. date：仅日期
8. datetime：日期和时间
9. time：仅时间

后续再写命令

## DDL-主键和外键

根据设计原则，每张表都要有主键

1. 保持唯一
2. 不能更改
3. 无业务含义

### 外键

用于产生表关系的列

外键列会连接到另一张表（或自己）的主键

![](/Mysql/img/9.png)

## DDL-表关系

![](/Mysql/img/10.png)
