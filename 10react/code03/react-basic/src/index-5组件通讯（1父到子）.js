/* 
  组件通讯：
*/

import React from 'react'
import ReactDOM from 'react-dom'

// 导入css
import './index.css'

// 父组件：
class Parent extends React.Component {
  // 提供数据
  state = {
    lastName: '王'
  }

  render() {
    return (
      <div className="parent">
        <h1>父组件：</h1>
        {/* 1 通过属性给子组件传递数据 */}
        <Child name={this.state.lastName} />
      </div>
    )
  }
}

// 子组件：
// 2 子组件中通过 props 接收数据
const Child = props => {
  return <p className="child">这是子组件：{props.name}</p>
}

ReactDOM.render(<Parent />, document.getElementById('root'))
