import React from 'react'

// 导入props校验
import PropTypes from 'prop-types'

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
    return this.props.render(this.state)
  }
}

// 添加属性校验
Mouse.propTypes = {
  render: PropTypes.func.isRequired
}

// 添加默认值
Mouse.defaultProps = {
  render: () => null
}

export default Mouse
