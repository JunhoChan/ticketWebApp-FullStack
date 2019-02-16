// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './less/index.less';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VCharts from 'v-charts'; // 映入v-char
Vue.config.productionTip = false




// 3. 导入配置后的axios与api, 注入到Vue的原型当中, 使可以通过this调用
import axios from './assets/js/axios_config.js';
import api, {
  domain
} from './assets/js/api_config.js';
// 启用库
Vue.use(VCharts);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.prototype.$http = axios;
Vue.prototype.$api = api;


import router from './router'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})