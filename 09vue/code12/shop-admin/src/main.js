import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from 'axios';

// 1. 引入EelementUI库
import ElementUI from "element-ui";
// 2. 引入CSS文件
import "element-ui/lib/theme-chalk/index.css";

import "./assets/css/index.css";

// 3. 安装ElementUI
Vue.use(ElementUI);

// 通过defaults给axios设置一个默认的baseURL，可以在所有请求中都能用到这个地址
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";

// 设置axios的请求拦截器
axios.interceptors.request.use(function(config) {
  // config 就是拦截到的请求相关的所有的信息
  // 这个信息是可以进行修改的
  // console.log(config);
  config.headers.Authorization = localStorage.getItem("token");
  // return config不能动，这个函数中必须有这个内容
  return config;
});

// 设置axios的响应拦截器
// axios.interceptors.response.use(function (response) {
//   // Do something with response data
//   return response;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });

// 把axios加到Vue的原型上
Vue.prototype.$http = axios;


Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
