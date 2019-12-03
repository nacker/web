/* 
  使用 class 的实例方法（箭头函数）来解决this指向：

*/

import React from 'react'
import ReactDOM from 'react-dom'

// 事件处理程序中，我们要的 this 是当前组件的实例对象（它是React在渲染组件时创建）
class Hello extends React.Component {
  // 简化语法：
  state = {
    count: 0
  }

  handleClick = () => {
    this.setState({
      count: Math.random()
    })
  }

  render() {
    return (
      <div>
        计数器：{this.state.count}{' '}
        <button onClick={this.handleClick}>+1</button>
      </div>
    )
  }
}

ReactDOM.render(<Hello />, document.getElementById('root'))
