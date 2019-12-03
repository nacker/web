import React from 'react'
import ReactDOM from 'react-dom'

class Hello extends React.Component {
  state = {
    count: 0
  }

  // 第一个参数：表示上一次的 props
  // 第二个参数：表示上一次的 state
  // 说明：可以在该钩子函数中调用 setState()，但是，一定要把 setState() 放在一个条件判断中
  //      比如：可以对比更新前后的 props 是否相同，或者 对比更新前后的 状态是否相同
  // 注意：不要直接调用 setState() 否则，会造成死循环
  componentDidUpdate(prevProps, prevState) {
    console.warn(
      '2 组件生命周期钩子函数： componentDidUpdate',
      document.getElementsByTagName('h1')[0].innerText,
      prevProps,
      prevState
    )

    // 如何获取最新的props 和 最新的state？
    console.log(this.props, this.state)
  }

  handleClick = () => {
    this.setState({
      count: this.state.count + 1
    })

    // 强制组件更新（知道即可）：
    // forceUpdate()
    // this.forceUpdate()
  }

  render() {
    console.warn('1 组件生命周期钩子函数： render')
    return (
      <div>
        <Child count={this.state.count} />
        <button onClick={this.handleClick}>更新组件</button>
      </div>
    )
  }
}

// 当组件接收到新的 props 值时，也会触发组件更新
class Child extends React.Component {
  componentDidUpdate() {
    console.warn('子组件 -> 的生命周期钩子函数： componentDidUpdate')
  }

  render() {
    console.warn('子组件 -> 的生命周期钩子函数： render')
    return <h1>计数器：{this.props.count}</h1>
  }
}

ReactDOM.render(<Hello />, document.getElementById('root'))
