import React from 'react'
import ReactDOM from 'react-dom'

// 使用 children 代替 render 属性：
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
    // 调用 props.render 方法
    // 1 渲染结构
    // 2 暴露state
    // return this.props.render(this.state)
    return this.props.children(this.state)
  }
}

// 使用 Mouse 组件（render-props 模式）：
ReactDOM.render(
  <Mouse>
    {({ x, y }) => (
      <p>
        鼠标位置：{x} - {y}
      </p>
    )}
  </Mouse>,
  document.getElementById('root')
)
