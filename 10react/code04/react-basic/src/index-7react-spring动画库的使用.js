import React from 'react'
import ReactDOM from 'react-dom'

// 导入 动画库 中的 Spring 组件
import { Spring, config } from 'react-spring/renderprops'

/* ReactDOM.render(
  <Spring from={{ number: 0 }} to={{ number: 1 }} config={config.slow}>
    {props => {
      console.log(props)
      return <div>{props.number}</div>
    }}
  </Spring>,
  document.getElementById('root')
) */

ReactDOM.render(
  <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={config.slow}>
    {props => <div style={props}>hello</div>}
  </Spring>,
  document.getElementById('root')
)
