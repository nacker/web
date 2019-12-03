import React from 'react'

import { Flex } from 'antd-mobile'

// 导入顶部搜索导航栏组件
import SearchHeader from '../../components/SearchHeader'

// 导入 Filter 组件
import Filter from './components/Filter'

import styles from './index.module.scss'

export default class HouseList extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        {/* 顶部搜索导航栏 */}
        <Flex className={styles.listHeader}>
          <i
            className="iconfont icon-back"
            onClick={() => this.props.history.go(-1)}
          />
          <SearchHeader cityName="上海" className={styles.listSearch} />
        </Flex>

        {/* 条件筛选栏组件 */}
        <Filter />
      </div>
    )
  }
}
