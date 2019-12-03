import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import { API, setToken } from '../../utils'

import NavHeader from '../../components/NavHeader'

import styles from './index.module.css'

// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
  state = {
    // 账号
    username: '',
    // 密码
    password: ''
  }

  // 获取账号的值
  handleUserName = e => {
    this.setState({
      username: e.target.value
    })
  }

  // 获取密码
  handlePassword = e => {
    this.setState({
      password: e.target.value
    })
  }

  // 表单提交事件
  handleSubmit = async e => {
    // 阻止表单提交的默认行为
    e.preventDefault()

    const { username, password } = this.state
    // console.log('表单提交：', username, password)

    const res = await API.post('/user/login', {
      username,
      password
    })

    const {
      status,
      description,
      body: { token }
    } = res.data

    if (status === 200) {
      // 登录成功
      setToken(token)
      // 返回登录前的页面
      this.props.history.go(-1)
    } else {
      // 登录失败
      Toast.info(description, 2, null, false)
    }
  }

  render() {
    const { username, password } = this.state

    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader}>账号登录</NavHeader>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={this.handleSubmit}>
            <div className={styles.formItem}>
              <input
                value={username}
                onChange={this.handleUserName}
                className={styles.input}
                name="username"
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              <input
                value={password}
                onChange={this.handlePassword}
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

export default Login
