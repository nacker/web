import React from 'react'
import ReactDOM from 'react-dom'

// 1 安装路由包：yarn add react-router-dom
// 2 导入路由包中提供的三个组件： Router / Route / Link

// Router 组件：包裹整个组件，只有被包裹的内容，才能够使用路由。
// Route 组件：配置路由规则以及要展示的组件
//  path 属性表示：路由规则
//  component 属性表示：该路由规则匹配时要展示的组件
//  Route 组件放在页面中哪个位置，那么，组件的内容就会展示在哪个地方
// Link 组件：用来设置导航菜单
//  to 属性表示：浏览器地址栏中的 pathname （也就是当前路由的地址）
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// 使用 哈希值（浏览器地址栏中的 #/） 来实现路由：
// import { HashRouter as Router, Route, Link } from 'react-router-dom'

// 创建First组件
const First = () => <p>这是 First 组件的内容</p>
const Home = () => <div style={{ color: 'red' }}>这是 Home 组件</div>

class App extends React.Component {
  render() {
    return (
      // 3 使用 Router 组件包裹整个应用
      <Router>
        <div>
          <h1>使用 react 路由</h1>
          {/* 4 配置路由的入口（也就是一个导航菜单） */}
          <Link to="/first">页面一</Link>
          <br />
          <Link to="/home">首页</Link>

          {/* 5 配置路由的出口（配置路由规则和要展示的组件） */}
          <Route path="/first" component={First} />
          {/* <Route path="/first" component={First} /> */}

          {/* 再创建另一外一个路由： */}
          <Route path="/home" component={Home} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
