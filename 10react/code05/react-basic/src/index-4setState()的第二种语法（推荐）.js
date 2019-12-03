import React from 'react'
import ReactDOM from 'react-dom'

class Hello extends React.Component {
  state = {
    count: 0
  }

  // 修改状态：
  // setState() 是异步更新数据的
  handleClick = () => {
    console.log('setState前的状态：', this.state.count)

    // 回调函数的参数：
    // 1 state 表示最新的状态
    // 2 props 表示最新的 props
    this.setState((state, props) => {
      console.log('第一次：', state.count)
      return {
        count: state.count + 2
      }
    })

    // 最新的state：2
    this.setState((state, props) => {
      console.log('第二次：', state.count)
      return {
        count: state.count + 2
      }
    })

    // 最新的state：4
    this.setState((state, props) => {
      console.log('第三次：', state.count)
      return {
        count: state.count + 2
      }
    })

    console.log('setState后的状态：', this.state.count)
  }

  render() {
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
        <button onClick={this.handleClick}>+2</button>
      </div>
    )
  }
}

ReactDOM.render(<Hello />, document.getElementById('root'))
