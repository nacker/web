import React from 'react'
import ReactDOM from 'react-dom'

class Parent2 extends React.Component {
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
    // console.log('Parent2 组件重新渲染了')
    return (
      <div>
        <Child2 number={this.state.number} />
        <button onClick={this.handleNumber}>生成随机数</button>
      </div>
    )
  }
}

class Child2 extends React.PureComponent {
  render() {
    console.log('Child2 组件重新渲染了')
    return <h1>随机数：{this.props.number}</h1>
  }
}

ReactDOM.render(<Parent2 />, document.getElementById('root'))
