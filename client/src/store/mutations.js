/*
vuex的mutations模块
 */
import Vue from 'vue'
import { Indicator } from 'mint-ui'
import {
	RECEIVE_BANNER,
	RECEIVE_USER_INFO,
} from './mutation-types'
//  存进localStorage
function sessionLocalStore (params) {
	  	window.sessionStorage.setItem("userInfo",JSON.stringify(params));
}
export default {
	// 记录用户信息
	[RECEIVE_USER_INFO] (state, {userInfo}) {
			state.userInfo = userInfo
			sessionLocalStore(state.userInfo)
	},

	// 轮播图
	  [RECEIVE_BANNER] (state, {banner}) {
	    state.banner = banner
	  },

	  // 播放影片
	  playVideo (state, { audio }) {
	  	state.video.url = audio.url
	  	state.video.cover = audio.cover
	  	state.video.playStatus = true
	  },
	  // 暂停影片
	  pauseVideo(state) {
	  	state.video.playStatus = false
	  },
	  // 显示城市列表
	  showCityList (state) {
	  	state.city.show = true
	  },
	  // 隐藏城市列表  以后记得要改成真实数据
	  closeCityList (state) {
	  	state.city.show = false
	  },
	  // 显示优惠列表
	  showDicountmentList (state) {
	  	state.dicountment.show = true
	  },
	  // 隐藏优惠列表 
	  closeDicountmentList (state) {
	  	state.dicountment.show = false
	  },
	  // 显示优惠列表
	  showRealPay (state) {
	  	state.dicountment.realPay = true
	  },
	  // 隐藏优惠列表 
	  closeRealPay (state) {
	  	state.dicountment.realPay = false
	  },
	  // 推送加载
	  pushLoadStack (state) {
	    Indicator.open({
	      text: 'loading...',
	      spinnerType: 'snake'
	    });
	  	state.stack.push(1)
	  },
	  // 完成加载
	  completeLoad (state) {
	  	let stack = state.stack
	    stack.pop()
	    if (!stack.length) {
	      //延时为了更好显示loading效果
	      setTimeout(() => {
	        Indicator.close()
	      }, 200)
	    }
	  },

}