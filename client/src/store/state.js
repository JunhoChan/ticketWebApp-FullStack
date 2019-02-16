// vuex State
export default {
	city: {name: '深圳市', show: false, rN: 'bj', data: []}, // 城市  name:String, show:false 默认不显示地址一栏 rN: '别名''  data Array
	banner:[], // 轮播图 
	video: {cover:'',url: '', playStatus: false},  // video 视频播放 默认不播放
	stack: [], // 加载栈
	userInfo: {}, // 用户信息
	dicountment:{show:false, realPay:false },  // 付款页选优惠 realPay 密码框
}