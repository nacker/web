/* 
  条件筛选栏 - 父组件
*/
import React, { Component } from 'react'

// 导入动画库组件
import { Spring } from 'react-spring/renderprops'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

// 导入API
import { API, getCurrentCity } from '../../../../utils'

import styles from './index.module.css'

const titleSelectedStatus = {
  // false 表示不亮；true 表示高亮
  area: false,
  mode: false,
  price: false,
  more: false
}

// 选中值对象：用来设置每一次的选中值
const selectedValues = {
  area: ['area', 'null'],
  mode: ['null'],
  price: ['null'],
  more: []
}

export default class Filter extends Component {
  state = {
    // 标题高亮数据
    titleSelectedStatus,
    // 表示展示对话框的类型（ 有可能展示 FilterPicker 组件，有可能展示 FilterMore 组件 ）
    openType: '',
    // 筛选条件数据
    filtersData: {},
    // 选中值对象：用来设置每一次的选中值
    selectedValues
  }

  componentDidMount() {
    this.getFiltersData()

    // 在组件渲染完成时，获取到 body 对象
    this.htmlBody = document.body
  }

  // 获取所有筛选条件数据
  async getFiltersData() {
    // 当前定位城市id
    const { value } = await getCurrentCity()

    const res = await API.get('/houses/condition', {
      params: {
        id: value
      }
    })

    // console.log(res)
    this.setState({
      filtersData: res.data.body
    })
  }

  // 切换标题高亮
  // 参数 type 表示：当前点击菜单的类型
  changeTitleSelected = type => {
    // 给 body 添加一个类名，让其超过部分隐藏
    this.htmlBody.className = 'hidden'

    // 1 在标题点击事件 onTitleClick 方法中，获取到两个状态：标题选中状态对象和筛选条件的选中值对象。
    // titleSelectedStatus => { area: false, mode: true, ... }
    // selectedValues => { area: [], mode: [], ... }
    const { titleSelectedStatus, selectedValues } = this.state
    // 2 根据当前标题选中状态对象，获取到一个新的标题选中状态对象（newTitleSelectedStatus）
    const newTitleSelectedStatus = { ...titleSelectedStatus }

    // 3 使用 Object.keys() 方法，遍历标题选中状态对象。
    // Object.keys(titleSelectedStatus) => ['area', 'mode', ...]
    Object.keys(titleSelectedStatus).forEach(key => {
      // 获取每一个菜单的选中项
      const selectedVal = selectedValues[key]

      // 4 先判断是否为当前标题，如果是，直接让该标题选中状态为 true（高亮）。
      // 5 否则，分别判断每个标题的选中值是否与默认值相同。
      // 6 如果不同，则设置该标题的选中状态为 true。
      // 7 如果相同，则设置该标题的选中状态为 false。
      if (key === type) {
        // 设置为true，就表示高亮
        newTitleSelectedStatus[type] = true
      } else {
        // 当前类型是否选中
        const typeSelected = this.getTitleSelectedStatus(key, selectedVal)
        // 将 typeSelected 对象中的属性，添加到 newTitleSelectedStatus，重名的属性，后面覆盖前面
        // newTitleSelectedStatus ==> { area: false, mode: false }
        // typeSelected ==> { area: true }
        // 结果为： { area: true, mode: false }
        Object.assign(newTitleSelectedStatus, typeSelected)
      }
    })

    this.setState({
      // 8 更新状态 titleSelectedStatus 的值为：newTitleSelectedStatus
      titleSelectedStatus: newTitleSelectedStatus,

      openType: type
    })
  }

  // 封装菜单高亮逻辑
  getTitleSelectedStatus(type, selectedVal) {
    const newTitleSelectedStatus = {}

    if (
      type === 'area' &&
      (selectedVal.length === 3 || selectedVal[0] === 'subway')
    ) {
      // 选中
      newTitleSelectedStatus[type] = true
    } else if (type === 'mode' && selectedVal[0] !== 'null') {
      // 选中
      newTitleSelectedStatus[type] = true
    } else if (type === 'price' && selectedVal[0] !== 'null') {
      // 选中
      newTitleSelectedStatus[type] = true
    } else if (type === 'more' && selectedVal.length > 0) {
      // 选中
      newTitleSelectedStatus[type] = true
    } else {
      // 不选中
      newTitleSelectedStatus[type] = false
    }

    // newTitleSelectedStatus ===> { area: false } or { area: true }
    return newTitleSelectedStatus
  }

  // 隐藏对话框
  onCancel = type => {
    // 取消body的类名
    this.htmlBody.className = ''

    // console.log('当前type：', type)
    // 1 先获取到当前 type 的选中值
    const { selectedValues, titleSelectedStatus } = this.state
    const selectedVal = selectedValues[type]

    // 2 使用 if/else 分别判断4个菜单有没有选中
    const newTitleSelectedStatus = this.getTitleSelectedStatus(
      type,
      selectedVal
    )

    this.setState({
      openType: '',

      titleSelectedStatus: { ...titleSelectedStatus, ...newTitleSelectedStatus }
    })
  }

