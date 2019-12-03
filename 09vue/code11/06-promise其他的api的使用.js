function timeOut(time){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve();
    }, time);
  });
}

// 我想在5个异步操作全部完成的时候，去做某件事情。

let t1 = timeOut(1000)
let t2 = timeOut(1000)
let t3 = timeOut(1000)
let t4 = timeOut(1000)
let t5 = timeOut(1000)

t1.then(function(){
  console.log("我是t1")
})
t2.then(function(){
  console.log("我是t2")
})
t3.then(function(){
  console.log("我是t3")
})
t4.then(function(){
  console.log("我是t4")
})
t5.then(function(){
  console.log("我是t5")
})

// Promise.all([t1, t2, t3, t4, t5]).then(function(){
//   console.log("所有异步操作完成了");
// })

// Promise.race([t1, t2, t3, t4, t5]).then(function(){
//   console.log("有一个异步率先完成了");
// })



// Promise对象有个方法，all方法
// 当所有的被传入的promise全部完成的时候，才会执行这个all的回调

// Promise对象有个方法，race方法
// 当被传入的promise有一个（第一个）完成的时候，就会执行这个race的回调