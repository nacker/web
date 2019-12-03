import React from 'react'
import ReactDOM from 'react-dom'

class Hello extends React.Component {
  state = {
    count: 0
  }

  handleClick = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <div>
        {this.state.count > 3 ? (
          <p>豆豆被打死了~</p>
        ) : (
          <div>
            <Child count={this.state.count} />
            {/* <Child1 count={this.state.count} /> */}
          </div>
        )}
        <button onClick={this.handleClick}>打豆豆</button>
      </div>
    )
  }
}

// function Child1(props) {
//   console.log('Child1 函数组件重新渲染了')
//   return <h1>统计豆豆被打的次数：{props.count}</h1>
// }

// 当组件从页面中消失，此时，就会触发组件的卸载阶段
class Child extends React.Component {
  componentDidMount() {
    // 开启定时器
    // this.timerId = setInterval(() => {
    //   console.log('定时器触发了')
    // }, 1000)

    window.addEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    console.log('窗口大小改变了')
  }

  // 组件将要卸载
  componentWillUnmount() {
    console.warn('组件生命周期钩子函数： componentWillUnmount')

    // 清理定时器
    // clearInterval(this.timerId)
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    return <h1>统计豆豆被打的次数：{this.props.count}</h1>
  }
}

ReactDOM.render(<Hello />, document.getElementById('root'))
