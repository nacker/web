/* 
  使用函数创建组件：
*/

import React from 'react'
import ReactDOM from 'react-dom'

// 类组件
class Hello extends React.Component {
  // render 方法是 React 中固定的一个方法名称
  render() {
    // return null
    return <h1>这是我的第一个 class 组件</h1>
  }
}

// 3 使用函数名称作为组件标签名称，来渲染组件
ReactDOM.render(<Hello />, document.getElementById('root'))
