import React from 'react'

// 导入属性校验
import PropTypes from 'prop-types'

// 导入 NavBar 组件
import { NavBar } from 'antd-mobile'

// 导入 withRouter 高阶组件
import { withRouter } from 'react-router-dom'

// 导入该组件自己的样式
import styles from './index.module.scss'

function NavHeader({ children, history, className, rightContent }) {
  return (
    <NavBar
      className={[styles.navBar, className].join(' ')}
      mode="light"
      icon={<i className="iconfont icon-back" />}
      onLeftClick={() => history.go(-1)}
      rightContent={rightContent}
    >
      {children}
    </NavBar>
  )
}

// 添加props校验
NavHeader.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default withRouter(NavHeader)
