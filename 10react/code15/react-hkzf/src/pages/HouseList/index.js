import React from 'react'

import { Flex } from 'antd-mobile'

import {
  List,
  AutoSizer,
  WindowScroller,
  InfiniteLoader
} from 'react-virtualized'

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
  async searchHouseList(start = 1, end = 20) {
    const { value } = await getCurrentCity()

    const res = await API.get('/houses', {
      params: {
        ...this.filters, // undefined 展示不报错
        cityId: value,
        start,
        end
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

    // console.log('当前列表项：', item, index)
    if (!item) {
      return (
        <div key={key} style={style}>
          <p className={styles.loading} />
        </div>
      )
    }

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

  // 用来确定当前行是否加载完成
  isRowLoaded = ({ index }) => {
    return !!this.state.list[index]
  }

  // 加载更多数据
  // startIndex 起始索引号
  // stopIndex 结束索引号
  loadMoreRows = ({ startIndex, stopIndex }) => {
    return new Promise(async resolve => {
      // 等到数据加载完成的时候，调用 resolve 来完成该 Promise 即可
      const { value } = await getCurrentCity()

      const res = await API.get('/houses', {
        params: {
          ...this.filters, // undefined 展示不报错
          cityId: value,
          start: startIndex + 1,
          end: stopIndex
        }
      })

      resolve()

      // 注意：拿到最新的数据后，要追加数据，而不是覆盖现有数据！
      const { count, list } = res.data.body
      this.setState({
        list: [...this.state.list, ...list],
        count
      })
    })
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
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          rowCount={count}
          minimumBatchSize={21} // 每次额外加载的最小条数
        >
          {({ onRowsRendered, registerChild }) => (
            <WindowScroller>
              {({ height, isScrolling, scrollTop }) => {
                // console.log('WindowScroller:', height)
                return (
                  <AutoSizer>
                    {({ width }) => (
                      <List
                        width={width}
                        autoHeight
                        height={height}
                        rowCount={count}
                        rowHeight={HOUSE_ITEM_HEIGHT}
                        rowRenderer={this.rowRenderer}
                        isScrolling={isScrolling}
                        scrollTop={scrollTop}
                        onRowsRendered={onRowsRendered}
                        ref={registerChild}
                      />
                    )}
                  </AutoSizer>
                )
              }}
            </WindowScroller>
          )}
        </InfiniteLoader>
      </div>
    )
  }
}
