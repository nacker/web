// 1 导入 react 和 react-dom
import React from 'react'
import ReactDOM from 'react-dom'

// 提供一个数据 isLoading 表示数据是否加载中
let isLoading = false

// 1 使用if/esle
// 2 使用三元表达式
// 3 使用逻辑运算符 &&

// const loadData = () => {
//   return isLoading ? <div>loading...</div> : <div>加载完成后的列表结构</div>
// }

const loadData = () => {
  return isLoading && <div>loading...</div>
}

const h1 = <div>{loadData()}</div>

// 3 渲染 JSX 创建好的React元素
ReactDOM.render(h1, document.getElementById('root'))
