import React from 'react'

// 导入 NavHeader 组件
import NavHeader from '../../components/NavHeader'

// 导入样式
import './index.scss'

// 注意：如果要在脚手架代码中访问全局对象，应该 通过 window 来访问
// https://facebook.github.io/create-react-app/docs/using-global-variables
const BMap = window.BMap

export default class Map extends React.Component {
  componentDidMount() {
    // 创建百度地图对象
    // 参数：表示地图容器的id值
    const map = new BMap.Map('container')
    // 设置地图中心点坐标
    // const point = new BMap.Point(116.404, 39.915)
    const point = new BMap.Point(121.61833152747242, 31.040108832402957)
    // 使用中心点坐标初始化地图
    map.centerAndZoom(point, 18)
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
