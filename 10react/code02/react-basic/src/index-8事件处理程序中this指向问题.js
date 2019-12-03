/* 
  setState()
*/

import React from 'react'
import ReactDOM from 'react-dom'

class Hello extends React.Component {
  // 简化语法：
  state = {
    count: 0
  }

  // 抽离事件处理程序
  handleClick() {
    console.log('事件处理程序中的this：', this)
    // this.setState({
    //   count: this.state.count + 1
    // })
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
