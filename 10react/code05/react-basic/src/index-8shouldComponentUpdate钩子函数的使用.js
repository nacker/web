import React from 'react'
import ReactDOM from 'react-dom'

class Parent2 extends React.Component {
  state = {
    count: 0
  }

  render() {
    console.log('Parent2 组件重新渲染了')
    return (
      <div>
        <Child2 count={this.state.count} />
        <button
          onClick={() =>
            this.setState({
              count: this.state.count + 1
            })
          }
        >
          +1
        </button>
      </div>
    )
  }
}

// 奇数渲染；偶数不渲染
class Child2 extends React.Component {
  // 作用：通过该钩子函数的返回值来决定是否重新渲染该组件
  // 如果返回值为 true，就会重新渲染该组件；
  // 如果返回false，就不会重新渲染该组件

  // 第一个参数：表示最新的props值
  // 第二个参数：表示最新的state值
  shouldComponentUpdate(nextProps, nextState) {
    // console.log(
    //   '上一次的count：',
    //   this.props.count,
    //   ' 最新的props为：',
    //   nextProps.count
    // )

    if (nextProps.count % 2 === 0) {
      // 此时为 偶数
      return false
    }

    return true
  }

  render() {
    console.log('Child2 组件重新渲染了')
    return <h1>计数器：{this.props.count}</h1>
  }
}

ReactDOM.render(<Parent2 />, document.getElementById('root'))
