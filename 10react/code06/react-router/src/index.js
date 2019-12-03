import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// 创建First组件
// 只要一个组件是通过路由渲染出来的，那么，这个组件中就可以通过 props 来获取到路由中的信息
const First = props => {
  console.log('First组件的props：', props)
  const handleClick = () => {
    // push 方法用来实现路由的跳转
    // 参数：表示要跳转到的路由的路径
    props.history.push('/login')
  }

  return (
    <p>
      这是 First 组件的内容
      <button onClick={handleClick}>跳转到登录页面</button>
    </p>
  )
}

const Home = () => <p>这是首页，进入页面时，就会展示该组件内容</p>

class App extends React.Component {
  render() {
    return (
      // 3 使用 Router 组件包裹整个应用
      <Router>
        <div>
          <h1>使用 react 路由</h1>
          {/* 4 配置路由的入口（也就是一个导航菜单） */}
          <Link to="/first">页面一</Link>

          {/* 5 配置路由的出口（配置路由规则和要展示的组件） */}
          <Route path="/first" component={First} />

          {/* 使用默认路由配置： */}
          {/* 添加 exact 变为精确匹配 */}
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
