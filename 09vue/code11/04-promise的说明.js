
// Promise
// Promise 是ES6中新出来的API

// 1. 使用
//  如果一个工具，说自己支持Promise，那么我们就知道，他的回调函数是用.then来写的就可以了

// 2. 我们自己给别人提供Promise的工具

// Promise，其实是对于回调函数的另一种写法
// 可以帮助我们避免 回调地狱 

// 回调地狱
// 1. 代码结构不清晰，可阅读性极差
// 2. 代码执行的顺序不清晰

// Promise可以用来解决上述问题


// setTimeout(function(){
//   console.log("这是1秒后打印出来的内容")
//   setTimeout(function(){
//     console.log("这是2秒后打印出来的内容")
//   }, 1000)
// }, 1000)

// 封装一个支持Promise APi的延时函数

function timeOut(time){
  // Promise 一般来讲，我们说的都是Promise对象
  // .then方法就是 promise对象的方法

  // 这个函数中就需要返回一个Promise对象
  return new Promise(function(resolve, reject){

    // resolve是一个函数，调用这个函数，就可以吧当前promise对象标记为 成功
    // reject是一个函数，调用这个函数，就可以吧当前promise对象标记为 失败


    // promise对象一共有3个状态
    // pendding: 挂起，当前promise执行的任务，正在执行中
    // fullfilled： 完成， 当前promise对象执行的任务，已经完成，并且是成功状态
    // rejected: 完成， 当前promise对象执行的任务，已经完成，并且是失败状态

    // promise对象的.then方法中接收到的成功的回调函数，会在当前promise对象处于成功（fullfilled）状态的时候自动执行
    // promise对象的.then方法中接收到的失败的回调函数，会在当前promise对象处于失败(rejected)状态的时候自动执行

    setTimeout(function(){
      // 这个回调函数中，不需要涉及任何具体的业务操作
      // 只需要修改当前promise对象的状态即可！！

      // resolve和reject在调用的时候，是可以传递数据的，这个数据会最终被传递到成功或者失败的回调函数中
      // resolve(123)
      // resolve();
      reject();

    }, time);

  });
}


// timeOut(1000).then(function(num){
//   console.log("1秒后打印的内容", num);
// }, function(){
//   console.log("promise完成了，但是失败了")
// })

// timeOut(1000).then(num => {
//   console.log(num + "这是1s后打印的内容")
//   return timeOut(1000)
// }).then(num => {
//   console.log(num + "这是2s后打印的内容")
//   return timeOut(1000)
// }).then(num => {
//   console.log(num + "这是3s后打印的内容")
//   return timeOut(1000)
// })


timeOut(1000).then(function(){
  console.log('成功了')
}).catch(function(){
  console.log('失败了')
})
