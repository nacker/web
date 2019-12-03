// export default function sayHello (){
//   console.log("这是一个模块中的sayHello方法")
// }

function sayHello (){
    console.log("这是一个模块中的sayHello方法")
  }


  let num = 100;
export {sayHello as default, num as default}