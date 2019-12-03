import axios from 'axios'

const BMap = window.BMap

// 获取当前定位城市数据
const getCurrentCity = callback => {
  /* 
    1. 判断 localStorage 中是否有定位城市
    2. 如果没有，就使用首页中获取定位城市的代码来获取，并且存储到本地存储中，然后返回该城市数据
    3. 如果有，直接返回本地存储中的城市数据
  */

  const curCity = JSON.parse(localStorage.getItem('hkzf_city'))

  if (!curCity) {
    // 没有
    return new Promise((resolve, reject) => {
      const myCity = new BMap.LocalCity()
      myCity.get(async result => {
        // 地图定位城市名称
        const cityName = result.name

        try {
          // 调用接口，换取我们项目中的有房源城市信息
          const res = await axios.get('http://localhost:8080/area/info', {
            params: {
              name: cityName
            }
          })

          // console.log('接口返回的城市信息：', res)
          const { label, value } = res.data.body

          // 调用回调函数，通过参数，将label和value传递出去
          // callback(label, value)
          // 获取成功，调用 resolve 将城市信息传递出去
          resolve({ label, value })

          // 将获取到的当前城市，保存到本地缓存中
          localStorage.setItem('hkzf_city', JSON.stringify({ label, value }))
        } catch (e) {
          // reject(e)
          // 如果接口处理失败，就直接返回默认城市数据
          // resolve({ label: "上海", value: "AREA|dbf46d32-7e76-1196" })
          // localStorage.setItem('hkzf_city', JSON.stringify({ label: "上海", value: "AREA|dbf46d32-7e76-1196" }))
        }
      })
    })
  } else {
    // 有
    // 注意：因为本地存储中没有当前定位城市的情况，返回的是 Promise。为了保证当前返回的一致性，所以，此处也应该返回一个Promise
    // return new Promise((resolve, reject) => resolve())

    // Promise.revole() 会直接返回一个成功的 Promise 对象
    return Promise.resolve(curCity)
  }
}

export { getCurrentCity }
