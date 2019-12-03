const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src/main.js"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  // Loader 对指定类型的文件，进行指定的处理
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        // url-loader
        use: ["file-loader"]
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html')
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ]
};
