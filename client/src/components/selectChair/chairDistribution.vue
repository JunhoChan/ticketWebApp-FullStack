<template>
	<section id="chair-distribution" class="flex  flex-column">
		<div class="flex flex-center">
			<p class="distribution-screen f18 tddd fb">2号激光厅(大)免费停车2小时 银幕</p>
		</div>
		<div class="mt50 pr">
			<div class="seat-index pa distribution-left-content">
				<ul >
					<li class="f20 mt10">1</li>
					<li class="f20 mt10 pt5">2</li>					
					<li class="f20 mt10 pt5">3</li>
					<li class="f20 mt10 pt5">4</li>
					<li class="f20 mt10 pt5">5</li>													
				</ul>
			</div>
			<div class="seat ml20 pa distribution-right-content">
				<ul>
					<li class="flex"  v-for="(items,indexs) in data">
						<span v-for="(item,index) in items">
							<chair :chairStatus="item" class="ml20 mb5" @selectdStatus="selectedChair"  @setUserSelPos = "setUserSelPos" 
							:row="indexs+1" :column="index+1"/>	
						</span>				
					</li>												
				</ul>
			</div>
		</div>
		<div class="pf bottom0 distribution-btn">
			<button class="noSelect block btn-primary fb" 
			 v-if="!selChairStatus && user">请选选座</button>
			<button class="block btn-primary fb" v-if="selChairStatus && user" @click="submitSeat">{{totalPrice}}元 确认座位</button>
			<button class="block btn-primary fb" 
			 v-if="!user" @click="toLogin">前往登录</button>			
		</div>	
	</section>
</template>

<script>
import chair from './chair.vue'
export default {
	data() {
		return {
			data:[],
			data1: [1,1,1,1],
			data2: [1,1,1,1,1],
			data3: [1,1,1,1,1,1],
			data4: [1,1,1,1,1,1],
			data5: [1,1,1,1,1,1],
			selChairStatus:false, // 买单按钮状态
			selNum:0,	// 选中座位数
			selSeatPosInf: [],//  选座座位位置
			price:30,// 单价
			user: {}
		}
	},
	created() {
		// console.log('订单信息')
		// console.log(this.orderInfo)
		this.data.push(this.data1,this.data2,this.data3,this.data4,this.data5)
		this.handleSeatData()
		this.user = window.sessionStorage.getItem('userInfo')
	},
	methods: {
		// 查看用户是否有选择座位
		selectedChair(val) {
			this.selNum += parseInt(val)
			if(this.selNum === 0) {
				this.selChairStatus = false
			}else{
				this.selChairStatus = true				
			}
		},
		// 获取用户选座位置
		setUserSelPos(val,status) { // stat
			if(status === 1) {
				this.selSeatPosInf.push(val)
			} else {
				this.selSeatPosInf = this.selSeatPosInf.filter((item)=> {
					return item !== val
				})
			}
			
		},
		// 实时根据后台椅子数据显示     排序 row-1  column-1 
		handleSeatData() {
			this.seatInfo.forEach((item)=> {
				let arr = item.position.split('')
				this.data[ arr[0]-1 ][ arr[1]-1 ] = 3
			})
		},
		// 选座完毕
		submitSeat () {
			let params = this.orderInfo
			params.position = this.selSeatPosInf
			params.num =this.selSeatPosInf.length
			params.totalPrice = this.totalPrice
			params.filmName = this.filmName
			// console.log('获取选座信息')
			// console.log(params)
			this.$router.push({name:'pay',params:params})
		},

		// 前往登录
		toLogin() {
			this.$router.push('/login')
		},
	},
	computed: {
		// 总价
		totalPrice() {
			return this.price * this.selNum
		}
	},
	props: {
		seatInfo: Array,
		orderInfo:Object,
		filmName:String,
	},
	components: {
		chair,
	}
}
</script>

<style>
#chair-distribution {
	width:100%;
	height:100%;
}
.distribution-left-content {
	left:1rem;
}
.distribution-right-content {
	left:1rem;	
}
.distribution-screen {
	background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 301 44' xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3EGroup 6%3C/title%3E%3Cg fill='%23E2E2E2' fill-rule='evenodd'%3E%3Cpath d='M238.5 34.593c0 5.028-4.1 9.104-9.163 9.104H95.31L14.662 44C9.6 44 5.5 39.924 5.5 34.896L0 .303 82.48 0H244l-5.5 34.593z'/%3E%3Cpath d='M295.5 34.593c0 5.028-4.1 9.104-9.163 9.104H152.31L71.662 44C66.6 44 62.5 39.924 62.5 34.896L57 .303 139.48 0H301l-5.5 34.593z'/%3E%3C/g%3E%3C/svg%3E")
}
.seat-index {
	background-color: rgba(0,0,0,.6);
	color:#fff;
	width:1.5rem;
	text-align:center;
	border-radius:10px;
	padding-bottom:.5rem;
}
.bottom0 {
	bottom: 0;
	width:100vw;
}
.distribution-btn button {
    width: 100%;
    border-radius: 0;
    border: 0;
    font-size: 17px;
    height: 55px;
    line-height: 55px;
    color:#fff; 	
}
.noSelect {
	opacity: .5;
}
.btn-primary {
	background-image: -webkit-linear-gradient(45deg,#ff7ba0,#ff4d64);
    background-image: linear-gradient(45deg,#ff7ba0,#ff4d64);
}
</style>