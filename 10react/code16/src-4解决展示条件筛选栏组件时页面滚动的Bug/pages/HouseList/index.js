import React from 'react'

import { Flex, Toast } from 'antd-mobile'

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
import NoHouse from '../../components/NoHouse'

// 导入 Sticky 组件
import Sticky from '../../components/Sticky'

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
    count: 0,
    // 数据是否加载完成
    isLoaded: false
  }

  // 初始化数据，防止在 render 渲染时报错
  label = ''
  value = ''

  // 初始化 filters 数据
  filters = {}

  async componentDidMount() {
    const { label, value } = await getCurrentCity()
    this.label = label
    this.value = value

    this.searchHouseList()
  }

  // 接收 Filter 组件中传递过来的数据
  onFilter = filters => {
    this.filters = filters
    // 调用查询房源数据的方法
    this.searchHouseList()

    // 让当前页面滚动到顶部
    window.scrollTo(0, 0)
  }

  // 根据查询条件获取房源列表数据
  async searchHouseList(start = 1, end = 20) {
    // 开启loading
    Toast.loading('加载中...', 0, null, false)
    const res = await API.get('/houses', {
      params: {
        ...this.filters, // undefined 展示不报错
        cityId: this.value,
        start,
        end
      }
    })

    // 关闭loading
    Toast.hide()

    const { list, count } = res.data.body

    if (count > 0) {
      // 提示房源数量
      Toast.info(`共找到 ${count} 套房源`, 1.5, null, false)
    }

    // console.log('获取到数据为：', res)
    this.setState({
      list,
      count,
      isLoaded: true
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

  // 渲染房源列表数据
  renderHouseList() {
    const { count, isLoaded } = this.state

    // 只有数据加载完成的时候，再判断是否展示 NoHouse
    if (isLoaded && count <= 0) {
      return <NoHouse>没有找到房源，请您换个搜索条件吧~</NoHouse>
    }

    return (
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
    )
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
          <SearchHeader cityName={this.label} className={styles.listSearch} />
        </Flex>

        {/* 条件筛选栏组件 */}
        {/* 使用 Stikcy 组件包裹 Filter 组件，那么，Filter组件就具有了 吸顶功能 了 */}
        <Sticky height={40}>
          <Filter onFilter={this.onFilter} />
        </Sticky>

        {/* 房源列表 */}
        <div className={styles.houseList}>{this.renderHouseList()}</div>
      </div>
    )
  }
}
