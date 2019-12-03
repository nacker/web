import React from 'react'
import ReactDOM from 'react-dom'

class Parent2 extends React.Component {
  state = {
    number: 0
  }

  // 生成随机数：0 1 2
  // Math.random() => [0, 1)
  handleNumber = () => {
    this.setState({
      number: Math.floor(Math.random() * 3)
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

class Child2 extends React.Component {
  // 什么情况下阻止不必要的更新？前后两次 number 值相同的情况下，是不需要更新组件的。
  shouldComponentUpdate(nextProps) {
    console.log(
      '上一次的值为：',
      this.props.number,
      '最新的值为：',
      nextProps.number
    )

    return this.props.number !== nextProps.number

    /* if (this.props.number === nextProps.number) {
      return false
    }

    return true */
  }

  render() {
    // console.log('Child2 组件重新渲染了', this.props.number)
    return <h1>随机数：{this.props.number}</h1>
  }
}

ReactDOM.render(<Parent2 />, document.getElementById('root'))
