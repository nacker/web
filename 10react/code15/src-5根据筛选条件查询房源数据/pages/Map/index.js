import React from 'react'

import { Toast } from 'antd-mobile'

// 导入 classnames
import classNames from 'classnames'

// 导入 获取当前定位城市 方法
import { getCurrentCity, BASE_URL, API } from '../../utils'

// 导入 NavHeader 组件
import NavHeader from '../../components/NavHeader'

// 导入样式
import './index.scss'

import styles from './index.module.css'

// label 样式：
const labelStyle = {
  cursor: 'pointer',
  border: '0px solid rgb(255, 0, 0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rgb(255, 255, 255)',
  textAlign: 'center'
}

// 注意：如果要在脚手架代码中访问全局对象，应该 通过 window 来访问
// https://facebook.github.io/create-react-app/docs/using-global-variables
const BMap = window.BMap

export default class Map extends React.Component {
  state = {
    // 控制房源列表的展示和隐藏
    isShowHouseList: false,
    // 小区里面的房源列表
    houseList: []
  }

  componentDidMount() {
    this.initMap()
  }

  // 初始化地图
  async initMap() {
    const { label, value } = await getCurrentCity()
    // console.log('当前定位城市名称：', label)

    // 创建百度地图对象
    // 参数：表示地图容器的id值
    const map = new BMap.Map('container')
    // 为了能够在其他方法中获取到的地图对象，添加到this中
    this.map = map
    // 创建地址解析器实例
    const myGeo = new BMap.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      label,
      async point => {
        if (point) {
          map.centerAndZoom(point, 11)

          // 添加两个常用控件
          map.addControl(new BMap.NavigationControl())
          map.addControl(new BMap.ScaleControl())

          // 调用方法，渲染第一级（城市下面所有区）的数据
          this.renderOverlays(value)
        }
      },
      label
    )

