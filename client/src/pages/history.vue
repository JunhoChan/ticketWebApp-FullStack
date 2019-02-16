<template>
	<section class="flex flex-column">
		<headerTop leftNav="1" title="看过的电影"></headerTop>
		<div class="mt50">
			<p class="f095 p10">以下影片
				<span class="f085">(购买过票或写影评标记看过的)</span></p>
		</div>
		<div class="block bgfff border-bottom" v-for="item in moviesList" v-if="moviesList">
				<div class="flex view-movie-wrapper">
					<img :src="item.coverImg" class="view-cover" alt="封面" />
					<div class="ml10 mt10">
						<p class="fb f20">{{item.filmName}}</p>
						<p class="f14">{{item.startTime}}上映</p>
						<p class="f14 mt20">导演: {{item.filmDiretor}}</p>
						<p class="f14">主演: {{item.fimeAtor}}</p>
					</div>
				</div>
				<div class="flex flex-bt pl4vw pb10" v-if="item.status === 0">
					<el-rate v-model="value1"disabled></el-rate>
					<button class="mr4vw rate-btn" @click="toPubshli(item.filmId)">评分</button>
				</div>
				<div class="flex flex-end red p10 fb red"  v-else>已评价</div>
		</div>
		<div class="block bgfff none-view-film" v-else>
			您当前还未观看过电影
		</div>
	</section>	
</template>
<script>
import headerTop from './../components/header/header.vue'
export default {
	data() {
		return {
			value1: null,
			moviesList: [],
		}
	},
	created() {
		this.getUserSawMovies()
	},
	methods: {
		toPubshli (fId) {
			console.log(fId)
			this.$router.push({name:'publish', params:{filmId: fId} })
		},
		getUserSawMovies() {
			let params = {}
			params.id = parseInt(JSON.parse(window.sessionStorage.getItem('userInfo')).userId)
			this.$http.get(this.$domain + '/showCommentMovies',{params:params}).then((res)=> {
					this.moviesList = res.data
			})
		}
	},
	components: {
		headerTop,
	},
}	
</script>
<style>
.view-cover {
	width:5.5rem;;
	height:7rem;
}
.view-movie-wrapper {
	padding: 4vw 4vw 2vw 4vw;
}
.rate-btn {
	border:none;
	color:#fff;
	background-color:#02386f;
	border-radius:10px;
	height:1.5rem;
	width:3rem;
}

.none-view-film {
	width:100%;
	height:50vh;
}
</style>