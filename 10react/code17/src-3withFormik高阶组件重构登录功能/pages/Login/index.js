import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

// 导入 formik 组件
import { withFormik } from 'formik'

import { API, setToken } from '../../utils'

import NavHeader from '../../components/NavHeader'

import styles from './index.module.css'

// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
  render() {
    const { values, handleSubmit, handleChange } = this.props

    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader}>账号登录</NavHeader>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={handleSubmit}>
            <div className={styles.formItem}>
              <input
                value={values.username}
                onChange={handleChange}
                className={styles.input}
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              <input
                value={values.password}
                onChange={handleChange}
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

// 使用 withFormik 高阶组件包装我们自己的 Login 组件
// withFormik() 第一次调用：可以传入一些配置对象
// 第二次调用，再包装组件
Login = withFormik({
  // 为表单提供状态值，相当于原来在 Login 组件 state 中添加的状态
  mapPropsToValues: () => ({ username: 'test1', password: 'test1' }),

  // 为表单提供事件处理程序
  // props 表示传递给被包装组件（Login）的属性，比如：路由信息
  handleSubmit: async (values, { props }) => {
    console.log('Fomik：', props)

    const { username, password } = values

    const res = await API.post('/user/login', {
      username,
      password
    })

    const { status, description, body } = res.data

    if (status === 200) {
      // 登录成功
      setToken(body.token)
      // 返回登录前的页面
      props.history.go(-1)
    } else {
      // 登录失败
      Toast.info(description, 2, null, false)
    }
  }
})(Login)

// 注意：最终导出的组件应该是 高阶组件 包装后的组件
export default Login
