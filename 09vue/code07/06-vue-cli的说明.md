# Vue-cli

## 是什么？

通常我们把它叫做Vue脚手架

在使用Vue开发的时候，我们会用到好多工具，webpack，babel，eslint....

在使用这些工具的时候，我们需要自己手动配置好多内容，这些内容配置太过繁琐。

vue官方就除了一个脚手架工具，这个工具里面会把所有我们需要的配置，全部帮我们自动处理完毕。

## 使用

1. 安装  npm i -g @vue/cli
2. 用vue-cli来创建项目


## vue-cli生成的目录结构说明

1. 最外层的，基本上全都是配置文件，不需要过多的关注
2. node_modules 所有的npm下载的包
3. public 公共的静态资源（在学习完webpack之后，给大家做讲解）
4. src目录（工作中需要关注的重点！）
   1. main.js 这是整个项目的入口文件，项目就是从他开始执行的
   2. router.js 这是用来配置路由规则文件
   3. App.vue 这是整个项目的根组件
   4. assets目录，静态资源，所有的组件中用到的静态资源，全部放到这个目录中 (图片 css 字体文件)
   5. components目录，页面内使用的组件，就都放到这个文件夹中
   6. views目录，所有的页面组件都放到这个文件夹里   （页面组件就是指会有路由规则进行对应的组件）

## 关键命令

1. 创建项目
   1. vue create 项目名称
2. 运行项目
   1. npm run serve
3. 打包项目
   1. npm run build