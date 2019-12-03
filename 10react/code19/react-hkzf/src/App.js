import React, { lazy, Suspense } from 'react'

/* 
  1 导入 react-router-dom 中的三个组件
  2 导入页面组件
  3 配置路由规则
*/
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

// 导入页面组件
import Home from './pages/Home'

// import CityList from './pages/CityList'
// import Map from './pages/Map'
// import Details from './pages/Details'
// import Login from './pages/Login'
// // 发布房源页面
// import RentAdd from './pages/Rent/Add'
// import RentSearch from './pages/Rent/Search'
// import Rent from './pages/Rent'

// // 导入鉴权路由组件
// import AuthRoute from './components/AuthRoute'

const CityList = lazy(() => import('./pages/CityList'))
const Map = lazy(() => import('./pages/Map'))
const Details = lazy(() => import('./pages/Details'))
const Login = lazy(() => import('./pages/Login'))
const RentAdd = lazy(() => import('./pages/Rent/Add'))
const RentSearch = lazy(() => import('./pages/Rent/Search'))
const Rent = lazy(() => import('./pages/Rent'))
const AuthRoute = lazy(() => import('./components/AuthRoute'))

// 创建App组件
const App = () => {
  return (
    <Router>
      <Suspense fallback={<div className="lazy">loading...</div>}>
        <div className="app">
          {/* 注意：不要忘记添加 exact 属性 */}
          <Route exact path="/" render={() => <Redirect to="/home" />} />

          {/* 首页： */}
          {/* 外层路由，用来渲染整个 Home 页面 */}
          <Route path="/home" component={Home} />
          {/* 城市选择页面： */}
          <Route path="/citylist" component={CityList} />
          {/* 地图找房页面 */}
          <Route path="/map" component={Map} />
          {/* :id 就表示路由参数 */}
          <Route path="/details/:id" component={Details} />
          {/* 登录页面 */}
          <Route path="/login" component={Login} />

          {/* 配置需要登录后才能访问的页面 */}
          <AuthRoute exact path="/rent" component={Rent} />
          <AuthRoute path="/rent/add" component={RentAdd} />
          <AuthRoute path="/rent/search" component={RentSearch} />
        </div>
      </Suspense>
    </Router>
  )
}

// 导出App组件
export default App
