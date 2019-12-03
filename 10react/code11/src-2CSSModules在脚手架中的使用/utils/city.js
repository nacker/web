const CITY_KEY = 'hkzf_city'

// 获取localStorage中的定位城市
export const getCity = () => JSON.parse(localStorage.getItem(CITY_KEY))

// 设置localStorage中的定位城市
export const setCity = curCity =>
  localStorage.setItem(CITY_KEY, JSON.stringify(curCity))
