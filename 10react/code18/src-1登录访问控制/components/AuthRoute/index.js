import React from 'react'

import { Route, Redirect } from 'react-router-dom'

import { isAuth } from '../../utils'

/* 
  ① 在 components 目录中创建 AuthRoute/index.js 文件。
  ② 创建组件 AuthRoute 并导出。
  ③ 在 AuthRoute 组件中返回 Route 组件（在 Route 基础上做了一层包装，用于实现自定义功能）。
  ④ 给 Route 组件，添加 render 方法，指定该组件要渲染的内容（类似于 component 属性）。
  ⑤ 在 render 方法中，调用 isAuth() 判断是否登录。
  ⑥ 如果登录了，就渲染当前组件（通过参数 component 获取到要渲染的组件，需要重命名）。
  ⑦ 如果没有登录，就重定向到登录页面，并且指定登录成功后要跳转到的页面路径。
  ⑧ 将 AuthRoute 组件接收到的 props 原样传递给 Route 组件（保证与 Route 组件使用方式相同）。
  ⑨ 使用 AuthRoute 组件配置路由规则，验证能否实现页面的登录访问控制。

  // 去出租页面：
  <AuthRoute path="/rent/add" component={RentAdd} />
*/
const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        // props 表示：当前路由信息
        if (isAuth()) {
          // 登录
          // 注意：需要将 props 也就是路由信息传递给该组件，才能在被渲染的组件中获取到路由信息
          return <Component {...props} />
        } else {
          // 没有登录
          return (
            <Redirect
              to={{
                // 要跳转到的页面路径
                pathname: '/login',
                // 传递额外的数据，此处，用来指定登录后要返回的页面路径
                state: { from: props.location }
              }}
            />
          )
        }
      }}
    />
  )
}

export default AuthRoute
