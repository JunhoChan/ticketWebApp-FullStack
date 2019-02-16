<template>
	<section id="pay" class="flex flex-column pr">
		<couponList :totalPrice='orderInfo.totalPrice' @handleDiscountment="handleDiscountment" /><!-- 优惠卷页 -->
		<mockPay :ctotalPrice="ctotalPrice"  @payOrder="payOrder" /><!--密码支付页-->
		<headerTop leftNav="1" title="确认订单"></headerTop>
		<movieOrder class="mt50" :orderInfo="orderInfo"/>

		<div class="activity bgfff border-bottom pw3 flex flex-bt" @click="showActivity=true">
			<span class="f1rem">特惠活动</span>
			<span class="flex flex-center">已省下{{offerMoney}}元 <i class="right-arrow"></i></span>
		</div>
		<div class="totalPrice bgfff pw3 flex flex-bt" @click="showDicountmentList">
			<span class="f1rem">优惠卷</span>
			<span class="flex flex-center">-{{saveMoney}}元<i class="right-arrow"></i></span>
		</div>
		<attentionContent></attentionContent>
		<div class="buy-wrapper pf w flex flex-bt flex-center" v-if="!$store.state.dicountment.show && !$store.state.dicountment.realPay">
			<span class="f1rem pl3vw flex flex-center pr" @click="showCount=true">
				应付<span class="red f15rem fb">{{ctotalPrice}}</span>
				元<i class="top-arrow pa"></i></span>
			<button @click="showRealPay">立即付款</button>
		</div>
		<!--优惠活动-->
		<preActivity v-if="showActivity" @closeActivity="closeActivity" :offerMoneyInfo="offerMoneyInfo"></preActivity>
		<countMoney  @closeCount="closeCount" :showCount="showCount" :saveMoney="saveMoney"
			:oldInfo="orderInfo" :offerMoney="offerMoney" />
	</section>
</template>

