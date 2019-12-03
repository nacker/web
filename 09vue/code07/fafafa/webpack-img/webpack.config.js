const path = require("path")
module.exports = {
  // 3.想要不压缩       在打包
  mode: 'development',
  //1.入口文件
  entry: path.join(__dirname, 'index.js'),
  //2. 打包之后文件放哪里去
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  //4. loader 对指定类型的文件,进行指定的处理

  module: {
    rules: [
      {
        // 处理兼容性
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',/* 查询文件npmjs   babel-loader如何配置 */
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      //   webapck 指南 管理资源  css配置    打包还是在bundle.js 
      
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}
