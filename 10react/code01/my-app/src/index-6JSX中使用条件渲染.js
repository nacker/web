// 1 导入 react 和 react-dom
import React from 'react'
import ReactDOM from 'react-dom'

// 提供一个数据 isLoading 表示数据是否加载中
let isLoading = false

// setTimeout(() => {
//   isLoading = false
//   ReactDOM.render(<div>{loadData()}</div>, document.getElementById('root'))
// }, 2000)

const loadData = () => {
  if (isLoading) {
    return <div>loading...</div>
  }

  return <div>加载完成后的列表结构</div>
}

const h1 = <div>{loadData()}</div>

// 3 渲染 JSX 创建好的React元素
ReactDOM.render(h1, document.getElementById('root'))
