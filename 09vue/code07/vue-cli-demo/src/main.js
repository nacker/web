import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Vue.config.productionTip = false


// 创建了一个vue实例
// 通过$mount把Vue实例挂载到#app的位置  这个就相当于我们之前写的 el："#app"
new Vue({
  router,

  // render函数，是吧APP这个组件，渲染到了当前vue实例所在的位置
  render: h => h(App)
}).$mount('#app')
