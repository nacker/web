/* 
  箭头函数自身没有 this。
  箭头函数中使用的 this 实际上是：外部环境（函数）的this
*/

import React from 'react'
import ReactDOM from 'react-dom'

// 事件处理程序中，我们要的 this 是当前组件的实例对象（它是React在渲染组件时创建）
class Hello extends React.Component {
  // 简化语法：
  state = {
    count: 0
  }

  handleClick() {
    console.log('handleClick：', this)

    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    console.log('render：', this)
    return (
      <div>
        计数器：{this.state.count}{' '}
        {/* <button onClick={() => console.log(this)}>+1</button> */}
        <button onClick={() => this.handleClick()}>+1</button>
      </div>
    )
  }
}

ReactDOM.render(<Hello />, document.getElementById('root'))
