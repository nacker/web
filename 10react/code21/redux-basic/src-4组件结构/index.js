/* 
  redux 负责：提供 state 以及 操作state的方法
  react 负责：页面展示（UI）
*/

import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'

const App = () => {
  return (
    <div>
      {/* 添加任务 */}
      <input type="text" />
      <button>添加</button>

      {/* 任务列表 */}
      <ul>
        <li>
          <span>吃饭</span>
          <button>X</button>
        </li>
      </ul>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
