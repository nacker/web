import React from 'react'
import ReactDOM from 'react-dom'

class Hello extends React.Component {
  // 最早执行：
  // 1 初始化state
  // 2 给事件处理程序绑定 this
  constructor(props) {
    super(props)

    console.warn('1 组件生命周期钩子函数： constructor')
  }

  // 作用1：可以用来在进入页面时（该组件渲染时），发送ajax请求
  // 作用2：可以操作DOM（因为 render 已经将 JSX 渲染到页面中了）
  componentDidMount() {
    console.warn(
      '3 组件生命周期钩子函数： componentDidMount',
      (document.getElementsByTagName('h1')[0].style.color = 'red')
    )
  }

  // 作用：渲染 UI，负责将 JSX 渲染到页面中
  // 注意：不要在 render 方法中调用 setState() 方法，否则，会造成死循环！
  render() {
    // this.setState({})
    console.warn('2 组件生命周期钩子函数： render')
    return (
      <div>
        <h1>class 组件</h1>
      </div>
    )
  }
}

ReactDOM.render(<Hello />, document.getElementById('root'))
