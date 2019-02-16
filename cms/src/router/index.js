import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Admin from '@/components/admin/Admin.vue'


// 导入商品路由配置
import RouterConfig from './route_config.js';
let adminChildren = [...RouterConfig];

Vue.use(Router);

const router = new  Router ({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        login_require: false
      },
      component: Login
    },
    {
      path: '/',
      name: 'admin',
      component: Admin,
      children:adminChildren
    }
  ]
})

 router.beforeEach((to, from, next)=>{
  let isLogin = sessionStorage.getItem('isLogin');
  let toPage = to.name;
  console.log(toPage);
  next()
});

export default router