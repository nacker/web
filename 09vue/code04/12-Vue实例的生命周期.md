# 生命周期

## 生命周期指的是

Vue实例从创建到被销毁的整个过程！

## 生命周期的三个阶段

1. 初始化阶段
   1. 初始化生命周期
   2. 初始化数据（把data中的数据通过Object.defineProperty加到Vue实例中）
   3. 判断当前创建Vue实例的时候传进来的参数中是否有el属性
      1. 如果有，就继续判断是否有template属性
         1. 如果有，就编译模板，创建一个render函数出来
         2. 如果没有，就把el对应的元素的html代码编译成模板（我们常见的代码要走这一步）
   
      2. 如果没有，就当vm.$mount被调用之后继续执行（我们常见的代码要走这一步）
   4. 创建vm.$el（里面的数据已经完全渲染好了）, 并且用这个新创建的元素，把页面中的el给替换掉

  这个时候，我们就在页面上看到了有数据的html元素了！！！

   
2. 更新阶段
   1. Vue会监听数据的变化，当数据发生变化的时候
   2. Vue会重新渲染虚拟DOM,对页面内容进行更新
   
3. 卸载阶段
   1. 当vm.$destory被调用的时候
   2. 会将所有的和当前vue实例相关的资源进行释放

## 生命周期钩子函数

钩子函数： 特定的时机执行的事件！！

create: 在数据初始化前后调用的事件
  beforeCreate
  created

mount： 在将有数据的元素挂载到页面前后调用的事件
  beforeMount
  mounted

update： 数据发生改变，页面更新前后调用的事件
  beforeUpdate
  updated

destroy： 当vm.$destroy被调用，资源释放前后调用的事件
  beforeDestroy
  destroyed