const TOKEN = 'hkzf_token'

// 获取token
export const getToken = () => JSON.parse(localStorage.getItem(TOKEN))

// 设置token
export const setToken = token =>
  localStorage.setItem(TOKEN, JSON.stringify(token))

// 删除token
export const removeToken = () => localStorage.removeItem(TOKEN)
