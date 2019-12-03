function timeOut(time){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve(123);
    }, time);
  });
}


timeOut(1000).then(num => {
  console.log(num);
})

// async await 这个两个关键字 是 es7 中提供的
// 可以再将 Promise的写法 进行简化


// async 和 await 必然是同时出现  （有await 必须有async）
async function test(){

  let num = await timeOut(1000);

  console.log("异步代码完成" + num);
}

console.log("异步代码前")
test();
console.log("异步代码后")