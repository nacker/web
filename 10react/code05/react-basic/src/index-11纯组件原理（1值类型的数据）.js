import React from 'react'
import ReactDOM from 'react-dom'

class Parent2 extends React.PureComponent {
  state = {
    number: 0
  }

  // 生成随机数：0 1 2
  // Math.random() => [0, 1)
  handleNumber = () => {
    const number = Math.floor(Math.random() * 3)
    console.log('---> 生成新的随机数了', number)
    this.setState({
      number
    })
  }

  render() {
    console.log('Parent2 组件重新渲染了')
    return (
      <div>
        <h1>随机数：{this.state.number}</h1>
        <button onClick={this.handleNumber}>生成随机数</button>
      </div>
    )
  }
}

ReactDOM.render(<Parent2 />, document.getElementById('root'))
