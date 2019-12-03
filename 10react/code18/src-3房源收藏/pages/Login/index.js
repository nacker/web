import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

// 导入 formik 组件
import { withFormik, Form, Field, ErrorMessage } from 'formik'

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
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader}>账号登录</NavHeader>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <Form>
            <div className={styles.formItem}>
              <Field
                name="username"
                placeholder="请输入账号"
                className={styles.input}
              />
            </div>
            <ErrorMessage
              name="username"
              component="div"
              className={styles.error}
            />
            <div className={styles.formItem}>
              <Field
                name="password"
                type="password"
                placeholder="请输入密码"
                className={styles.input}
              />
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className={styles.error}
            />
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </Form>
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
      // props.history.go(-1)

      // 需要根据 location.state 来决定返回哪个页面
      if (props.location.state) {
        // 此时，用户是通过访问一个需要登录的页面跳转过来的。应该返回用户要返回的页面
        // 访问路径历史记录：/home -> /login -> /rent/add
        // 当前浏览器的历史记录：['/home', '/login'] -> /login 表示最新的记录
        // 使用 push 方法跳转路由的时候，相当于往浏览器的历史记录中追加数据：
        //    => ['/home', '/login', '/rent/add']
        // 可以使用路由的 replace 方法跳转路由，相当于将浏览器历史记录中的当前值替换掉：
        //    => ['/home', '/rent/add']
        //    此时，再返回，就可以回到 /home 页面了
        // props.history.push(props.location.state.from.pathname)
        props.history.replace(props.location.state.from.pathname)
      } else {
        // 此时，用户是主动进入登录页面。应该返回上一页
        props.history.go(-1)
      }
    } else {
      // 登录失败
      Toast.info(description, 2, null, false)
    }
  }
})(Login)

// 注意：最终导出的组件应该是 高阶组件 包装后的组件
export default Login
