// 1. 使用npm来下载包的时候，需要先初始化一个项目

// 项目的名字不能带中文
// npm init: 一顿敲回车
// npm init -y: 快速初始化

/* 
  npm 安装包
  npm install 包名：  默认下载最新版
  npm install 包名@版本 下载指定版本
  npm i 包名
*/

/* 
  1. npm init : 初始化一个项目
     npm init -y: 快速初始化一个项目
        在当前项目下面，创建一个 package.json 对项目的一个描述

  2. npm install 包名
    npm i 包名
    npm i 包名@版本     下载包

  3. npm uninstall 包名 卸载包


  npm i: 不跟包名，，，自动把package.json文件中所有的都下载下来
*/
const mime = require('mime')
