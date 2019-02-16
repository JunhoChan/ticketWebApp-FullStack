<template>
	<section id="movie-order" class="pw5">
		<div class="order-wrapper bgfff">
			<div class="order-detail flex flex-bt pt15 pl15 pr15 pb10">
				<div class="detail-content">
					<p class="f11rem"><span class="fb">{{orderInfo.filmName}}</span> {{orderInfo.num}}张</p>
					<p class="f085 mt5">今天 {{orderInfo.startTime}}-{{orderInfo.endTime}}(英语3D)</p>
					<p class="f085 mt5">{{orderInfo.cinemaName}}</p>
					<p class="f085 mt5 tddd position">
						<span v-for="i in position">{{i}}&nbsp</span>
					</p>
				</div>
				<div class="chronograph">
					<div>付款剩余时间</div>
					<div class="flex  flex-end mt5 fb">{{content}}</div>
				</div>	
			</div>
			<div class="order-attention-points p15">
				<div class="f085"><span class="red fb">√</span> 开场前1小时可退票(有退票费)</div>
				<div class="f085 mt5"><span class="red fb">√</span> 开场前1小时可改签(有改签费)</div>
			</div>	
		</div>
	</section>
</template>
<script>
export default {
	data() {
		return {
			totalTime: 300, // 记录总时间
			content:'300s',
			position:[], // 位置信息 转化为列行所存的数组
		}
	},
	created() {
		this.countDown() // 记时
		this.convertPosArr() // 位置信息处理
	},
	methods: {
		countDown() {
			let clock = window.setInterval( ()=> {
				this.totalTime--
				this.content = this.totalTime + 's'
				if(this.totalTime === 0) {
					window.clearInterval(clock)
				}
			},1000)
		},
		// 位置信息
		convertPosArr() {
			this.orderInfo.position.forEach((item) =>{
				let arr = item.split('')
				let str = arr[0] + '排' + arr[1] + '列'
				this.position.push(str)
			})
		},
	},
	props:{
		orderInfo:Object,
	},
}
</script>
<style>
#movie-order {
	background-color:#a2a6a9;
}
.order-detail {
	border-bottom:1px dashed #999;
}
.order-wrapper{
	border-radius: .5rem;
	// border-top-left-radius:.5rem;
	// border-top-right-radius:.5rem;
}
.position {
	max-width:10rem;
}
</style>