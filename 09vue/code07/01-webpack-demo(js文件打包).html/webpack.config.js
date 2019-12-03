const path = require('path')

module.exports = {
  // 要从哪个文件作为入口来分析当前项目里面用到的资源，然后进行打包
  entry: path.join(__dirname, "index.js"),
  // 打包出来的文件，要放到哪儿去
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  }
}