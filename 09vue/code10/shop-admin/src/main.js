import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// 1. 引入EelementUI库
import ElementUI from "element-ui";
// 2. 引入CSS文件
import "element-ui/lib/theme-chalk/index.css";

import "./assets/css/index.css";

// 3. 安装ElementUI
Vue.use(ElementUI);

Vue.config.productionTip = false;

// 注册一个导航守卫
router.beforeEach((to, from, next) => {
  // 1. 判断用户访问的是不是登录页面， 如果是登录页面，直接放行
  if (to.path === "/login") {
    next();
    return;
  }

  // 2. 如果访问的是其他的页面，判断用户是否进行了登录
  //    2.1 如果登录了，那就直接放行
  //    2.2 如果没登录，那就跳转到登录页

  if (localStorage.getItem("token")) {
    next();
  } else {
    router.push("/login");
  }

  // console.log(to, from);
  // console.log("导航守卫工作啦！！");
  // next()

  // next 这里提供的方法，是用来进行页面的跳转的
  // 如果不调用这个方法，那么页面就不会进入
  // next();
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
