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

export default class Home extends React.Component {
  // 2 拷贝状态
  state = {
    // 指定当前选中的 tab 菜单
    selectedTab: 'blueTab',
    // 指定 TabBar 菜单是否隐藏
    hidden: false,
    // 指定 TabBar 组件是否全屏显示
    fullScreen: true
  }

  // 指定：每个 tabbar 菜单项中要渲染的内容
  renderContent(pageText) {
    return (
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          textAlign: 'center'
        }}
      >
        <div style={{ paddingTop: 60 }}>
          Clicked “{pageText}” tab， show “{pageText}” information
        </div>
        <a
          style={{
            display: 'block',
            marginTop: 40,
            marginBottom: 20,
            color: '#108ee9'
          }}
          onClick={e => {
            e.preventDefault()
            this.setState({
              hidden: !this.state.hidden
            })
          }}
        >
          Click to show/hide tab-bar
        </a>
        <a
          style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
          onClick={e => {
            e.preventDefault()
            this.setState({
              fullScreen: !this.state.fullScreen
            })
          }}
        >
          Click to switch fullscreen
        </a>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Route path="/home/index" component={Index} />
        <Route path="/home/list" component={HouseList} />
        <Route path="/home/news" component={News} />
        <Route path="/home/profile" component={Profile} />

        {/* TabBar 组件的示例代码： */}
        <div
          style={
            this.state.fullScreen
              ? { position: 'fixed', height: '100%', width: '100%', top: 0 }
              : { height: 400 }
          }
        >
          {/* 
            unselectedTintColor 指定：未选中 tabbar 菜单的文字颜色
            tintColor 指定：选中 tabbar 菜单的文字颜色
            barTintColor 指定：tabbar 的背景色
          */}
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="pink"
            hidden={this.state.hidden}
          >
            {/* 
              title 指定：当前 tabbar 菜单项的标题
              icon 指定：当前 tabbar 菜单项的图标
              selectedIcon 指定：当前 tabbar 菜单项选中的图标
              selected 指定：当前菜单项是否选中
              onPress 指定：单击事件
              badge 指定：徽标数
            */}
            <TabBar.Item
              title="Life123"
              key="Life"
              icon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background:
                      'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background:
                      'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
                  }}
                />
              }
              selected={this.state.selectedTab === 'blueTab'}
              badge={19}
              onPress={() => {
                this.setState({
                  selectedTab: 'blueTab'
                })
              }}
            >
              {this.renderContent('Life')}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background:
                      'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background:
                      'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                  }}
                />
              }
              title="Koubei"
              key="Koubei"
              badge={'new'}
              selected={this.state.selectedTab === 'redTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'redTab'
                })
              }}
              data-seed="logId1"
            >
              {this.renderContent('Koubei')}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background:
                      'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background:
                      'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
                  }}
                />
              }
              title="Friend"
              key="Friend"
              dot
              selected={this.state.selectedTab === 'greenTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'greenTab'
                })
              }}
            >
              {this.renderContent('Friend')}
            </TabBar.Item>
            <TabBar.Item
              icon={{
                uri:
                  'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg'
              }}
              selectedIcon={{
                uri:
                  'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg'
              }}
              title="My"
              key="my"
              selected={this.state.selectedTab === 'yellowTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'yellowTab'
                })
              }}
            >
              {this.renderContent('My')}
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
    )
  }
}
