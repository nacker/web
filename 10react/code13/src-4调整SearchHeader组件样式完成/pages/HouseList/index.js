import React from 'react'

import { Flex } from 'antd-mobile'

// 导入顶部搜索导航栏组件
import SearchHeader from '../../components/SearchHeader'

import styles from './index.module.scss'

export default class HouseList extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        {/* 顶部搜索导航栏 */}
        <Flex className={styles.listHeader}>
          <i className="iconfont icon-back" />
          <SearchHeader cityName="上海" className={styles.listSearch} />
        </Flex>
      </div>
    )
  }
}
