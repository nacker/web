/* 
  事件对象：
*/

import React from 'react'
import ReactDOM from 'react-dom'

class Hello extends React.Component {
  handleClick(e) {
    // 阻止浏览器的默认行为
    e.preventDefault()

    console.log(e)

    console.log('点击事件触发了')
  }

  render() {
    return (
      <a href="https://baidu.com/" onClick={this.handleClick}>
        传智播客
      </a>
    )
  }
}

// 3 使用函数名称作为组件标签名称，来渲染组件
ReactDOM.render(<Hello />, document.getElementById('root'))