    // 给百度地图绑定移动事件
    map.addEventListener('movestart', () => {
      // 隐藏房源列表
      this.setState({
        isShowHouseList: false
      })
    })
  }

  // 获取下级缩放级别以及要渲染的覆盖物类型
  // 思路：根据地图缩放级别，来获取对应的数据
  // 区   -> 11 ，范围：>=10 <12
  // 镇   -> 13 ，范围：>=12 <14
  // 小区 -> 15 ，范围：>=14 <16
  getTypeAndZoom() {
    const curZoom = this.map.getZoom()
    // console.log('缩放级别：', curZoom)
    // 下一级缩放级别
    let nextZoom
    // 当前要渲染的覆盖物类型
    let type

    if (curZoom >= 10 && curZoom < 12) {
      // 说明当前对应的区的缩放级别
      nextZoom = 13
      type = 'circle'
    } else if (curZoom >= 12 && curZoom < 14) {
      // 说明当前对应的镇的缩放级别
      nextZoom = 15
      type = 'circle'
    } else {
      // 说明当前对应的小区
      type = 'rect'
    }

    return { nextZoom, type }
  }

  // 根据id获取下级数据
  async renderOverlays(id) {
    // 开启loading
    Toast.loading('加载中...', 0, null, false)

    const res = await API.get(`/area/map`, {
      params: {
        id
      }
    })

    // 关闭loading
    Toast.hide()

    const { nextZoom, type } = this.getTypeAndZoom()

    // console.log('获取到的房源数据：', res, nextZoom, type)
    res.data.body.forEach(item => {
      this.createOverlays(type, nextZoom, item)
    })
  }

  // 根据 type 来决定渲染什么数据
  // type 表示：要渲染覆盖物的类型
  // nextZoom 表示：下一级的缩放级别
  createOverlays(type, nextZoom, item) {
    const {
      label,
      count,
      value,
      coord: { latitude, longitude }
    } = item
    // 坐标
    const point = new BMap.Point(longitude, latitude)

    if (type === 'rect') {
      // 小区
      this.createRect(label, count, value, point)
    } else {
      // 区、镇
      // label 表示：覆盖物中的名字（浦东）
      // count 表示：覆盖物中的数量（99套）
      // value 表示：当前被点击覆盖物的id
      // point 表示：要渲染覆盖物的坐标
      // nextZoom 表示：下一级的缩放级别
      this.createCircle(label, count, value, point, nextZoom)
    }
  }

  // 创建区、镇的覆盖物
  createCircle(name, count, id, point, zoom) {
    // 创建地图覆盖物
    const opts = {
      position: point,
      offset: new BMap.Size(-35, -35)
    }
    const label = new BMap.Label('', opts) // 创建文本标注对象

    // 设置房源覆盖物的HTML内容
    label.setContent(`
      <div class="${styles.bubble}">
        <p class="${styles.name}">${name}</p>
        <p>${count}套</p>
      </div>
    `)

    // 设置样式
    label.setStyle(labelStyle)

    // 添加单击事件
    label.addEventListener('click', () => {
      // console.log('覆盖物被点击了', id, zoom)

      // 渲染下一级数据
      this.renderOverlays(id)
      // 清除当前覆盖物
      setTimeout(() => {
        this.map.clearOverlays()
      }, 0)
      // 放大地图
      this.map.centerAndZoom(point, zoom)
    })

    // 将创建好的覆盖物对象添加到地图中
    this.map.addOverlay(label)
  }

  // 创建小区覆盖物
  createRect(name, count, id, point) {
    // 创建地图覆盖物
    const opts = {
      position: point,
      offset: new BMap.Size(-50, -24)
    }
    const label = new BMap.Label('', opts) // 创建文本标注对象

    // 设置房源覆盖物的HTML内容
    label.setContent(`
      <div class="${styles.rect}">
        <span class="${styles.housename}">${name}</span>
        <span class="${styles.housenum}">${count}套</span>
        <i class="${styles.arrow}"></i>
      </div>
    `)

    // 设置样式
    label.setStyle(labelStyle)

    // 添加单击事件
    // 注意：label 事件处理程序中，不能添加 async。因为添加 async 后，事件处理程序不会触发
    // label 是百度地图API自己实现的内容，addEventListener 也是 百度地图API 自己实现的一个方法，不是原生DOM中的 addEventListener
    // 为什么添加 async 后，事件处理程序不再执行？？？
    // 因为 addEventListener 内部会判断 第二个参数（函数）的类型是不是 [object Function] ，如果不是，就不再执行；而 async () => {} 的类型是：[object AsyncFunction] 与 Function 不同，所以，使用 async 函数不会执行
    // label.addEventListener('click', async () => {
    // debugger
    label.addEventListener('click', e => {
      // 被点击小区的 x 和 y
      const { clientX, clientY } = e.changedTouches[0]
      const x = window.innerWidth / 2 - clientX
      const y = (window.innerHeight - 330 + 45) / 2 - clientY

      //
      this.map.panBy(x, y)

      // 这两种方式都是基于整个地图，所有，无法满足我们的需求
      // this.map.panTo(point)
      // this.map.centerAndZoom(point, 15)

      // 移动该小区到地图可视区域中心
      /* 
        目标位置的Y坐标： (window.innerHeight - 330) / 2
        目标位置的X坐标：window.innerWidth / 2

        使用 目标位置的Y - 被点击小区的Y ===> 得到 Y 偏移值
        使用 目标位置的X - 被点击小区的X ===> 得到 X 偏移值
      */

      // 解决方式：将获取数据的逻辑抽离到一个单独的方法中，在该方法内部，再使用 async 即可
      this.getCommunityHouses(id)
    })

    // 将创建好的覆盖物对象添加到地图中
    this.map.addOverlay(label)
  }

  // 获取小区的房源数据
  async getCommunityHouses(id) {
    Toast.loading('加载中...', 0, null, false)
    // 获取小区数据
    const res = await API.get(`/houses`, {
      params: {
        cityId: id
      }
    })

    // 关闭loading
    Toast.hide()

    // 展示房源列表
    this.setState({
      isShowHouseList: true,
      houseList: res.data.body.list
    })
  }

  // 渲染小区里面的房源列表
  renderHouseList() {
    return this.state.houseList.map(item => (
      <div
        className={styles.house}
        key={item.houseCode}
        onClick={() => this.props.history.push(`/detail/${item.houseCode}`)}
      >
        <div className={styles.imgWrap}>
          <img
            className={styles.img}
            src={`${BASE_URL}${item.houseImg}`}
            alt=""
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{item.title}</h3>
          <div className={styles.desc}>{item.desc}</div>
          <div>
            {item.tags.map((tag, index) => {
              const tagClass = `tag${index > 2 ? '3' : index + 1}` // tag1 or tag2 or tag3
              return (
                <span
                  key={index}
                  className={[styles.tag, styles[tagClass]].join(' ')}
                >
                  {tag}
                </span>
              )
            })}
          </div>
          <div className={styles.price}>
            <span className={styles.priceNum}>{item.price}</span> 元/月
          </div>
        </div>
      </div>
    ))
  }

  render() {
    return (
      <div className="map">
        {/* 导航栏 */}
        <NavHeader>地图找房</NavHeader>

        {/* 地图容器： */}
        <div id="container" className="container" />

        {/* 房源列表结构 */}
        {/* 如果要展示列表结构，只需要添加 styles.show 类名即可 */}
        {/* <div
          className={[
            styles.houseList,
            this.state.isShowHouseList ? styles.show : ''
          ].join(' ')}
        > */}
        <div
          className={classNames(styles.houseList, {
            [styles.show]: this.state.isShowHouseList
          })}
        >
          <div className={styles.titleWrap}>
            <h1 className={styles.listTitle}>房屋列表</h1>
            <a className={styles.titleMore} href="/house/list">
              更多房源
            </a>
          </div>
          <div className={styles.houseItems}>{this.renderHouseList()}</div>
        </div>
      </div>
    )
  }
}
