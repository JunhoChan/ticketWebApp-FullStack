import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home.vue'
import Cinema from '@/pages/cinema.vue'
import Mine from '@/pages/mine.vue'
import noData from '@/pages/noData.vue'
import movieDetail from '@/pages/movieDetail.vue'
import cinemaDetail from '@/pages/cinemaDetail.vue'
import selectChair from '@/pages/selectChair.vue'
import pay from '@/pages/pay.vue'
import login from '@/pages/login.vue'
import gaoDemap from '@/pages/map.vue'
import history from '@/pages/history.vue'
import publish from '@/pages/publish.vue'
import message from '@/pages/message.vue'
import discount from '@/pages/discount.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {showFooter: true}
    },
    {
      path: '/cinema',
      name: 'cinema',
      component: Cinema,
      meta: {showFooter: true}
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine,
      meta: {showFooter: true}
    },
    {
      path: '/noData',
      name: 'noData',
      component: noData
    },       
    {
      path: '/movieDetail',
      name: 'movieDetail',
      component: movieDetail
    },
    {
      path: '/cinemaDetail',
      name: 'cinemaDetail',
      component: cinemaDetail
    },
    {
      path: '/gaoDemap',
      name: 'gaoDemap',
      component: gaoDemap
    },
    {
      path: '/selectChair',
      name: 'selectChair',
      component: selectChair
    },
    {
      path: '/pay',
      name: 'pay',
      component: pay
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },   
    {
      path: '/history',
      name: 'history',
      component: history
    },
    {
      path: '/publish',
      name: 'publish',
      component: publish
    },
    {  // 系统消息
      path: '/message',
      name: 'message',
      component: message,
    },
    { // 
      path: '/discount',
      name: 'discount',
      component: discount
    },
    	// 默认跳转带这 message
  	{
  		path: '/',
  		redirect: '/home'
  	}
  ]
})
