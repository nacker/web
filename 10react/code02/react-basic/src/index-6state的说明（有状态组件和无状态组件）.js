/* 
  事件对象：
*/

import React from 'react'
import ReactDOM from 'react-dom'

class Hello extends React.Component {
  /* constructor() {
    super()

    // 初始化状态（数据）：
    this.state = {
      count: 10
    }
  } */

  // 简化语法：
  state = {
    count: 66
  }

  render() {
    return <div>计数器：{this.state.count}</div>
  }
}

// 3 使用函数名称作为组件标签名称，来渲染组件
ReactDOM.render(<Hello />, document.getElementById('root'))
