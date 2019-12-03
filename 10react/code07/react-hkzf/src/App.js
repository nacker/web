import React from 'react'

/* 
  1 导入 react-router-dom 中的三个组件
  2 导入页面组件
  3 配置路由规则
*/
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

// 导入页面组件
import Home from './pages/Home'
import CityList from './pages/CityList'

// 创建App组件
const App = () => {
  return (
    <Router>
      <div className="app">
        {/* 默认路由： */}
        {/* 
          render 属性的值是一个函数，通过该函数的返回值，来指定要渲染的内容；这个内容会在当前 路由规则 匹配时来展示。 
          实际上这就是 render-props 模式。
        */}
        {/* <Route
          path="/"
          render={props => {
            console.log('render props模式：', props)
            return <h1>这是默认路由的内容</h1>
          }}
        /> */}

        {/* Redirect 组件：重定向组件，通过 to 属性来指定要重定向到的路由地址 */}
        {/* 注意：不要忘记添加 exact 属性 */}
        <Route exact path="/" render={() => <Redirect to="/home" />} />

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
