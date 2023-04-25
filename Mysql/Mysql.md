[TOC]
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


# SQL(数据库设计)

菜鸟教程：https://www.runoob.com/mysql/mysql-tutorial.html

Structured Query Language 结构化查询语言
大部分关系型数据，拥有着基本一致的SQL语法

## DDL

Data Definition Language 数据定义语言

**主要操作数据库对象**
1. 库
2. 表
3. 视图
4. 存储过程

### DDL-管理库（命令操作）

数据库不区分大小写
ctrl+r 运行

#### 创建库 

CREATE DATABASE 数据库名;

#### 切换当前库 

use 数据库名字;

#### 删除库

drop database 数据库名;

### DDL-管理表

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

### DDL-主键和外键

根据设计原则，每张表都要有主键

1. 保持唯一
2. 不能更改
3. 无业务含义

#### 外键

用于产生表关系的列

外键列会连接到另一张表（或自己）的主键

![](/Mysql/img/9.png)

### DDL-表关系

![](/Mysql/img/10.png)

## DML

Data Manipulation Language 数据操控语言

**主要操作数据库中的记录**

1. 增 CREATE
2. 查 Retrieve
3. 改 UPDATE
4. 删 DELETE

### DML-增删改

```js
// -- 增加语句
// 如果插入别的表就在前面加-列如:`test.``student`
// 对应表的字段 增加一条或者多条
INSERT INTO `student`(`name`,`birthday`,`sex`,`phone`)
VALUES('成哥','2023-04-24',DEFAULT,'18809284759'),
('成哥2','2223-04-24',DEFAULT,'13131314431');

// -- 修改语句
// 修改student表里面id=8的name
UPDATE student SET `name`='偿心愿' 
// WHERE = 条件
WHERE id=8;

// -- 删除语句
DELETE FROM student
WHERE `name`='成哥';
```

### DML-单表查询*

**表结构**
![](/Mysql/img/11.png)

#### SELECT

```js
// 查询user的id and loginid , loginpwd 列名改成密码
SELECT id,loginid,loginpwd as '密码' FROM `user`

// * 表示 查询 employee 的所有数据
SELECT * FROM `employee`;

// case 对单独的列进行操作
SELECT
	id,
	`name`,
CASE
		ismale 
		WHEN 1 THEN
		'男' ELSE '女' 
	END AS '性别',
CASE
		
		WHEN salary >= 10000 THEN
		'高' 
		WHEN salary >= 5000 THEN
		'中' ELSE '低' 
	END '工资' 
FROM
	`employee`;

// DISTINCT 去重 一般就查询一列
SELECT DISTINCT location FROM employee
```
#### FROM

```js
// 查询employee数据
SELECT * FROM employee 
```

#### WHERE

**对数据进行进一步的筛选查询条件**
1. =
```js
// 查询employee 里面ismale 里面 等于1 的数据
SELECT
	* 
FROM
	employee 
WHERE ismale = 1;
```
2. in
```js
// 查询department 里面 companyId 是1或者2的数据
SELECT
	* 
FROM
	department 
WHERE companyId in (1,2);
```
3. is 和is not
```js
// 查询employee里面location是null的数据
SELECT * FROM employee
WHERE location is null;
// 相反
SELECT * FROM employee
WHERE location is not null;
```
4. '> < >= <='
```js
// 查询employee里面salary小于某个数值的
SELECT * FROM employee
WHERE salary < 10000;
// '> < >= <=' 类似
```
5. between
```js
// 查询employee里面salary在什么之间的数据
SELECT * FROM employee
WHERE salary BETWEEN 10000 and 12000;
```
6. like
```js
// 模糊查询name %袁%(带袁的)  %袁(结尾带袁的)  袁%(名字带袁的) 袁_(两个字的)
SELECT * FROM employee
WHERE `name` LIKE '%袁%';
```
7. and
```js
// 同时多个条件查询
SELECT * FROM employee
WHERE `name` LIKE '张%' and ismale = 0 and salary >= 10000;
```
8.  or
```js
// 第一种  两个条件满足一个就行
SELECT * FROM employee
WHERE `name` LIKE '张%' and ismale = 0 and salary >= 10000
OR birthday >=  '2000-1-1';
// 第二种 必须姓张 要么是0 大于10000 要么大于就是2000-1-1
SELECT * FROM employee
WHERE `name` LIKE '张%' and (ismale = 0 and salary >= 10000
OR birthday >=  '2000-1-1');
```

