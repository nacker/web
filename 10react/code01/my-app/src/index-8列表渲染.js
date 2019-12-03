// 1 导入 react 和 react-dom
import React from 'react'
import ReactDOM from 'react-dom'

// 列表渲染
const songs = [
  { id: 1, name: '痴心绝对' },
  { id: 2, name: '像我这样的人' },
  { id: 3, name: '南山南' }
]

/* const res = songs.map(item => {
  item.name += ' - pm'

  return item
})

console.log(res) */

const h1 = (
  <div>
    {songs.map(item => {
      return <p key={item.id}>{item.name}</p>
    })}
    <ul>
      {songs.map(item => {
        return <li key={item.id}>{item.name}</li>
      })}
    </ul>
    优化版本：
    <ul>
      {songs.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  </div>
)

// 3 渲染 JSX 创建好的React元素
ReactDOM.render(h1, document.getElementById('root'))
