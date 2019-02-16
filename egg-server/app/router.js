'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 用户API路径
  router.get('/',controller.v1.user.index);
  // 检查用户是否已经注册
  router.get('/api/user/checkUserRegister/:type/:str', controller.v1.user.checkUserRegister);
  // 添加用户
  router.post('/api/user/addNewUser', controller.v1.user.addNewUser);
  // 登录
  router.post('/api/user/loginAndGetUser', controller.v1.user.loginAndGetUser);
  // 退出登录
  router.get('/api/user/loginOut',controller.v1.user.loginOut);
  // 一次性验证码
  router.get('/api/getVarificationCode',controller.v1.user.getVarificationCode);

  // 城市 curl
  router.resources('city','/api/v1/city',controller.v1.city)  

  // 轮播图数据 
  router.get('/api/getBannerInfo',controller.v1.banner.index);

  // 获取分页正在热映的电影
  router.get('/api/getHotReleaseFilm',controller.v1.film.hotReleaseFilm);
  // 获取影院数据分页
  router.get('/api/getAllCinemaData',controller.v1.cinema.getAllCinemaData);
  // 影片上映时段
  router.get('/api/getShowTime',controller.v1.filmTime.index)
  
  // 获取影院播放电影 某时段的座位信息
  router.get('/api/getMovieSeat',controller.v1.seat.index)

  // 显示用户没有评价电影列表
  router.get('/api/showCommentMovies',controller.v1.comment.showCommentMovies)

  // 添加评论
  router.post('/api/addMovieComment',controller.v1.comment.addMovieComment)

  // 下订单
  router.post('/api/payOrder',controller.v1.order.payOrder)

  // 获取首页消息
  router.get('/api/getMessageInfo',controller.v1.message.getMessageInfo)

  // 获取满减优惠
  router.get('/api/getOfferMoneyInfo',controller.v1.offerMoney.getOfferMoneyInfo); 

  // 显示订单
  router.get('/api/showOrder',controller.v1.order.showOrder)



  // 后台接口


  // 更新首页消息
  router.post('/admin/api/updateMessageInfo',controller.v1.message.updateMessageInfo)  

  // 电影curl
  router.resources('film','/admin/api/film',controller.v1.film)
  
  // 热映电影
  router.get('/admin/api/getHotReleaseFilm',controller.v1.film.hotReleaseFilm);

  // 历史电影
  router.get('/admin/api/getHistoryFilm',controller.v1.film.historyFilm);

  // 上下映电影
  router.get('/admin/api/setFilmState',controller.v1.film.setFilmState);

  // 获取制片地区
  router.get('/admin/api/getAreaOrCountryInfo',controller.v1.area.areaOrCountryInfo);  

  // 影院curl
  router.resources('cinema','/admin/api/cinema',controller.v1.cinema)

  // 所有影院数据
  router.get('/admin/api/getAllCinemaData',controller.v1.cinema.getAllCinemaData);
  
  // 影片上映时段
  router.resources('film_time','/admin/api/filmTime',controller.v1.filmTime)
 
  // 数据分析
  router.get('/admin/api/getDataAnalysis',controller.v1.filmTime.dataAnalysis);  

  // 优惠卷 curl
  router.resources('discount','/admin/api/discount',controller.v1.discount)
  
  // 更新满减优惠
  router.post('/admin/api/updateOfferMoneyInfo',controller.v1.offerMoney.updateOfferMoneyInfo);

  // 获取满减优惠
  router.get('/admin/api/getOfferMoneyInfo',controller.v1.offerMoney.getOfferMoneyInfo);
  
  // 获取用户列表
  router.get('/admin/api/getUserInfoList',controller.v1.user.getUserInfoList);




};
