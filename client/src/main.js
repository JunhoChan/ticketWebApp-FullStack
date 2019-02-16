// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Mint from 'mint-ui' // 引入mint-ui
import 'mint-ui/lib/style.css'
import './assets/css/common.css'
import './assets/css/swiper.min.css'

import axios from './assets/js/axios_config.js' // 配置后的axios
import store from './store' // 引入状态管理

// // socket组件
// import VueSocketio from 'vue-socket.io';
// import socketio from 'socket.io-client';

// Vue.use(VueSocketio, socketio('http://127.0.0.1:7001')); 



// 引入部分组件
import { rate,Input } from 'element-ui';
Vue.use(rate)
Vue.use(Input)

Vue.use(Mint)
Vue.prototype.$http = axios
Vue.prototype.$domain = "http://localhost:7001/api" // 请求的域名

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  store._mutations.pushLoadStack[0]()
  next()
})



router.afterEach(route => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  window.onscroll = null
  setTimeout(() => {
    store._mutations.completeLoad[0]()
  }, 100)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
})
