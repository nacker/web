/* 
  context
*/

import React from 'react'
import ReactDOM from 'react-dom'

// 导入css
import './index.css'

// 创建 Context
// Provider 组件：提供状态
// Consumer 组件：使用状态
const { Provider, Consumer } = React.createContext('默认值')

// 父组件
class Parent extends React.Component {
  state = {
    msg: 'red 123'
  }

  render() {
    return (
      // <Provider>
      //   <div className="parent">
      //     这是父组件：
      //     <Child1 />
      //   </div>
      // </Provider>

      // <Provider value="yellow">
      <Provider value={this.state.msg}>
        <div className="parent">
          这是父组件：
          <Child1 />
        </div>
      </Provider>
    )
  }
}

// 子组件1
class Child1 extends React.Component {
  render() {
    return (
      <div className="child">
        这是子组件1：
        <Child2 />
      </div>
    )
  }
}

// 子组件2：
class Child2 extends React.Component {
  render() {
    return (
      <div className="child2">
        这是子组件2：
        <Child3 />
      </div>
    )
  }
}

// 子组件3：
class Child3 extends React.Component {
  render() {
    return (
      <div className="child3">
        这是子组件3：
        {/* data 就是接收到的 Provider 组件中提供的数据 */}
        <Consumer>{data => <p>接收到的数据为：{data}</p>}</Consumer>
      </div>
    )
  }
}

ReactDOM.render(<Parent />, document.getElementById('root'))
