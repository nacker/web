import React from 'react'
import ReactDOM from 'react-dom'

// 导入图片
import cat from './images/cat.png'

// 创建 Mouse 组件，用来复用 鼠标位置，实现状态逻辑复用
/* class Mouse extends React.Component {
  // 鼠标位置状态
  state = {
    x: 0,
    y: 0
  }

  // 进入页面时，就绑定事件
  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  // 鼠标移动的事件处理程序
  handleMouseMove = e => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  // 移除事件
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove)
  }

  render() {
    return (
      <div>
        当前鼠标位置：{this.state.x} - {this.state.y}
      </div>
    )
  }
} */

class Mouse extends React.Component {
  // 鼠标位置状态
  state = {
    x: 0,
    y: 0
  }

  // 进入页面时，就绑定事件
  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  // 鼠标移动的事件处理程序
  handleMouseMove = e => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  // 移除事件
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove)
  }

  render() {
    // 验证通过 porps 可以获取到render属性
    // console.log(this.props)

    // 调用 props.render 方法
    return this.props.render(this.state)
  }
}

ReactDOM.render(
  <Mouse
    render={mouse => (
      <img
        src={cat}
        alt=""
        style={{ position: 'absolute', top: mouse.y - 64, left: mouse.x - 64 }}
      />
    )}
  />,
  document.getElementById('root')
)

// ReactDOM.render(
//   <Mouse
//     render={mouse => (
//       <p>
//         当前鼠标位置：{mouse.x} - {mouse.y}
//       </p>
//     )}
//   />,
//   document.getElementById('root')
// )
