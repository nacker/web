import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

// 导入 formik 组件
import { withFormik } from 'formik'

// 导入表单校验schema
import * as Yup from 'yup'

import { API, setToken } from '../../utils'

import NavHeader from '../../components/NavHeader'

import styles from './index.module.css'

// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
  render() {
    const {
      values,
      handleSubmit,
      handleChange,
      handleBlur,
      errors,
      touched
    } = this.props

    // errors 表示：错误消息
    // touched 表示：当前表单项是否被访问过，只要访问过，那么，当前值为 true
    // 注意： touched属性必须经过 handleBlur 处理过失焦点事件后，才会生效
    // console.log('表单校验：', errors, touched)

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
                onBlur={handleBlur}
                className={styles.input}
                name="username"
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {touched.username && errors.username && (
              <div className={styles.error}>{errors.username}</div>
            )}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              <input
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {touched.password && errors.password && (
              <div className={styles.error}>{errors.password}</div>
            )}
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
  mapPropsToValues: () => ({ username: '', password: '' }),

  // 表单校验规则：
  validationSchema: Yup.object().shape({
    // 校验username
    // 方法的参数表示不满足该条件时的错误消息提示
    username: Yup.string()
      .required('账号为必填项')
      .matches(REG_UNAME, '长度为5到8位，只能出现数字、字母、下划线'),
    password: Yup.string()
      .required('密码为必填项')
      .matches(REG_PWD, '长度为5到12位，只能出现数字、字母、下划线')
    // 校验password
  }),

  // 为表单提供事件处理程序
  // props 表示传递给被包装组件（Login）的属性，比如：路由信息
  handleSubmit: async (values, { props }) => {
    console.log('Fomik 表单提交：', props)

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
