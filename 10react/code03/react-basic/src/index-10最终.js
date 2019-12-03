/* 
  props 默认值：
*/

import React from 'react'
import ReactDOM from 'react-dom'

class Parent extends React.Component {
  render() {
    return (
      <div>
        <h1>props 默认值：{this.props.gender}</h1>
      </div>
    )
  }
}

// 添加 props 的默认值：
Parent.defaultProps = {
  gender: 'male'
}

ReactDOM.render(
  <Parent colors={[]} gender="female" />,
  document.getElementById('root')
)
