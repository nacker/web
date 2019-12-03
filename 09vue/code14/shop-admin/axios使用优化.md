# axios使用

## 存在的问题

1. 每个需要用到axios的组件，都需要单独引入axios
2. axios的基地址每次都要写
3. headers每次都要写

## 解决办法

1. 我们可以把axios加到Vue构造函数的原型中 这样每个组件中都可以通过 this.$http
2. axios.defaults.baseURL = ""
3. 通过axios请求拦截器来实现
axios.interceptoers.request.use(function(config){
  config.headers.Authorization = localStorage.getItem("token")
  return config;  
})