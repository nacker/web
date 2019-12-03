import React from 'react'

import axios from 'axios'

// 导入 获取当前定位城市 方法
import { getCurrentCity } from '../../utils'

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
    const res = await axios.get(`http://localhost:8080/area/map`, {
      params: {
        id
      }
    })

    const { nextZoom, type } = this.getTypeAndZoom()

    console.log('获取到的房源数据：', res, nextZoom, type)
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
      // this.createRect(label, count, value, point)
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
      console.log('覆盖物被点击了', id, zoom)

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

  render() {
    return (
      <div className="map">
        {/* 导航栏 */}
        <NavHeader>地图找房</NavHeader>

        {/* 地图容器： */}
        <div id="container" className="container" />
      </div>
    )
  }
}
