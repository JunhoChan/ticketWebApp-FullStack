<template>
	<section class="flex flex-column">
		<headerTop title="电影名" leftNav="1" />
		<div class="mt50 bgfff border-top flex flex-column flex-center pb25">
			<div class="pt20 f14 mb10">我的评分</div>
			<el-rate v-model="value" :allow-half="true"  show-text></el-rate>
		</div>
		<div class="bgfff">
			<el-input
				  type="textarea"
				  :rows="10"
				  placeholder="请输入内容"
				  v-model="textVal">
				</el-input>
		</div>
		<div class="btn-publish mt20 flex flex-center">
			<button class="w f085" @click="publishComment">发 布</button>
		</div>
	</section>
</template>
<script>
import { Toast } from 'mint-ui';
import headerTop from './../components/header/header.vue'
export default{
	data() {
		return {
			value: null,
			textVal:'',
			user:{},
		}
	},
	created() {
		this.user = JSON.parse(window.sessionStorage.getItem('userInfo'))
	},
	methods: {
		publishComment() {
			let params = {}
			params.filmId = parseInt(this.$route.params.filmId)
			params.score = this.value
			params.content = this.textVal
			params.userId = parseInt(this.user.userId)
			params.username = this.user.username
			this.$http.post(this.$domain + '/addMovieComment',params).then((res)=> {
					if(res.data.code === 201) {
						Toast('评价电影成功!')
						this.$router.go(-1)
					}else {
						Toast('服务器出现问题!')
					}
			}).catch((err) => {  console.log(err)})			
		}
	},
	components: {
		headerTop,
	}
}
</script>
<style>
.textarea-content {
	height:50vw;
	width:100%;
}
.btn-publish {
	width:100%;
	height:3rem;
	bottom:0;
	background-color:#02386f;
}
.btn-publish button {
	border:none;
	background-color:transparent;
	color:#fff;
	line-height:3rem;
}
</style>