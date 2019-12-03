import React from 'react'

import { Flex } from 'antd-mobile'

import { List, AutoSizer } from 'react-virtualized'

// 导入API
import { API, getCurrentCity, BASE_URL } from '../../utils'

// 导入顶部搜索导航栏组件
import SearchHeader from '../../components/SearchHeader'
import HouseItem from '../../components/HouseItem'

// 导入 Filter 组件
import Filter from './components/Filter'

import styles from './index.module.scss'

// 房源列表项高度
const HOUSE_ITEM_HEIGHT = 120

export default class HouseList extends React.Component {
  state = {
    // 房源列表
    list: [],
    // 房源总数量
    count: 0
  }

  // 初始化 filters 数据
  filters = {}

  componentDidMount() {
    this.searchHouseList()
  }

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
        ...this.filters, // undefined 展示不报错
        cityId: value,
        start: 1,
        end: 20
      }
    })

    const { list, count } = res.data.body
    // console.log('获取到数据为：', res)
    this.setState({
      list,
      count
    })
  }

  // 渲染房源列表每一行数据
  rowRenderer = ({ key, index, style }) => {
    const { list } = this.state
    const item = list[index]

    // 注意：此处 style 需要组件 HouseItem 配合
    return (
      <HouseItem
        key={key}
        style={style}
        {...item}
        houseImg={`${BASE_URL}${item.houseImg}`}
        onClick={() => this.props.history.push(`/details/${item.houseCode}`)}
      />
    )
  }

  render() {
    const { count } = this.state

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

        {/* 房源列表 */}
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowCount={count}
              rowHeight={HOUSE_ITEM_HEIGHT}
              rowRenderer={this.rowRenderer}
            />
          )}
        </AutoSizer>
      </div>
    )
  }
}