#### ORDER BY 

```js
// 查询salary数据排序升序  降序是desc 升序是asc
SELECT * FROM employee
WHERE `name` LIKE '张%' 
ORDER BY salary ASC;

// 对女的进行升序排序同时工资降序排序
SELECT *,CASE ismale
	WHEN 1 THEN
		'男'
	ELSE
		'女'
END sex
FROM employee
WHERE `name` LIKE '张%' 
ORDER BY sex ASC,salary DESC;
```

#### LIMIT

```js
// n,m 跳过n条数据，取出m条数据
// 去除第二个的后三条数据
SELECT * FROM employee
LIMIT 2,3
```

**运行顺序 from -> where ->  select ->  order by -> limit**

### DML-联表查询*

1. 笛卡尔积
```js
// t1.id包含 t2所有的都对应一边
SELECT t1.name 主场, t2.name 客场 
FROM team as t1, team as t2
WHERE t1.id != t2.id;
```
2. 左连接，左外连接，left join
```js
// 左边为基准
// 左连接即使找不到也至少有一行
// 条件不满足department至少有一行
SELECT * 
from department as d left join employee as e
on d.id = e.deptId;
```
3. 右连接，右外连接，right join
```js
// 右边为基准
// 右边连接即使找不到也至少有一行 
// 条件不满足department至少有一行
SELECT * 
from employee as d right join department as e
on d.id = e.deptId;
```
4. 内连接，inner join（常用）
```js
// inner 是条件必须满足
SELECT e.`name` as empname, d.`name` as dptname, c.`name` as companyname
from employee as e 
inner join department as d on d.id = e.deptId 
inner join company c on d.companyId = c.id;
```

**练习**
```js
// -- 1. 创建一张team表，记录足球队
// -- 查询出对阵表

SELECT t1.name 主场, t2.name 客场 
FROM team as t1, team as t2
WHERE t1.id != t2.id;

// -- 2. 显示出所有员工的姓名、性别（使用男或女显示）、入职时间、薪水、所属部门（显示部门名称）
// 、所属公司（显示公司名称）

SELECT e.`name` 员工姓名, 
case ismale when 1 then '男' else '女' end 性别,
e.joinDate 入职时间,
e.salary 薪水,
d.`name` 部门名称,
c.`name` 公司名称
FROM employee e 
inner join department d on e.deptId = d.id
inner join company c on d.companyId = c.id

// -- 3. 查询腾讯和蚂蚁金服的所有员工姓名、性别、入职时间、部门名、公司名

SELECT e.`name` 员工姓名, 
case ismale when 1 then '男' else '女' end 性别,
e.joinDate 入职时间,
e.salary 薪水,
d.`name` 部门名称,
c.`name` 公司名称
FROM employee e 
inner join department d on e.deptId = d.id
inner join company c on d.companyId = c.id
WHERE c.`name` in ('腾讯科技', '蚂蚁金服')

// -- 4. 查询渡一教学部的所有员工姓名、性别、入职时间、部门名、公司名

SELECT e.`name` 员工姓名, 
case ismale when 1 then '男' else '女' end 性别,
e.joinDate 入职时间,
e.salary 薪水,
d.`name` 部门名称,
c.`name` 公司名称
FROM employee e 
inner join department d on e.deptId = d.id
inner join company c on d.companyId = c.id
WHERE c.`name` like '%渡一%' AND d.`name` = '教学部';

// -- 5. 列出所有公司员工居住的地址（要去掉重复）

select DISTINCT location from employee;
```


### DML-函数和分组

