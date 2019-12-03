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

export default class Home extends React.Component {
  // 2 拷贝状态
  state = {
    // 指定当前选中的 tab 菜单
    selectedTab: this.props.location.pathname,
    // 指定 TabBar 菜单是否隐藏
    hidden: false,
    // 指定 TabBar 组件是否全屏显示
    fullScreen: true
  }

  render() {
    return (
      <div className="home">
        <Route path="/home/index" component={Index} />
        <Route path="/home/list" component={HouseList} />
        <Route path="/home/news" component={News} />
        <Route path="/home/profile" component={Profile} />

        {/* TabBar 组件的示例代码： */}
        <div className="tabbar">
          {/* 
            unselectedTintColor 指定：未选中 tabbar 菜单的文字颜色
            tintColor 指定：选中 tabbar 菜单的文字颜色
            barTintColor 指定：tabbar 的背景色
          */}
          <TabBar tintColor="#21B97A" noRenderContent={true}>
            {/* 
              title 指定：当前 tabbar 菜单项的标题
              icon 指定：当前 tabbar 菜单项的图标
              selectedIcon 指定：当前 tabbar 菜单项选中的图标
              selected 指定：当前菜单项是否选中
              onPress 指定：单击事件
              badge 指定：徽标数
            */}
            <TabBar.Item
              title="首页"
              key="Life"
              icon={<i className="iconfont icon-ind" />}
              selectedIcon={<i className="iconfont icon-ind" />}
              selected={this.state.selectedTab === '/home/index'}
              onPress={() => {
                this.props.history.push('/home/index')

                this.setState({
                  selectedTab: '/home/index'
                })
              }}
            />
            <TabBar.Item
              icon={<i className="iconfont icon-findHouse" />}
              selectedIcon={<i className="iconfont icon-findHouse" />}
              title="找房"
              key="Koubei"
              selected={this.state.selectedTab === '/home/list'}
              onPress={() => {
                this.props.history.push('/home/list')

                this.setState({
                  selectedTab: '/home/list'
                })
              }}
            />
            <TabBar.Item
              icon={<i className="iconfont icon-infom" />}
              selectedIcon={<i className="iconfont icon-infom" />}
              title="资讯"
              key="Friend"
              selected={this.state.selectedTab === '/home/news'}
              onPress={() => {
                this.props.history.push('/home/news')

                this.setState({
                  selectedTab: '/home/news'
                })
              }}
            />
            <TabBar.Item
              icon={<i className="iconfont icon-my" />}
              selectedIcon={<i className="iconfont icon-my" />}
              title="我的"
              key="my"
              selected={this.state.selectedTab === '/home/profile'}
              onPress={() => {
                this.props.history.push('/home/profile')

                this.setState({
                  selectedTab: '/home/profile'
                })
              }}
            />
          </TabBar>
        </div>
      </div>
    )
  }
}
