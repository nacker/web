import React from 'react'

/* 
  1 导入 react-router-dom 中的三个组件
  2 导入页面组件
  3 配置路由规则
*/
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// 导入页面组件
import Home from './pages/Home'
import CityList from './pages/CityList'

// 创建App组件
const App = () => {
  return (
    <Router>
      <div className="app">
        <ul>
          <li>
            <Link to="/home">首页</Link>
          </li>
          <li>
            <Link to="/citylist">城市选择</Link>
          </li>
        </ul>

        {/* 首页： */}
        {/* 外层路由，用来渲染整个 Home 页面 */}
        <Route path="/home" component={Home} />
        {/* 城市选择页面： */}
        <Route path="/citylist" component={CityList} />
      </div>
    </Router>
  )
}

// 导出App组件
export default App