  // 保存数据
  // 注意：value才表示当前选中的最新值
  onSave = (type, value) => {
    // 1 先获取到当前 type 的选中值
    const { titleSelectedStatus, selectedValues } = this.state
    // 注意：此处，不要依赖于 状态中的选中值，而应该依赖于传递过来的 参数value，它表示的才是最新值
    const newTitleSelectedStatus = this.getTitleSelectedStatus(type, value)

    // 筛选条件的最新选中值：
    const newSelectedValues = {
      ...selectedValues,
      [type]: value
    }

    /* 
      {
        area: 'AREA|67fad918-f2f8-59df', // 或 subway: '...'
        rentType: 'true', // 或 'null'
        price: 'PRICE|2000',
        more: 'ORIEN|80795f1a-e32f-feb9,ROOM|d4a692e4-a177-37fd'
      }

      ② 获取区域数据的参数名： area 或 subway（选中值数组的第一个元素）。
      ③ 获取区域数据的值（以最后一个 value 为准）。
      ④ 获取方式和租金的值（选中值的第一个元素）。
      ⑤ 获取筛选（more）的值（将选中值数组转化为以逗号分隔的字符串）。
    */
    // 这是传递给父组件的筛选条件对象
    const filters = {}

    // console.log(key)
    // 处理：区域或地铁
    // area -> ["area", "null"] 或 ["subway", "null"]
    const area = newSelectedValues.area
    const areaKey = area[0]
    let areaValue
    // 如果数组长度为 2 ，就为：null
    // 如果数组长度为 3 ，先判断最后一项是否为 null ，如果是，就拿倒数第二项
    //                                             否则，就获取最后一项的值
    if (area.length === 2) {
      areaValue = 'null'
    } else if (area.length === 3) {
      areaValue = area[2] === 'null' ? area[1] : area[2]
    }
    // 添加到对象中
    filters[areaKey] = areaValue

    // 处理方式和租金
    filters.rentType = newSelectedValues.mode[0]
    filters.price = newSelectedValues.price[0]

    // 处理更多筛选条件数据
    filters.more = newSelectedValues.more.join(',')

    // console.log('最新筛选条件为：', newSelectedValues, filters)

    // 调用父组件中的 onFilter 方法，将所有筛选条件数据传递给父组件
    this.props.onFilter(filters)

    this.setState({
      openType: '',

      titleSelectedStatus: {
        ...titleSelectedStatus,
        ...newTitleSelectedStatus
      },

      // 更新当前类型对应的选中值
      selectedValues: newSelectedValues
    })
  }

  // 渲染前面三个菜单对应的组件：
  renderFilterPicker() {
    const {
      openType,
      filtersData: { area, subway, rentType, price },
      selectedValues
    } = this.state

    if (openType === 'more' || openType === '') {
      return null
    }

    // 从 filtersData 中获取数据
    // area： area => {}, subway => {}
    // mode： rentType => []
    // price：price => []
    let data
    // 列数
    let cols = 1
    // 当前选中值
    let defaultValue = selectedValues[openType]

    switch (openType) {
      case 'area':
        data = [area, subway]
        cols = 3
        break
      case 'mode':
        data = rentType
        break
      case 'price':
        data = price
        break
      default:
        break
    }

    return (
      <FilterPicker
        key={openType}
        data={data}
        cols={cols}
        onCancel={this.onCancel}
        onSave={this.onSave}
        type={openType}
        defaultValue={defaultValue}
      />
    )
  }

  // 渲染第四个菜单对应的组件
  renderFilterMore() {
    const {
      openType,
      filtersData: { roomType, oriented, floor, characteristic },
      selectedValues
    } = this.state

    if (openType !== 'more') return null

    // 传递该组件中需要的数据：
    const data = { roomType, oriented, floor, characteristic }
    // 上一次的选中值
    const defaultValue = selectedValues.more

    return (
      <FilterMore
        data={data}
        type={openType}
        defaultValue={defaultValue}
        onSave={this.onSave}
        onCancel={this.onCancel}
      />
    )
  }

  // 渲染遮罩层元素
  renderMask() {
    const { openType } = this.state

    const isHide = openType === 'more' || openType === ''

    // if (isHide) {
    //   return null
    // }

    // 注意：要实现隐藏时的动画效果，一定要保证 组件 是存在的，否则，如果 组件 都不存在
    // 那么，一定无法实现动画效果

    // 遮罩层的不透明度什么时候为 0 ，什么时候为 1？
    // 为 0 的时候，openType === 'more' || openType === '' --> ( isHide )
    // 否则为 1
    return (
      // <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
      <Spring to={{ opacity: isHide ? 0 : 1 }}>
        {props => {
          // props 实际就是当前动画的从 0 到 1 的状态
          // console.log('props:', props)
          if (props.opacity === 0) {
            return null
          }

          return (
            <div
              style={props}
              className={styles.mask}
              onClick={() => this.onCancel(openType)}
            />
          )
        }}
      </Spring>
    )
  }

  render() {
    const { titleSelectedStatus } = this.state

    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {this.renderMask()}

        {/* {openType === 'area' || openType === 'mode' || openType === 'price' ? (
          <div
            className={styles.mask}
            onClick={() => this.onCancel(openType)}
          />
        ) : null} */}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle
            titleSelectedStatus={titleSelectedStatus}
            onClick={this.changeTitleSelected}
          />

          {/* 前三个菜单对应的内容： */}
          {this.renderFilterPicker()}

          {/* 最后一个菜单对应的内容： */}
          {this.renderFilterMore()}
        </div>
      </div>
    )
  }
}
