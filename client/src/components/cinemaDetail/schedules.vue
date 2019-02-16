<template>
	<section id="schedules">
		<ul class="pl20" data-schedule="123123">
			<li class="flex flex-bt flex-center p10 pb20 border-bottom" v-for="item in SchedulesData">
				<div class="item-wrap">
					<div class="item-container fl cb">
						<span class="fb f20">{{item.startTime}}</span>
						<span class="f5rem ml4vw">国语3D</span>
						<span class="f14 red ml25vw">特惠<span class="f20 fb">34.9</span>元</span>
					</div>
					<div class="item-container fl cb">
						<span class="f5rem">{{item.endTime}}</span>
						<span class="f5rem ml3vw tddd w100">3号厅免费停车2小时</span>
						<span class="f14 ml20vw line-through">79元</span>
					</div>
					<div class="cb"></div>					
				</div>
				<div class="btn-buy f12 mr3vw" @click="toBuyTickTap(item.showId,item.filmId,item.startTime,item.endTime)">购买</div>
			</li>			
		</ul>
	</section>
</template>

<script>
export default {
	methods: {
		toBuyTickTap(filmTimeId,filmId,stime,etime) {
			let params = {}
			params.showId = filmTimeId
			params.filmId = filmId
			params.startTime = stime
			params.endTime = etime
			params.cinemaName = this.cinemaName
			this.$router.push({path:'/selectChair', query: params  })
		}
	},
	props: {
		SchedulesData: Array,
		cinemaName:String,
	}
}
</script>

<style>
ul li {
	list-style: none;
}
.btn-buy {
    border: 1px solid #ff4d64;
    color: #ff4d64;
    padding: 3px 10px;
    border-radius: 8px;
    height: 1rem;
}
.ml4vw {
	margin-left: 4vw;
}
.ml3vw {
	margin-left: 3vw;
}
.ml25vw {
	margin-left: 20vw;
}
.mr3vw {
	margin-right: 3vw;
}
.ml20vw {
	margin-left: 15vw;
}
.f5rem {
	font-size: .5rem;
}
</style>