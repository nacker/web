# webpack

## 概念

模块化打包工具

注意： 代码一定要模块化的，webpack才可以工作，因为webpack是通过模块化的代码，进行依赖查找的！

## 作用

将项目里面的所有的用到的资源进行整合打包，减少最终生成的资源数量，优化网页性能

## 安装

1. 本地安装（推荐）
   可以吧webpack和项目关联起来，当前项目中的package.json文件中会保存有webpack的详细信息，
   这个不论在哪里运行，都可以正确安装对应的版本号的webpack

   npm i webpack webpack-cli -D

2. 全局安装（不推荐）
  全局安装会让webpack和项目没关系，A电脑上如果用的4.x版本的webpack, 项目拿到B的电脑上开发，B用的3.x的版本，就会导致webpack无法正常工作
   npm i webpack webpack-cli -g

## 使用

1. 如果是本地安装
    需要给package.json中添加scripts
    "start": "webpack"

2. 如果是全局安装
    直接在命令行里运行webpack命令就可以了


## webpack命令的使用

webpack命令可以接收参数

webpack 入口文件 -o 打包之后的文件的保存路径

## webpack.config.js