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

    /* this.setState(
      {
        count: this.state.count + 1
      },
      () => {
        // 当 React 更新状态后，就会立即出发这个回调函数
        // 因为，在这个回调函数中获取到的就是更新后的状态值了。
        // 使用场景：在状态更新后，进行处理
        console.log('更新后立即触发的回调函数：', this.state.count)

        document.title = 'React App' + this.state.count
      }
    ) */

    this.setState(
      state => {
        return {
          count: state.count + 1
        }
      },

      () => {
        console.log('更新后立即触发的回调函数：', this.state.count)
        document.title = 'React App' + this.state.count
      }
    )

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
