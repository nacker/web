/* 
  props 校验：
*/

import React from 'react'
import ReactDOM from 'react-dom'

// 1 导入 prop-types 包
import PropTypes from 'prop-types'

class Parent extends React.Component {
  render() {
    return (
      <div>
        <h1>props 校验：</h1>
      </div>
    )
  }
}

// 2 给组件添加 props 校验
Parent.propTypes = {
  // 规定 colors 属性的类型为：数组（array），如果将来使用组件的时候，传入的 colors 属性类型不是 array ，就会通过警告来告诉使用者。
  colors: PropTypes.array,

  gender: PropTypes.oneOf(['male', 'female']).isRequired
}

ReactDOM.render(
  <Parent colors={[]} gender="male" />,
  document.getElementById('root')
)
