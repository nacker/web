
// import 文件路径，那么被引入的文件中的代码就会被执行
// 这样的引入方式，没有接受任何的暴露出来的数据，只是执行这个模块代码而已
// import './sayhello.js'

// 会从被导入中模块中获取它爆出来的内容


// import * as obj from "文件路劲"
//会把当前模块中所有的内容，导出到一个对象中  对象名字可以随便起
// import * as obj from './sayhello.js'

// console.log(obj);



// import {sayHello, num} from "./sayhello"

// sayHello();

// console.log(num);


// import * as obj from "./modulea.js"
// import {num, sayHello} from './modulea'

// console.log(num, sayHello);


// import {gengjiaxiang} from './modulea'
// console.log(gengjiaxiang);


// import sayHello from './moduleb'

// sayHello();


// 同时有默认导出项和其他数据的时候，导入的方式

// 如果只想要默认导出项 (默认导出项，只能这么导入)
// import person from "./modulec"
// console.log(person)

// 如果要导出多个数据（其他数据）
// import {num} from './modulec'
// console.log(num);

// import * as obj from './modulec'
// console.log(obj.default);