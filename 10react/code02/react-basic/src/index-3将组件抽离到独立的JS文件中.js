/* 
  使用函数创建组件：
*/

import React from 'react'
import ReactDOM from 'react-dom'

// 导入创建好的类组件
import Hello1 from './components/Hello'

// 3 使用函数名称作为组件标签名称，来渲染组件
ReactDOM.render(<Hello1 />, document.getElementById('root'))
