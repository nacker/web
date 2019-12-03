/* 
  事件处理：
*/

import React from 'react'
import ReactDOM from 'react-dom'

// 给 按钮 绑定单击事件
/* const Hello = () => {
  const handleClick = () => {
    console.log('你点我？？？')
  }

  const handleMouseEnter = () => {
    console.log('你摸我')
  }

  return (
    <button onClick={handleClick} onMouseEnter={handleMouseEnter}>
      点我
    </button>
  )
} */

// 在类组件中绑定事件
/* class Hello extends React.Component {
  // 事件处理程序
  handleClick() {
    console.log('你点我！')
  }

  render() {
    return <button onClick={this.handleClick}>点我 - class</button>
  }
} */

class Hello extends React.Component {
  render() {
    return (
      <button onClick={() => console.log('行内的事件处理程序')}>
        点我 - class
      </button>
    )
  }
}

// 3 使用函数名称作为组件标签名称，来渲染组件
ReactDOM.render(<Hello />, document.getElementById('root'))
