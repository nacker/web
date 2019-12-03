
export function sayHello(){
  console.log("你好，world")
}

export let num = 100;

export let person = {
  name: "zs",
  age: 18
}

console.log("这个模块被引用")


// export {sayHello as func}