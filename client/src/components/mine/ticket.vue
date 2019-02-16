<template>
	<section class="ticket-container mt20">
		<section class="my-ticket pr mb50 ml5w" v-for="item in orderInfoList">
			<div class="pa ticket-circle flex flex-center f15rem fb red">票</div>
			<div class="ticket-border pa rotate"></div>
			<div class="flex flex-column pw5 ticket-content">
				<div class="flex flex-bt">
					<span class="ml50 fb f15rem tddd film-name-order">电影</span>
					<span class="pr20 f085">电影票 x{{item.num}}</span>
				</div>
				<div class="mt5 flex flex-column">
					<span class="ml50 f085 tddd">{{item.cinemaName}}</span>
					<span class="ml50 f075 tddd mt5">{{item.position}}</span>
				</div>
				<div class="flex flex-end pr20 f085">
					{{item.shopTime}}
				</div>
			</div>
			<div class="pa ticket-bottom flex flex-center fb red">
				&yen;{{item.totalPrice}}
			</div>
		</section>
	</section>
</template>

<script>
export default {
	data() {
		return {
			orderInfoDataList: []
		}
	},
	created() {
		this.orderInfoDataList = this.orderInfoList
		this.__initData()
	},
	methods: {
		__initData() {
			this.orderInfoDataList.forEach(item=> {
				let str = ''
				item.position.split(",").forEach((val) => {
					str += this.handleData(val)
				})
				item.position = str
			})
		},
		// 数据处理
		handleData(param) {
			let oArr = param.split('')
			let str  = oArr[0] + '排' + oArr[1] + '列' + ' '
			return str
		},
	},
	props: {
		orderInfoList:Array,
	}
}
</script>

<style>
.my-ticket {
	width:85vw;
	height: 8rem;
	background-color: #fdf1f2;
	border-radius: 5px;
}

.ticket-circle {
	height: 5rem;
	width: 5rem;
	border-radius: 50%;
	background-color: #fff;
	left: -2.5rem;
	top: 1.5rem;
	z-index: 1;
	box-shadow: 5px 1px 5px #999;
}

.film-name-order {
	width: 10rem;
	max-width: 10rem;
}

.ticket-border {
	height: 5rem;
	width: 5rem;
	border-radius: 50%;
	background: linear-gradient(#ff6668, #fff);
	left: -2.5rem;
	top: 1.5rem;
	z-index:-1;
	-webkit-transform:scale(1.1);
	transform: scale(1.6);
	border-radius: 50%;	
}

.ticket-content {
	box-shadow: 0 9px 15px -1px #999;
	z-index: 2;
}
.ticket-bottom {
	left: 5vw;
	background-color: #fde3ee;
	width:80vw;
	height: 2rem;
	z-index: -1;
	border-radius: 5px;
}

@keyframes rotate{
	0%{
		transform: rotate(0);
	}
	100%{
		transform: rotate(360deg);
	}
}

@-webkit-keyframes rotate {
	0%{
		transform: rotate(0);
	}
	100%{
		transform: rotate(360deg);
	}
}

.rotate{
	transition: .5s;
	transform-origin: 48% 52%;  
	animation: rotate 3s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
}

</style>