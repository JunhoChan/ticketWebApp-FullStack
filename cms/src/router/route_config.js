export default [
  // 导入商品模块相关路由配置
  {
    name: 'cManage',
    path: '/cManage',
    component: resolve => require(['../components/cinemaManage/cinemaManage.vue'], resolve),
    meta: ['影院管理']
  },
  {
    name: 'cDetail',
    path: '/cDetail/:id',
    component: resolve => require(['../components/cinemaManage/cinemaDetail.vue'], resolve),
    meta: ['影院管理 -> 影院详情']
  },
  {
    name: 'sfst',
    path: '/setFilmShowTime',
    component: resolve => require(['../components/cinemaManage/setFilmShowTime.vue'], resolve),
    meta: ['影院管理 -> 影院详情 -> 排片设置']
  },
  {
    name: 'fManage',
    path: '/fManage',
    component: resolve => require(['../components/flimManage/flimManage.vue'], resolve),
    meta: ['电影管理']
  },
  {
    name: 'dManage',
    path: '/dManage',
    component: resolve => require(['../components/discountManage/discountManage.vue'], resolve),
    meta: ['优惠管理']
  },
  {
    name: 'uManager',
    path: '/uManager',
    component: resolve => require(['../components/userManager/userManager.vue'], resolve),
    meta: ['用户管理']
  },
  {
    name: 'mManage',
    path: '/mManage',
    component: resolve => require(['../components/messageManager/messageMassage.vue'], resolve),
    meta: ['消息推送管理']
  },
  {
    name: 'dAnalysis',
    path: '/dAnalysis',
    component: resolve => require(['../components/DataAnalysis/DataAnalysis.vue'], resolve),
    meta: ['数据分析']
  },

];
