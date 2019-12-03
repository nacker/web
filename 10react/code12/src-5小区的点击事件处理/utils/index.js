import axios from 'axios'

// 导入 city API
import { getCity, setCity } from './city'

const BMap = window.BMap

// 获取当前定位城市数据
const getCurrentCity = () => {
  // 1 判断localStorage中是否有当前定位城市护具
  // const curCity = JSON.parse(localStorage.getItem('hkzf_city'))
  const curCity = getCity()

  if (!curCity) {
    // 没有
    // 2 调用 百度地图API 来获取当前定位数据
    return new Promise(resolve => {
      const myCity = new BMap.LocalCity()
      myCity.get(async result => {
        const res = await axios.get('http://localhost:8080/area/info', {
          params: {
            name: result.name
          }
        })
        const { label, value } = res.data.body

        // 使用resolve暴露当前城市数据
        resolve({ label, value })

        // 保存在本地存储中
        // localStorage.setItem('hkzf_city', JSON.stringify({ label, value }))
        setCity({ label, value })
      })
    })
  } else {
    // 有
    return Promise.resolve(curCity)
  }
}

// 使用 getCurrentCity 函数：
// curCity 表示 Promise 内部 resolve( curCity ) 的参数
// const curCity = await getCurrentCity()

// .then()
// getCurrentCity().then(curCity => {})

export { getCurrentCity, getCity, setCity }
