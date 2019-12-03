import React from 'react'

// 演示 antd-mobile 的使用：
// import { Button } from 'antd-mobile'

import { Route } from 'react-router-dom'

// 导入该页面中的子路由组件
import Index from '../Index'
import HouseList from '../HouseList'
import News from '../News'
import Profile from '../Profile'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>这是首页</h1>

        {/* 为了在 Home 组件中，能够实现底部菜单的切换，就需要使用 子路由 来实现 */}
        {/* 
          为了能够同时展示 父路由和子路由，就需要 pathname 可以同时被 父路由的路由规则 和 子路由的路由规则匹配，因此，就让子路由的路由规则以父路由的路由规则开头。 

          如何记忆？子路由的path以父路由的path开头即可

          比如：
            http://localhost:3000/home/profile

            父路由：<Route path="/home" component={Home} />
            子路由：<Route path="/home/profile" component={}></Route>
        */}
        <Route path="/home/index" component={Index} />
        <Route path="/home/list" component={HouseList} />
        <Route path="/home/news" component={News} />
        <Route path="/home/profile" component={Profile} />

        {/* 渲染 Button 组件 */}
        {/* <Button type="primary">登录</Button> */}
      </div>
    )
  }
}
