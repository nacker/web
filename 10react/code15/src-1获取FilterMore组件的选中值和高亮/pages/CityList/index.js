import React from 'react'

import { Toast } from 'antd-mobile'

// 导入 react-virtualized 组件
import { List, AutoSizer } from 'react-virtualized'

import axios from 'axios'

// 导入 顶部导航栏 组件
import NavHeader from '../../components/NavHeader'

// 导入获取定位城市数据的方法
import { getCurrentCity, setCity } from '../../utils'

import './index.scss'

// 封装一个函数专门用来处理城市列表数据
// list: [{}, {}, {}]
// cityList: { a: [], b: [] }  ---> 1 先获取该数据
// cityIndex: ['a', 'b']       ---> 2 直接通过从 对象 中获取对象的键即可 Object.keys()
const formatCityList = list => {
  const cityList = {}
  // const cityIndex = []

  // 打断点：
  // debugger

  // 1 遍历通过接口获取到的城市列表数据（list）
  list.forEach(item => {
    // 2 获取到当前城市的索引（首字母）
    const firstLetter = item.short.substr(0, 1)
    // 3 判断 cityList 对象中，是否包含该索引
    // if (cityList[firstLetter]) {
    if (firstLetter in cityList) {
      // 5 如果有，直接追加到当前数组中
      cityList[firstLetter].push(item)
    } else {
      // 4 如果没有，就给 cityList 添加当前索引（key），并且把当前城市添加到数组中
      // 4.1 给对象添加属性，键为：当前首字母
      // 4.2 给这个键添加值，值是一个数组，并且要把当前城市一起添加到数组中
      cityList[firstLetter] = [item]
    }
  })

  // 获取城市索引
  // Object.keys(obj) 作用：获取对象中所有的键，并且放到一个数组中返回
  const cityIndex = Object.keys(cityList).sort()

  return {
    cityList,
    cityIndex
  }
}

// 封装一个函数专门用来处理城市列表索引名称
const formatCityIndex = letter => {
  switch (letter) {
    case '#':
      return '当前定位'

    case 'hot':
      return '热门城市'

    default:
      return letter.toUpperCase()
  }
}

// 索引高度
const INDEX_HEIGHT = 36
// 城市名称高度
const CITY_NAME_HEIGHT = 50
// 有房源的城市列表
const CITY_HAS_HOUSE = ['北京', '上海', '广州', '深圳']

export default class CityList extends React.Component {
  state = {
    // 城市列表数据（按字母顺序分类）
    cityList: {},
    // 城市索引列表
    cityIndex: [],

    // 右侧索引高亮索引号
    activeIndex: 0
  }

  // 创建 ref 对象，用来获取 List 组件实例
  listRef = React.createRef()

  async componentDidMount() {
    await this.fetchCityList()

    // 调用 List 组件的方法，来提前计算出每一行的高度。为右侧城市索引跳转城市列表打好基础
    // 注意：该方法需要等到数据加载后，再执行，才能计算出列表中每一行的高度
    this.listRef.current.measureAllRows()
  }

  // 获取城市列表数据
  async fetchCityList() {
    const res = await axios.get('http://localhost:8080/area/city?level=1')
    // console.log('获取到的城市列表数据：', res)

    const { cityList, cityIndex } = formatCityList(res.data.body)

    // 获取热门城市数据，也添加到上面的数据中
    const hotRes = await axios.get('http://localhost:8080/area/hot')

    // 约定使用 hot 来作为 热门城市 的索引
    // 注意：索引顺序
    cityIndex.unshift('hot')
    cityList['hot'] = hotRes.data.body

    // 获取当前定位城市
    // const curCity = getCurrentCity((label, value) => {})
    // curCity => { label, value }

    // curCity => { label: '', value: '' }
    const curCity = await getCurrentCity()

    // 添加当前定位城市
    cityIndex.unshift('#')
    cityList['#'] = [curCity]

    // console.log(cityList, cityIndex)
    this.setState(
      {
        cityList,
        cityIndex
      }
      // ,
      // () => {
      //   // 调用 List 组件的方法，来提前计算出每一行的高度。为右侧城市索引跳转城市列表打好基础
      //   // this.listRef.current.measureAllRows()
      // }
    )
  }

