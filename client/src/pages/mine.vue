<template>
	<section>
		<orderPage :showOrder="showOrder" @closeOrderPage="closeOrderPage" v-if="orderInfoFlag"			:orderInfo="orderInfo"	/>
		<div  class="flex flex-column" v-if="uInfo" id="mine">
			<div class="userWrapper flex bgfff fb fff f13rem tddd">
				<div class="user-avator"></div>
				<div class="user-name flex flex-center ml10 fb">{{uInfo.username}}</div>
			</div>
			<div  class="menu-wrapper flex w bgfff border-bottom">
			   <div class="menu-movie flex flex-column flex-center" @click="toMyHistory">
					<img src="./../assets/images/movie.png" alt="看过的电影">
					<span class="mt5 f075">电影票</span>
				</div>
				<div class="menu-coupon flex flex-column flex-center" @click="toMydiscount">
					<img src="./../assets/images/youhui.png" alt="看过的电影">
					<span class="mt5 f075">优惠卷</span>				
				</div>
			</div>
			<div class="flex flex-bt bgfff pw5 border-bottom" @click="openOrderPage">
				<div class="f1rem">我的订单</div>
				<div class="f075">详细订单入口></div>
			</div>
			<div class="help-wrapper flex flex-bt bgfff pw5" @click="showMessage">
				<div class="f1rem">帮助与回馈</div>
				<div class="f075">系统消息入口></div>
			</div>
		</div>
		<div v-else class="none-login flex flex-center" @click="toLogin">
			前往登录
		</div>


	</section>
</template>

<script>
import orderPage from './../components/mine/order.vue'
import {mapState} from 'vuex'
export default {
	data() {
		return {
			loginFlag: false, // 登录状态
			uInfo:{},
			showOrder:false, // 显示订单
			orderInfo:[],
			orderInfoFlag:false,
		}
	},
	created() {
		this.uInfo = window.sessionStorage.getItem('userInfo')
		// this.$store.dispatch('recordUserInfo', this.uInfo)
		this.uInfo = JSON.parse(this.uInfo)
		this.getOrderInfo()
	},
	methods: {
		// 获取订单信息
		getOrderInfo() {
			let params = {}
			params.id = this.uInfo.userId
			this.$http.get(this.$domain + '/showOrder',{params:params}).then(res=>{
				this.orderInfo = res.data
				this.orderInfoFlag = true
			}).catch(err=> {
				console.log(err)
			})
		},
 		getUserInfo() {
			let obj = {}
			obj =window.localStorage.getItem("userInfo")
			return obj
		},
		// 去我的电影页面
		toMyHistory() {
			this.$router.push('/history')
		},
		toMydiscount() {
			this.$router.push('/discount')
		},
		toLogin() {
			this.$router.replace('/login')
		},
		// 查看系统消息
		showMessage() {
			this.$router.push('/message')
		},
		openOrderPage() {
			this.showOrder = true
		},
		closeOrderPage() {
			this.showOrder = false
		},
	},
    computed: {
        ...mapState(['userInfo'])
    },
    components: {
    	orderPage,
    }
}
</script>

<style>
.userWrapper {
	padding: 20vw 5vw 5vw 5vw;
	background-image: url(//gw.alicdn.com/tfs/TB1yzUmgpuWBuNjSszbXXcS7FXa-1125-540.png),-webkit-linear-gradient(134deg,#fa465d,#fe7587);
    background-image: url(//gw.alicdn.com/tfs/TB1yzUmgpuWBuNjSszbXXcS7FXa-1125-540.png),linear-gradient(-44deg,#fa465d,#fe7587);
}
.user-avator {
	width:19.333vw;
	height:19.333vw;
	border-radius:50%;
	overflow: hidden;
    background-size: cover;
	background-color:black;
    background-repeat: no-repeat;
	background-image:url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544152140568&di=06a81aa3cc278de5a3740945542f16b8&imgtype=0&src=http%3A%2F%2Fzqb.cyol.com%2Fimages%2F1%2F20180615%2F1529000548362_1.jpg');
	background-position:85% 0%;
}
.menu-wrapper {
	height: 26.66666667vw;
}
.menu-movie,.menu-coupon  {
	display:flex;
	flex:1 1 auto;
}
.menu-movie img , .menu-coupon img {
	height:30px;
	width: 50px;
}

.none-login {
	height: 100vh;
	width:100vw;
}
</style>