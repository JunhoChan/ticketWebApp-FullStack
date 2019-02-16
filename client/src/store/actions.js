/*
vuex的actions模块
 */
 import {
 	reqBannerInfo ,
 } from '../api'

 import {
 	RECEIVE_BANNER,
 	RECEIVE_USER_INFO,
 } from './mutation-types'

export default {
	// 异步获取轮播图
	async getBannerInfo ({commit}) {
		const result = await reqBannerInfo()
		commit(RECEIVE_BANNER,{banner: result.data})
	},
	
  // 记录用户信息 同步
  recordUserInfo ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },

}