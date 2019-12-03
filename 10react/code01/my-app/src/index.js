// 1 导入 react 和 react-dom
import React from 'react'
import ReactDOM from 'react-dom'

// 导入样式文件
import './index.css'

// 样式
// 1 行内样式
// 2 className 添加样式（推荐！！！）

// const h1 = (
//   <h1 style={{ color: 'red', fontSize: 30, backgroundColor: 'hotpink' }}>
//     我变大了
//   </h1>
// )

// const styles = { color: 'red', fontSize: 30, backgroundColor: 'hotpink' }
// const h1 = <h1 style={styles}>我变大了</h1>

const h1 = <h1 className="pink">我变大了</h1>

// 3 渲染 JSX 创建好的React元素
ReactDOM.render(h1, document.getElementById('root'))
