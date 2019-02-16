<template>
	<section class="myComing" ref="hotList"  >
		<ul class="coming_item">
			<li v-for="item in hotLists" :class="{'border-bottom': hotLists[hotLists.length-1] != item}">
				<div class="coming_wrap">
					<div class="coming_info">
						<figure class="info_poster" @click="playMovieVideo(item.videoUrl,
						item.coverImg)">
							<img :src="item.coverImg" alt="film-poster"/>
							<div class="play_icon">
								<img src="https://gw.alicdn.com/tps/TB1PH2uLXXXXXaLaXXXXXXXXXXX-60-60.png" alt="播放icon">
							</div>
						</figure>

						<div class="info_content" @click="toDFilmetail(item)">
								 <div style="display:flex; margin-bottom:10px;">
									   <span class="info_title">
											{{item.filmName}}
										</span>
										<span class="view_type">
											<i class="lbl-hdr">3D</i>
											<i class="lbl">IMAX</i>
										</span>
								 </div>
								 <div class="brief">
								 	淘票票评价&nbsp;
								 	<span class="txt-warning">{{item.filmScore}}</span>
								 </div>
								 <div class="brief"> 导演：{{item.fimeAtor}}</div>
								 <div class="brief"> 主演：{{item.filmDiretor}}</div>
						</div>

						<div id="home_info_btn">
							<button class="home_buy_btn pink_bg" v-if="item.startTime<= '2018-12-01'"
								@click="buyTick(item)">购票</button>
							<button class="home_buy_btn blue_bg" v-else>预售</button>
							<div class="btn_tag" @click="buyTick(item)">特惠</div>
						</div>
					</div>
				</div>
		  </li>	
		</ul>
	</section>	
</template>

<script>
import { mapMutations } from 'vuex'
export default {
	data() {
		return {
			CurrentDate: '',
		}
	},
  props: {
  	'hotLists': {
  		type: Array,
  		default: () => []
  	}
  },
  created() {
  	this.getCurrentTime()
  },
  methods: {
  	 ...mapMutations([
  		'playVideo'
  	]),
  	 playMovieVideo (url, cover) {
  		this.playVideo({audio: {
  			url,
  			cover
  		}})
  	},// 跳到电影详情页
  	toDFilmetail (params) {
  		this.$router.push({name:'movieDetail' , params: params})
  	},
  	// 获取当前
  	getCurrentTime () {
  	 	let now = new Date(),
  	 		year = now.getFullYear(),
  	 		month = now.getMonth() + 1,
  	 		date = now.getDate();
  	 		 if(month<10){
          		month="0"+month;
           	  }
	  	 	if(date<10){
	           date="0"+date;
	          }
	    this.CurrentDate = year+"-"+month+"-"+date; 
     },
     // 跳到买票页
     buyTick(params) {
  		this.$router.push('/cinema')
  	},
  },


}
</script>

<style>
	.myComing {
			  box-sizing: border-box;
			  margin-bottom: 10px;
	}

	.coming_item {
			 position: relative;
			 background-color:#fff;
			 padding-left:4vw;
	}
	.coming_wrap {
			 background:transparent linear-gradient(0deg,#ededed,#ededed 50%,transparent 0,transparent 0) 0 100% repeat-x;
			 background-size:100% 1px;
	}
	.coming_info {
		    display: -webkit-box;
		    display: -webkit-flex;
		    display: -ms-flexbox;
		    display: flex;
		    padding: 4vw 4vw 4vw 0;
	}
	.coming_item  .info_poster {
		    -webkit-box-flex: 0;
		    -webkit-flex: 0 0 auto;
		    -ms-flex: 0 0 auto;
		    flex: 0 0 auto;
		    width: 17.3vw;
		    height: 25.3vw;
		    background-size: 8vw 8vw;
	}

	.info_poster {
		    position: relative;
		    background: #e2e2e2 no-repeat 50%;
		    border-radius: 2px;
	}

	.info_poster img,
	.play_icon img {
			width:100%;
			height:100%;
	}
	.play_icon {
			position: absolute;
			width: 18px;
			height: 18px;
			top: 50%;
			left: 50%;
			margin-left: -8.5px;
			margin-top: -8.5px;
	}
	.info_content {
			display: flex;
			flex-direction:column;
			padding-left:2.7vw;
			padding-right:2.7vw;
			flex: 1 1 auto;
			overflow: hidden;
	}
	.info_title {
			color: #000;
		    font-weight: 500;
		    -webkit-box-flex: 0;
		    -webkit-flex: 0 1 auto;
		    -ms-flex: 0 1 auto;
		    flex: 0 1 auto;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    white-space: nowrap;
		    display: block;
		    max-width: 100%;
		    font-style:normal;
	}
	.view_type {
		    display: block;
		    -webkit-box-flex: 0;
		    -webkit-flex: 0 0 auto;
		    -ms-flex: 0 0 auto;
		    flex: 0 0 auto;
		    margin-left:4px;
		    font-size:14px;
		    line-height:16px;
		    box-sizing:border-box;
	}
	.view_type .lbl-hdr {
			text-align:center;
		    color: #fff;
		    background-color: #999;
		    border-top-left-radius: 2px;
		    border-bottom-left-radius: 2px;
	}
	.view_type .lbl {
			border:1px solid grey;
			margin-left:-3px;	
	}
	.brief {
			color: #777;
		    font-size: 13px;
		    margin-top: 5px;
		    width: auto;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    white-space: nowrap;
	}
	.txt-warning {
		    color: #fea54c;
		    font-size: 14px;
	}
	#home_info_btn {
			display:flex;
			flex: 0 0 auto;
			flex-direction:column;
			align-items: center;
			justify-content: center;
	}
	.home_buy_btn {
			border:0;
			text-align:center;
			color:#fff;
			border-radius:120px;
			height:38px;
			width:50px;
			box-sizing: border-box;
			font-size:13px;
			font-weight:700;
			margin-bottom:5px;
	}
	
	.pink_bg {
			background-image: linear-gradient(45deg,#ff7ba0,#ff4d64);
	}
	.blue_bg {
			background-image: -webkit-linear-gradient(45deg,#55c2ff,#349cec);
		    background-image: linear-gradient(45deg,#55c2ff,#349cec);
	}
	.btn_tag {
		    color: #999;
		    max-width: 13.33333333vw;
		    margin-top: 1.33333333vw;
		    font-size: 13px;
		    font-weight:700;
		    width: auto;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    white-space: nowrap;
	}
</style>