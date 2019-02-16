<template>
	<section id="cinemaDetail">
		<section class="cinema-wrap">
			<div class="announce-content">{{cinemaTips}}</div>
			<div class="flex flex-bt pt20 pl30">
				<div class="flex flex-column">
					<div class="cinema-name">{{cinemaInfo.cName}}</div>
					<div class="cinema-address tddd">{{cinemaInfo.cAddress}}</div>
					<ul class="cinema-tags">
						<li class="tag">观影小食</li>
						<li class="tag ml5">3D影院</li>
					</ul>
				</div>
				<div class="flex pr20 flex-center">
				<div class="cinema-position" @click="showMap(cinemaInfo.cAddress,cinemaInfo.cProvince,cinemaInfo.cName)"></div>
			<!-- 	<div class="cinema-collection"></div>	 -->				
				</div>
			</div>
			<div class="coupon-content flex flex-column flex-center ml30">
				<div class="card-title f13 block">优惠卷专区</div>
				<div class="card-content f12 block">银行活动、代金券兑换</div>
			</div>
		</section>
		<section class="scroll-wrap" v-if="hasData" >
			<filmSwiper :movies="movies" @getSwiperValue="getSwiperValue" />
			<playData  :showTime="showTime" :cinemaName="cinemaInfo.cName"
					 v-if="hasShow"/>
		</section>
		<section class="flex flex-center w fb mt20" v-else >
				该影院暂无上线影片
		</section>

	</section>	

</template>

<script>
import filmSwiper from './../components/cinemaDetail/cinemaSwiper.vue'
import playData from './../components/cinemaDetail/playData.vue'
export default {
	data () {
		return {
		   cinemaInfo: {},
		   pageNum:1,
		   movies: [], // 电影数据
		   hasData: false,
		   filmId: 0,
		   showTime:[],// 上映时间
		   hasShow:false,
		   cinemaTips:'', // 影院主页提示消息
		}
	},
	created() {
		this.cinemaInfo = this.$route.query
		this.getCinemaMovies()
		this.getCinemaTips()
	},
	methods: {
		getCinemaTips() {
			this.$http.get(this.$domain+'/getMessageInfo').then(res => {
				this.cinemaTips = res.data.content
			})
		},
		// 跳转到地图
		showMap(address,city,cName) {
  			this.$router.push({name: 'gaoDemap',params:{ 
  				address: address , city: city, cinemaName: cName}
  		});
		},
		// 获取影院电影
		getCinemaMovies() {
			let params = {}
			params.id = this.cinemaInfo.cinemaId
			this.$http.get(this.$domain+'/getHotReleaseFilm',{params: params}).then((res)=> {
					this.movies = res.data.data
					this.filmId = this.movies[0].filmId
					if(this.movies) {
						this.getShowMovieTime()
						this.hasData = true
					} else {
						this.hasData = false
					}
			}).catch((err) => {console.log(err)})
		},
		// 获取Swiper值
		getSwiperValue(val) {
			let params = {}
			params.cinemaId = parseInt(this.cinemaInfo.cinemaId)
			params.filmId   = parseInt(val)
			params = JSON.stringify(params)			
			this.$http.get(this.$domain+'/getShowTime',{params: params}).then((res) => {
				this.showTime = res.data
				console.log(this.showTime)
			}).catch((err) => {console.log(err)})
		},
		// 过去上映电影时间
		getShowMovieTime() {
			let params = {}
			params.cinemaId = parseInt(this.cinemaInfo.cinemaId)
			params.filmId   = this.filmId
			params = JSON.stringify(params)
			this.$http.get(this.$domain+'/getShowTime',{params: params}).then((res) => {
				this.showTime = res.data
				this.hasShow = true
			}).catch((err) => {console.log(err)})
		},
	},
	components: {
		filmSwiper,
		playData,
	}
}
</script>

<style>
section {
	display: block;
}
.cinema-wrap {
    background-color: #fff;
    display: block;
    margin: 0;
    padding: 0;
    font-size: 0;
    padding-bottom: 10px;	
}
.announce-content {
    padding: .375rem 1rem;
    background-color: #fff5be;
    font-size: .875rem;
    line-height: 1.25rem;
	color: #ff942a;    
}
.cinema-name {
    font-size: 1rem;
    line-height: 1.1875rem;
    margin-bottom: .5625rem;
    color: #222;
}
.cinema-address {
	font-size: .8125rem;
    margin-bottom: .375rem;
    color: #999;
    width: auto;
}
.cinema-tags {
	overflow: hidden;
	height: 30px;
}
ul li {
	list-style: none;
}
.tag {
	display: inline-block;
	font-size: 12px;
	text-align: center;
	color: #349cec;
	border: 1px solid #349cec;
	padding: 2px;
	border-radius: 5px;
}
.cinema-position::before {
	content: '';
	display: block;
	position: absolute;
	width: 8px;
	height: 8px;
	border: 1px solid #89add2;
	border-radius: 50%;
	top: 4px;
	left: 4px;
}
.cinema-position {
	position: relative;
	width: 18px;
	height: 18px;
	background-color: #fff;
	border-radius: 50%;
	border: 1px solid #89add2;
}
.cinema-position:after {
	content: '';
	position: absolute;
	top: 7px;
	left: 2px;
	width: 0;
	height: 0;
	border-top: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #89add2;
    transform: rotateZ(-46deg);
}

.coupon-content {
	background-color: #f3f9fd;
	width: 80vw;
	padding: 2vw;
	color: #65b1db;
	border-radius: 2px;
}
.scroll-wrap {
	background-color: #fff;
}
</style>