#### 内置函数

##### 数学

1. ABS(x)   返回x的绝对值
```js
SELECT ABS(-1)
// 输出 1
```
2. CEILING(x)   返回大于x的最小整数值
```js
SELECT CEILING(1.4)
// 输出 2
```
3. FLOOR(x)   返回小于x的最大整数值
```js
SELECT FLOOR(1.4)
// 输出 1
```
4. MOD(x,y)    返回x/y的模（余数）
```js
SELECT MOD(2,10)
// 输出 2
```
5. PI() 返回pi的值（圆周率）
```js
SELECT PI()
// 输出 3.141593
```
6. RAND() 返回０到１内的随机值
```js
SELECT RAND()
// 输出 ０到１内的随机值
```
7. ROUND(x,y) 返回参数x的四舍五入的有y位小数的值
```js
SELECT ROUND(3.1414522,4)
// 输出 3.1415
```
8. TRUNCATE(x,y)  返回数字x截短为y位小数的结果
```js
SELECT TRUNCATE(3.1414522,4)
// 输出3.1414
```

##### 聚合

**聚合,只能查询一个东西**

1. AVG(col) 返回指定列的平均值
```js
// 查询得是employee 里面得 salary 的平均值
SELECT AVG(salary)
FROM employee;
```
2. COUNT(col) 返回指定列中非NULL值的个数
```js
// 查询得是employee 里面 有id的有多少个
SELECT COUNT(id)
FROM employee
```
3. MIN(col) 返回指定列的最小值
```js
// 查询得是employee 里面 salary 最小的
SELECT MIN(salary)
FROM employee
```
4. MAX(col) 返回指定列的最大值
```js
// 查询得是employee 里面 salary 最大的
SELECT MAX(salary)
FROM employee
```
5. SUM(col) 返回指定列的所有值之和
```js
// 查询得是employee 里面 salary 的和
SELECT SUM(salary)
FROM employee
```

**综合查询练习**
```js
SELECT count(id) as 员工数量,
avg(salary) as 平均薪资,
sum(salary) as 总薪资,
min(salary) as 最小薪资
FROM employee;
```

##### 字符

1. CONCAT(s1,s2...,sn) 将s1,s2...,sn连接成字符串
```js
SELECT CONCAT_WS('+',`name`,salary)
FROM employee
// 输出 name + salary
```
2. CONCAT_WS(sep,s1,s2...,sn) 将s1,s2...,sn连接成字符串，并用sep字符间隔
```js
SELECT CONCAT(`name`,salary)
FROM employee
// 输出 name拼接salary
```
3. TRIM(str) 去除字符串首部和尾部的所有空格
4. LTRIM(str) 从字符串str中切掉开头的空格
5. RTRIM(str) 返回字符串str尾部的空格

##### 日期

1. CURDATE()或CURRENT_DATE() 返回当前的日期
2. CURTIME()或CURRENT_TIME() 返回当前的时间
3. TIMESTAMPDIFF(part,  date1,date2) 返回date1到date2之间相隔的part值，part是用于指定的相隔的年或月或日等 part 属性👇
      - MICROSECOND
      - ECOND
      - MINUTE  
      - HOUR
      - DAY
      - WEEK
      - MONTH
      - QUARTER
      - YEAR

##### 自定义函数

#### 分组

```js
// 运行顺序
from -> join on -> where -> group by -> select -> having 
-> order by -> limit
```
分组后，**只能查询分组的列和聚合列**

```js
// -- 查询员工分布的居住地，以及每个居住地有多少名员工
// -- 天府三街 3
SELECT location, count(id) as empnumber
FROM employee
GROUP BY location
HAVING empnumber>=40

// -- 查询所有薪水在10000以上的员工的分布的居住地，然后仅得到聚集地大于30的结果
SELECT location, count(id) as empnumber
FROM employee
WHERE salary>=10000
GROUP BY location
HAVING count(id)>=30
```

## DCL

Data Control Language 数据控制语句

**主要操作用户权限**
