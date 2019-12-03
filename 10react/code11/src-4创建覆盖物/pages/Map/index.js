import React from 'react'

// 导入 获取当前定位城市 方法
import { getCurrentCity } from '../../utils'

// 导入 NavHeader 组件
import NavHeader from '../../components/NavHeader'

// 导入样式
import './index.scss'
// import styles from './index.module.css'

// 注意：如果要在脚手架代码中访问全局对象，应该 通过 window 来访问
// https://facebook.github.io/create-react-app/docs/using-global-variables
const BMap = window.BMap

export default class Map extends React.Component {
  componentDidMount() {
    this.initMap()
  }

  // 初始化地图
  async initMap() {
    const { label } = await getCurrentCity()
    console.log('当前定位城市名称：', label)

    // 创建百度地图对象
    // 参数：表示地图容器的id值
    const map = new BMap.Map('container')
    // 创建地址解析器实例
    const myGeo = new BMap.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      label,
      point => {
        if (point) {
          map.centerAndZoom(point, 11)

          // 添加两个常用控件
          map.addControl(new BMap.NavigationControl())
          map.addControl(new BMap.ScaleControl())

          // 创建地图覆盖物
          var opts = {
            // 要创建的 覆盖物 的坐标
            position: point // 指定文本标注所在的地理位置
            // 偏移值
            // offset   : new BMap.Size(30, -30)    //设置文本偏移量
          }
          // 覆盖物
          var label = new BMap.Label('上海前端39期在上海~', opts) // 创建文本标注对象
          // 设置样式
          label.setStyle({
            color: 'yellowgreen',
            fontSize: '12px',
            height: '20px',
            lineHeight: '20px',
            fontFamily: '微软雅黑'
          })
          // 将创建好的覆盖物对象添加到地图中
          map.addOverlay(label)
        }
      },
      label
    )
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
