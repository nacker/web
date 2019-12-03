import React from 'react'

// 演示 antd-mobile 的使用：
// import { Button } from 'antd-mobile'

// 1 导入TabBar组件
import { TabBar } from 'antd-mobile'

import { Route } from 'react-router-dom'

// 导入该页面中的子路由组件
import Index from '../Index'
import HouseList from '../HouseList'
import News from '../News'
import Profile from '../Profile'

// 导入样式
import './index.css'

// 菜单项数据：
const TABBARLIST = [
  { title: '首页', icon: 'icon-ind', path: '/home' },
  { title: '找房', icon: 'icon-findHouse', path: '/home/list' },
  { title: '资讯', icon: 'icon-infom', path: '/home/news' },
  { title: '我的', icon: 'icon-my', path: '/home/profile' }
]

export default class Home extends React.Component {
  state = {
    // 指定当前选中的 tab 菜单
    selectedTab: this.props.location.pathname,
    // 指定 TabBar 菜单是否隐藏
    hidden: false,
    // 指定 TabBar 组件是否全屏显示
    fullScreen: true
  }

  // 渲染底部TabBar菜单项
  renderTabBarItems = () => {
    return TABBARLIST.map(item => (
      <TabBar.Item
        title={item.title}
        key={item.path}
        icon={<i className={`iconfont ${item.icon}`} />}
        selectedIcon={<i className={`iconfont ${item.icon}`} />}
        selected={this.state.selectedTab === item.path}
        onPress={() => {
          this.props.history.push(item.path)

          this.setState({
            selectedTab: item.path
          })
        }}
      />
    ))
  }

  render() {
    return (
      <div className="home">
        {/* 去掉了 /index ，但是，要给 Index 组件的路由规则添加 exact 属性 */}
        <Route exact path="/home" component={Index} />
        <Route path="/home/list" component={HouseList} />
        <Route path="/home/news" component={News} />
        <Route path="/home/profile" component={Profile} />

        {/* TabBar 组件的示例代码： */}
        <div className="tabbar">
          <TabBar tintColor="#21B97A" noRenderContent={true}>
            {this.renderTabBarItems()}
          </TabBar>
        </div>
      </div>
    )
  }
}
