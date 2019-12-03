const TOKEN = 'hkzf_token'

// 获取token
export const getToken = () => localStorage.getItem(TOKEN)

// 设置token
export const setToken = token => localStorage.setItem(TOKEN, token)

// 删除token
export const removeToken = () => localStorage.removeItem(TOKEN)
