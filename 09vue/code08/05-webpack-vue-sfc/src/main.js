// const Vue = require('vue')
import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

// webpack认识的模块化语法： 1. node.js 2. es6  3. AMD

// require(["vue"], function(Vue){

// })

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")