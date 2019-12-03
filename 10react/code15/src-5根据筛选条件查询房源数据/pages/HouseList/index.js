import React from 'react'

import { Flex } from 'antd-mobile'

// 导入API
import { API, getCurrentCity } from '../../utils'

// 导入顶部搜索导航栏组件
import SearchHeader from '../../components/SearchHeader'

// 导入 Filter 组件
import Filter from './components/Filter'

import styles from './index.module.scss'

export default class HouseList extends React.Component {
  // 初始化 filters 数据
  // fitlers = {}

  // 接收 Filter 组件中传递过来的数据
  onFilter = filters => {
    this.filters = filters
    // 调用查询房源数据的方法
    this.searchHouseList()
  }

  // 根据查询条件获取房源列表数据
  async searchHouseList() {
    const { value } = await getCurrentCity()

    const res = await API.get('/houses', {
      params: {
        ...this.filters,
        cityId: value,
        start: 1,
        end: 20
      }
    })

    console.log('获取到数据为：', res)
  }

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
        <Filter onFilter={this.onFilter} />
      </div>
    )
  }
}
