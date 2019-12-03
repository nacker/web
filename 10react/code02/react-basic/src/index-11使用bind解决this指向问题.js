/* 
  使用 bind 方法解决this指向：

  bind() 方法
    1 会创建一个新的函数
    2 绑定新创建函数的this（通过bind方法的第一个参数来指定的）
*/

import React from 'react'
import ReactDOM from 'react-dom'

// 事件处理程序中，我们要的 this 是当前组件的实例对象（它是React在渲染组件时创建）
class Hello extends React.Component {
  // 简化语法：
  // state = {
  //   count: 0
  // }
  constructor() {
    super()

    this.state = {
      count: 0
    }

    console.log('1 构造函数：', this)

    // 在此处，使用 bind 先把方法中的this绑定好
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      count: this.state.count + 2
    })
  }

  render() {
    console.log('2 render：', this)
    return (
      <div>
        计数器：{this.state.count}{' '}
        <button onClick={this.handleClick}>+1</button>
      </div>
    )
  }
}

ReactDOM.render(<Hello />, document.getElementById('root'))
