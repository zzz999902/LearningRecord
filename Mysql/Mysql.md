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