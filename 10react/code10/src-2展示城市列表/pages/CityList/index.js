import React from 'react'

import { NavBar } from 'antd-mobile'

// 导入 react-virtualized 组件
import { List, AutoSizer } from 'react-virtualized'

import axios from 'axios'

// 导入获取定位城市数据的方法
import { getCurrentCity } from '../../utils'

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

export default class CityList extends React.Component {
  state = {
    // 城市列表数据（按字母顺序分类）
    cityList: {},
    // 城市索引列表
    cityIndex: []
  }

  componentDidMount() {
    this.fetchCityList()
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
    this.setState({
      cityList,
      cityIndex
    })
  }

  // 渲染每一行的方法
  // 注意：方法中 this 指向的问题
  rowRenderer = ({ key, index, style }) => {
    // 每条数据中，索引只有一个；城市名称可能是有多个；
    // 所以，需要遍历生成对应索引下的所有城市列表
    // console.log(this)
    const { cityIndex, cityList } = this.state

    // 字母索引：
    const letter = cityIndex[index]
    // 字母索引对应的城市列表数据
    const list = cityList[letter]

    return (
      <div key={key} style={style} className="city">
        <div className="title">{formatCityIndex(letter)}</div>
        {list.map(item => (
          <div key={item.value} className="name">
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

  render() {
    return (
      <div className="citylist">
        <NavBar
          className="navbar"
          mode="light"
          icon={<i className="iconfont icon-back" />}
          onLeftClick={() => console.log('onLeftClick')}
        >
          城市选择
        </NavBar>

        {/* 城市列表： */}
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.calcRowHeight}
              rowRenderer={this.rowRenderer}
            />
          )}
        </AutoSizer>
      </div>
    )
  }
}
