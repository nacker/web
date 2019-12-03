import React from 'react'
import ReactDOM from 'react-dom'

// 高阶组件是一个函数
const withMouse = WrappedComponent => {
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
      // 将组件内部的状态，通过 props 传递给子组件
      // WrappedComponent ---> Cat

      console.log('Mouse组件的props：', this.props)

      // 注意：应该将 Mouse 获取到的 props 也传递给 被包装 组件，这样的话，就可以在被包装组件中获取到所有的props了
      return <WrappedComponent {...this.state} {...this.props} />
    }
  }
  return Mouse
}

const Position = props => {
  console.log('Position 组件中的props：', props)

  return (
    <p>
      当前鼠标位置：{props.x} - {props.y}
    </p>
  )
}

// 最终返回的增强后的组件，既有结构，又有状态逻辑了
const PositionWithMouse = withMouse(Position)

ReactDOM.render(
  <PositionWithMouse name="jack" />,
  document.getElementById('root')
)
