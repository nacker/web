/* 
  children：
*/

import React from 'react'
import ReactDOM from 'react-dom'

// 导入css
import './index.css'

// children 属性，跟其他 props 属性一样，可以是任意值。

// 父组件
class Parent extends React.Component {
  render() {
    // 2 通过 props.children 来获取到子节点
    console.log('props:', this.props)

    this.props.children()

    // return <div className="parent">组件 - {this.props.children}</div>
    return <div className="parent">组件 - </div>
  }
}

// 1 设置组件标签的子节点
// ReactDOM.render(<Parent>我是文本节点</Parent>, document.getElementById('root'))

// ReactDOM.render(
//   <Parent>
//     <h1>这是标题 子节点</h1>
//   </Parent>,
//   document.getElementById('root')
// )

ReactDOM.render(
  <Parent>{() => console.log('我是children，是一个函数')}</Parent>,
  document.getElementById('root')
)
