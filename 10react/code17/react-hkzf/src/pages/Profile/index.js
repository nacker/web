import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Grid, Button, Modal } from 'antd-mobile'

import { BASE_URL, isAuth, API, getToken, removeToken } from '../../utils'

import styles from './index.module.scss'

// 菜单数据
const menus = [
  { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
  { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
  { id: 3, name: '看房记录', iconfont: 'icon-record' },
  {
    id: 4,
    name: '成为房主',
    iconfont: 'icon-identity'
  },
  { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
  { id: 6, name: '联系我们', iconfont: 'icon-cust' }
]

// 默认头像
const DEFAULT_AVATAR = BASE_URL + '/img/profile/avatar.png'

const alert = Modal.alert

export default class Profile extends Component {
  state = {
    // 是否登录
    isLogin: isAuth(),
    // 用户信息
    userInfo: {
      avatar: '/img/profile/avatar.png',
      nickname: '游客'
    }
  }

  componentDidMount() {
    this.getUserInfo()
  }

  // 获取个人资料
  async getUserInfo() {
    // 没有登录的时候，不发送请求
    if (!this.state.isLogin) return

    // 登录了，就发送请求，获取用户个人资料
    const res = await API.get('/user', {
      headers: {
        authorization: getToken()
      }
    })

    const { status, body } = res.data

    if (status === 400) {
      // 登录失败：token异常或者过期
      // 此时，就直接移除 token
      removeToken()
      // 重置登录状态，因为token失效，所以，实际此时就是没有登录。那么，将 isLogin 设置为 false即可
      this.setState({
        isLogin: false
      })
    } else if (status === 200) {
      this.setState({
        userInfo: body
      })
    }
  }

  // 退出
  logout = () => {
    alert('提示', '是否确定退出?', [
      { text: '取消' },
      {
        text: '退出',
        onPress: async () => {
          // 服务器退出
          await API.post('/user/logout', {
            headers: {
              authorization: getToken()
            }
          })

          // 本地退出
          removeToken()

          // 更新登录状态
          this.setState({
            isLogin: false,
            userInfo: {}
          })
        }
      }
    ])
  }

  render() {
    const { history } = this.props
    const {
      isLogin,
      userInfo: { avatar, nickname }
    } = this.state

    return (
      <div className={styles.root}>
        {/* 个人信息 */}
        <div className={styles.title}>
          <img
            className={styles.bg}
            src={BASE_URL + '/img/profile/bg.png'}
            alt="背景图"
          />
          <div className={styles.info}>
            <div className={styles.myIcon}>
              <img
                className={styles.avatar}
                src={isLogin ? `${BASE_URL}${avatar}` : DEFAULT_AVATAR}
                alt="icon"
              />
            </div>
            <div className={styles.user}>
              <div className={styles.name}>{isLogin ? nickname : '游客'}</div>
              {/* 根据登录状态来决定展示什么内容 */}
              {isLogin ? (
                <>
                  <div className={styles.auth}>
                    <span onClick={this.logout}>退出</span>
                  </div>
                  <div className={styles.edit}>
                    编辑个人资料
                    <span className={styles.arrow}>
                      <i className="iconfont icon-arrow" />
                    </span>
                  </div>
                </>
              ) : (
                <div className={styles.edit}>
                  <Button
                    type="primary"
                    size="small"
                    inline
                    onClick={() => history.push('/login')}
                  >
                    去登录
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 九宫格菜单 */}
        <Grid
          data={menus}
          columnNum={3}
          hasLine={false}
          renderItem={item =>
            item.to ? (
              <Link to={item.to}>
                <div className={styles.menuItem}>
                  <i className={`iconfont ${item.iconfont}`} />
                  <span>{item.name}</span>
                </div>
              </Link>
            ) : (
              <div className={styles.menuItem}>
                <i className={`iconfont ${item.iconfont}`} />
                <span>{item.name}</span>
              </div>
            )
          }
        />

        {/* 加入我们 */}
        <div className={styles.ad}>
          <img src={BASE_URL + '/img/profile/join.png'} alt="" />
        </div>
      </div>
    )
  }
}
