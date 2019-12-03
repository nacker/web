
// import 最终不会放到浏览器里去执行
// 这句代码写在这，只是为了告诉webpack，我们用到了这个文件
// 当webpack遇到这句代码的时候，就知道了，我们用到了这个文件
// webpack就去对这个文件进行打包了，这句代码也会被webpack换掉
import "./index.css"

console.log("123");