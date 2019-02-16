<template>
	<section>
		<filmInfo v-if="flag" :movieInfo="movieInfo" />
		<chairDistribution v-if="seatFlag && flag" :seatInfo="seatInfo" 
					:orderInfo="orderInfo" :filmName="movieInfo.filmName" />
	</section>
</template>

<script>
import chairDistribution from './../components/selectChair/chairDistribution'
import filmInfo	from './../components/selectChair/filmInfo'
export default {
	data() {
		return {
			movieInfo: {},
			flag: false,
			seatInfo:[],
			seatFlag:false,
			orderInfo:{}, // 订单需要的信息
		}
	},
	created() {
		// console.log(this.$route.query)
		this.orderInfo.showId = this.$route.query.showId
		this.orderInfo.cinemaName = this.$route.query.cinemaName
		this.orderInfo.startTime = this.$route.query.startTime
		this.orderInfo.endTime = this.$route.query.endTime				
		this.getMovieInfo()
		this.getMovieShowSeat()
	},
	methods: {
		getMovieInfo() {
			this.$http.get('http://localhost:7001/admin/api/film/' + this.$route.query.filmId).then((res) => {
				this.movieInfo = res.data.data
				this.flag = true
			}).catch( (err) => {   console.log('服务器出现问题') })
		},
		getMovieShowSeat() {
			let params = {}
			params.showId = this.$route.query.showId
			this.$http.get(this.$domain + '/getMovieSeat',{params:params}).then((res) => {
				this.seatInfo = res.data
				this.seatFlag = true
			}).catch((err) => {  console.log('服务器出现问题') })
		}
	},
	components: {
		chairDistribution,
		filmInfo,
	}
}
</script>

<style>
</style>