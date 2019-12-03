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

          /* // 发送请求获取数据
          const res = await axios.get(`http://localhost:8080/area/map`, {
            params: {
              id: value
            }
          })

          // 遍历数据
          res.data.body.forEach(item => {
            // 为每一个房源创建百度地图坐标
            const {
              coord: { longitude, latitude }
            } = item
            const point = new BMap.Point(longitude, latitude)

            // 创建地图覆盖物
            const opts = {
              // 要创建的 覆盖物 的坐标
              position: point,
              // 设置文本偏移量
              offset: new BMap.Size(-35, -35)
            }
            // 覆盖物
            const label = new BMap.Label('', opts) // 创建文本标注对象

            // 设置房源覆盖物的HTML内容
            // 注意：此处使用的就是原生的HTML，所以，类名应该使用 class，而不是 className
            label.setContent(`
              <div class="${styles.bubble}">
                <p class="${styles.name}">${item.label}</p>
                <p>${item.count}套</p>
              </div>
            `)

            // 设置样式
            label.setStyle(labelStyle)

            // 添加单击事件
            label.addEventListener('click', () => {
              console.log('覆盖物被点击了', item.value)
            })

            // 将创建好的覆盖物对象添加到地图中
            map.addOverlay(label)
          }) */
        }
      },
      label
    )
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
      // this.createOverlays(type, nextZoom, item)
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
