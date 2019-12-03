/* 
  组件通讯：
*/

import React from 'react'
import ReactDOM from 'react-dom'

// 导入css
import './index.css'

// 父组件：
// 1 提供事件（回调函数，）
//  事件是子组件调用的，因此，先要通过 props 传递给子组件
// 2 将事件传递给子组件
class Parent extends React.Component {
  state = {
    msg: ''
  }

  getChildMsg = data => {
    console.log('父组件中的方法调用了', data)
    this.setState({
      msg: data
    })
  }

  // 注意：this指向问题，因为这个方法是由子组件调用的，所以，应该提前处理好 this 指向！
  /* getChildMsg(data) {
    console.log('父组件中的方法调用了', data, this)
    this.setState({
      msg: data
    })
  } */

  render() {
    return (
      <div className="parent">
        <h1>父组件：{this.state.msg}</h1>
        <Child fn={this.getChildMsg} />
      </div>
    )
  }
}

// 子组件：
// 3 子组件中通过 props 接收到父组件中传递过来的事件
// 4 子组件中调用传递过来的事件， 将数据作为事件的参数传递
const Child = props => {
  // console.log(props)
  const handleClick = () => {
    // 调用
    props.fn('撩汉子')
  }

  return (
    <p className="child">
      这是子组件：
      <button onClick={handleClick}>发送数据给父组件</button>
    </p>
  )
}

ReactDOM.render(<Parent />, document.getElementById('root'))