<script>
import { Toast } from 'mint-ui';
import { mapMutations } from 'vuex' // vuex is involved in current discountment
import headerTop from './../components/header/header.vue'
import movieOrder from './../components/pay/movieOrder.vue' // 电影订单
import attentionContent from './../components/pay/attention.vue' // 注意事项
import preActivity from './../components/pay/preActivity.vue' // 优惠活动
import countMoney from './../components/pay/countMoney.vue' // 价格加减详情
import couponList from './../components/pay/couponList.vue' // 价格加减详情
import mockPay from './../components/pay/mockPay.vue' // 密码支付页
export default {
	data() {
		return {
			showActivity:false,// 显示活动
			showCount:false, // 显示计算金额过程
			orderInfo:{},
			user:{},
			saveMoney:0, // 优惠卷剩下的钱
			offerMoney:0,//  满减优惠剩下的钱
			offerMoneyInfo:[], // 优惠信息
			totalPrice: 0,
		}
	},
	created() {
		this.orderInfo = this.$route.params
		this.user = JSON.parse(window.sessionStorage.getItem('userInfo'))
		this.getOfferMoneyInfo()
		console.log('----ada--')
	},
	computed: {
		// 总价
		ctotalPrice() {
			return this.totalPrice - this.saveMoney;
		}
	},
	methods: {
		...mapMutations([
		  		'showDicountmentList', // 优惠列表
		  		'showRealPay', // 真实支付密码页面
		]),
		// 获取优惠金额信息
		getOfferMoneyInfo() {
			this.$http.get(this.$domain+'/getOfferMoneyInfo').then(res=> {
				this.offerMoneyInfo = res.data
			}).then(()=>{
			 	this.handleValidCondition()
			}).catch(err=>{console.log(err)})
		},
		// 支付订单
		payOrder() {
			console.log(111)
			let params = {}
			params.showId = parseInt(this.orderInfo.showId)
			params.userId = parseInt(this.user.userId)	
			params.cinemaName = this.orderInfo.cinemaName
			params.num = this.orderInfo.num
			params.position = this.orderInfo.position.toString()
			params.totalPrice = this.ctotalPrice
			this.handlePayPrder(params)
			console.log(222)
		},
		// 订单支付
		handlePayPrder(params) {
			this.$http.post(this.$domain + '/payOrder', params).then((res) => {
					if(res.data.code = 201) {
						Toast('购买成功！')
						this.handleSuccessTicks(params)	
					} else {
						Toast('系统繁忙，请稍后重试!')
					}
			}).then(() => {
			 	this.$router.replace('/mine')
			}).catch((err) => { 
				console.log(err)
			})
		},
		closeActivity() {
			this.showActivity = false
		},
		closeCount() {
			this.showCount = false
		},
		// webSocker 同步订单消息
		handleSuccessTicks(params) {
			let socket = io('ws://localhost:8088')
			socket.emit('payOrder', params)
                // 购票成功后的处理
            socket.on('paySuccess',function(data){
            	let obj = JSON.parse(data),
            	 oIndex = -1, // 下标
            	pushArr = JSON.parse(window.localStorage.getItem('pushMessageList')),
               userInfo = JSON.parse(window.sessionStorage.getItem('userInfo')),
            		str = '您于'+obj.time+',在JunhoChan线上影院平台,购买了'
            		+ obj.num +'张电影票,请记得及时赶到'+ obj.cName + ',去观看电影哦!'
            	pushArr.filter((item,index) => {
                      if(userInfo.userId === item.userId ) {
                          oIndex = index
                       }
                })
            	pushArr[oIndex].msgList.push(str)
            	window.localStorage.setItem('pushMessageList',JSON.stringify(pushArr))
                })

		},
		// 处理优惠的价格
		handleDiscountment(val) {
			this.saveMoney = val
			console.log('价格优惠:' + this.saveMoney)
		},
		// 处理满足优惠条件
		handleValidCondition() {
			let totalPrice = this.$route.params.totalPrice
			if(totalPrice >=150) {
				totalPrice -= this.offerMoneyInfo[2].saveMoney
			} else if( totalPrice >=90 && totalPrice < 150) {
				totalPrice -= this.offerMoneyInfo[1].saveMoney
			} else if( totalPrice >= 45){
				totalPrice -= this.offerMoneyInfo[0].saveMoney
			}
			this.offerMoney = this.$route.params.totalPrice - totalPrice
			this.totalPrice = totalPrice
		},
	},
	components:{
		headerTop,
		movieOrder,
		attentionContent,
		preActivity,
		countMoney, // 价格计算过程
		couponList,
		mockPay,
	}
}
</script>

<style>
span .right-arrow {
	display:block;
	width:10px;
	height:10px;
	border:1px solid #999;
	border-left:0 none;
	border-top:0 none;
	transform:rotate(-45deg);
	-ms-transform:rotate(-45deg); 	/* IE 9 */
	-moz-transform:rotate(-45deg); 	/* Firefox */
	-webkit-transform:rotate(-45deg); /* Safari 和 Chrome */
	-o-transform:rotate(-45deg); 	/* Opera */
}
.buy-wrapper {
	background-color:#fcfcfd;
	bottom:0;
	z-index:1000000;
	height:13vw;
}
.buy-wrapper button {
	height:100%;
	width:45vw;
	background-color:#5ea1e8;
	color:#fff;
	border:none;
}
.top-arrow {
	display:block;
	width:8px;
	height:8px;
	border:1px solid #999;
	border-left:0 none;
	border-top:0 none;
	transform:rotate(-45deg);
	-ms-transform:rotate(-45deg); 	/* IE 9 */
	-moz-transform:rotate(-45deg); 	/* Firefox */
	-webkit-transform:rotate(-135deg); /* Safari 和 Chrome */
	-o-transform:rotate(-45deg); 	/* Opera */	
	right:-.8rem;
	bottom:.3rem;
}
</style>