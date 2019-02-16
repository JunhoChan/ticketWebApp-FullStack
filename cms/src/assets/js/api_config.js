// 接口域名
export const domain = 'http://localhost:7001';

// 导出接口api
export default {
	// 所有影院数据
	getAllCinemaData: '/admin/api/getAllCinemaData',

	// curl 影院接口
	getCinemaAccess: '/admin/api/cinema',

	// curl 电影接口
	getFilmAccess: '/admin/api/film',

	// 获取热映电影
	getHotShowFilm: '/admin/api/getHotReleaseFilm',

	// 获取影院历史上映电影
	getHistoryFilm: '/admin/api/getHistoryFilm',

	// 设置上下映电影
	setFilmState: '/admin/api/setFilmState',

	// 获取区域信息
	getAreaOrCountryInfo: '/admin/api/getAreaOrCountryInfo',

	// curl 影院电影时段
	getFilmTimeAccess: '/admin/api/filmTime',

	// 获取数据分析
	getDataAnalysis:'/admin/api/getDataAnalysis',

	// curl 优惠卷
	getDiscountAccess: '/admin/api/discount',

	// 获取首页消息
	getMessageInfo: '/api/getMessageInfo',

	// 更新首页消息
	updateMessageInfo: '/admin/api/updateMessageInfo',

	// 获取满减优惠信息
	getOfferMoneyInfo: '/admin/api/getOfferMoneyInfo',

	// 更新满减优惠信息
	updateOfferMoneyInfo: '/admin/api/updateOfferMoneyInfo',

	// 获取用户信息
	getUserInfoList: '/admin/api/getUserInfoList',



	
}