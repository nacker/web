import React from 'react'
import ReactDOM from 'react-dom'

import cat from './images/cat.png'

// 高阶组件是一个函数
// 作用：包装一个组件，返回增强后的组件
//  比如：const CatWithMouse = withMouse(Cat)
//  比如：const PositionWithMouse = withMouse(Position)

// 高阶组件的两个职责：1 提供复用的state  2 提供操作状态的方法

// 创建一个高阶组件
// WrappedComponent --> Cat
// 通过高阶组件的参数，来指定要渲染的内容
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

      // {...this.state} 的作用：就是讲 state 中的属性分别传递给组件，相当于下面一行的写法
      return <WrappedComponent {...this.state} />
      // return <WrappedComponent x={this.state.x} y={this.state.y} />
    }
  }

  // 设置 Mouse 组件再 react-dev-tools（浏览器开发者工具）中的展示名称：
  Mouse.displayName = `WithMouse${getDisplayName(WrappedComponent)}`
  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
  }

  return Mouse
}

const Positioin = props => (
  <p>
    当前鼠标位置：{props.x} - {props.y}
  </p>
)
// 最终返回的增强后的组件，既有结构，又有状态逻辑了
const PositionWithMouse = withMouse(Positioin)

const Cat = props => {
  // console.log('Cat 组件中接收到高阶组件传递的状态：', props)
  return (
    <img
      src={cat}
      alt=""
      style={{ position: 'absolute', top: props.y - 64, left: props.x - 64 }}
    />
  )
}

const CatWithMouse = withMouse(Cat)

ReactDOM.render(
  <div>
    <PositionWithMouse />
    <CatWithMouse />
  </div>,
  document.getElementById('root')
)
