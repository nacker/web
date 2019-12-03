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

    // for (let i = 0; i < 1000; i++) {
    //   this.setState({
    //     count: i
    //   })
    // }

    this.setState({
      count: this.state.count + 1
    })

    this.setState({
      count: this.state.count + 1
    })

    this.setState({
      count: this.state.count + 1
    })

    console.log('setState后的状态：', this.state.count)
  }

  render() {
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
        <button onClick={this.handleClick}>+1</button>
      </div>
    )
  }
}

ReactDOM.render(<Hello />, document.getElementById('root'))
