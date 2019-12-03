import Vue from 'vue'
import App from './App.vue'
import router from './router'


// 如果项目中，用到了第三方的css文件
// 那么我们如果想要让这个css文件全局生效，则需要通过import "css文件路径"
// 在main.js中吧css文件引入
import "./assets/base.css";
import "./assets/index.css";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