  // 切换城市
  changeCity = ({ label, value }) => {
    if (CITY_HAS_HOUSE.indexOf(label) > -1) {
      // 有房源
      // console.log('有房源')
      // 保存当前城市信息到本地缓存中
      setCity({ label, value })
      // 返回上一页
      this.props.history.go(-1)
    } else {
      // 没有房源
      // console.log('没有房源')
      // 有遮罩层：
      // Toast.info('该城市暂无房源数据', 1)
      // 没有遮罩层：
      Toast.info('该城市暂无房源数据', 1, null, false)
    }
  }

  // 渲染每一行的方法
  // 注意：方法中 this 指向的问题
  rowRenderer = ({ key, index, style }) => {
    // 每条数据中，索引只有一个；城市名称可能是有多个；
    // 所以，需要遍历生成对应索引下的所有城市列表
    // console.log(this)
    // cityList: { a: [], b: [] }
    // cityIndex: ['a', 'b', ...]
    const { cityIndex, cityList } = this.state

    // 字母索引：
    const letter = cityIndex[index]
    // 字母索引对应的城市列表数据
    const list = cityList[letter]

    return (
      <div key={key} style={style} className="city">
        <div className="title">{formatCityIndex(letter)}</div>
        {list.map(item => (
          <div
            key={item.value}
            className="name"
            onClick={() => this.changeCity(item)}
          >
            {item.label}
          </div>
        ))}
      </div>
    )
  }

  // 动态计算每一行的高度
  calcRowHeight = ({ index }) => {
    // console.log('动态计算每一行的高度：', index)
    const { cityIndex, cityList } = this.state

    // 字母索引：
    const letter = cityIndex[index]
    // 字母索引对应的城市列表数据
    const list = cityList[letter]

    // 公式： 索引高度 + 城市名称高度 * 数量
    // 索引高度：36
    // 城市名称高度：50
    return INDEX_HEIGHT + CITY_NAME_HEIGHT * list.length
    // return 100
  }

  // 根据城市索引，跳转到指定索引号的列
  goToCityIndex = index => {
    // console.log('当前索引号为：', index, this.listRef)
    // 通过 ref 来拿到组件实例，然后，调用 scrollToRow 方法，将当前索引号作为参数传递
    // 文档：https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md#scrolltorow-index-number
    this.listRef.current.scrollToRow(index)
  }

  // 渲染右侧索引列表
  renderCityIndex() {
    const { cityIndex, activeIndex } = this.state

    return cityIndex.map((item, index) => (
      <li
        className="city-index-item"
        key={item}
        onClick={() => this.goToCityIndex(index)}
      >
        {/* 高亮类名： index-active */}
        <span className={index === activeIndex ? 'index-active' : ''}>
          {item === 'hot' ? '热' : item.toUpperCase()}
        </span>
      </li>
    ))
  }

  // List 组件滚动时，会触发该方法
  onRowsRendered = ({ startIndex }) => {
    // console.log('startIndex：', startIndex)
    // 添加判断：判断当前 state 中的高亮索引 和 startIndex 是否相同，如果不相同再改变
    if (this.state.activeIndex !== startIndex) {
      this.setState({
        activeIndex: startIndex
      })
    }
  }

  render() {
    return (
      <div className="citylist">
        <NavHeader>城市选择</NavHeader>

        {/* 城市列表： */}
        <AutoSizer>
          {({ width, height }) => (
            <List
              ref={this.listRef}
              width={width}
              height={height}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.calcRowHeight}
              rowRenderer={this.rowRenderer}
              onRowsRendered={this.onRowsRendered}
              scrollToAlignment="start"
            />
          )}
        </AutoSizer>

        {/* 右侧城市索引列表 */}
        <ul className="city-index">{this.renderCityIndex()}</ul>
      </div>
    )
  }
}
