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

  // 因为点击 Index首页 菜单，切换路由的时候，触发了 Home 组件的更新阶段
  // 所以，我们只要在更新阶段的钩子函数中，来处理下 菜单 高亮即可
  componentDidUpdate(prevProps) {
    // console.log('Home 组件更新了，路由发生了切换')

    // console.log('上一次的props：', prevProps)
    // console.log('最新的props：', this.props)

    const pathName = this.props.location.pathname
    const prevPathName = prevProps.location.pathname

    // 注意：该钩子函数中可以调用 setState() 来更新状态，但是，必须得放在一个条件判断中
    // 才可以，否则，会造成递归渲染的Bug。
    // 菜单高亮，实际上只在路由地址发生切换时，再重新设置高亮即可
    // 所以，我们把菜单高亮状态的更新放在 判断 中，通过比较 更新前、后 两次 pathname 来判断
    // 路由是否发生切换。如果两次值不同，则说明路由切换了，此时，调用 setState() 更新状态即可
    if (pathName !== prevPathName) {
      this.setState({
        selectedTab: pathName
      })
    }
    /* 
      this.setState({
        selectedTab: item.path
      })
    */
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
          // 路由地址切换，让组件更新（ 组件接收到新的props --> 新的路由信息 ）
          this.props.history.push(item.path)

          // 因为添加 componentDidUpdate 钩子函数，在这个钩子函数中，已经处理了
          // 组件更新时，来让菜单高亮，所以，这个代码就可以省略了。
          // this.setState({
          //   selectedTab: item.path
          // })
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
