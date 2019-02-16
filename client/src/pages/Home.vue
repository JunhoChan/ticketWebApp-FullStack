<template>
	<section style="height:100vh;" ref="homes" 	
								@touchend="touchEnd($event)" >
		<selectCity />
		<header class="home-header border-bottom">
			<div class="city fl" @click="showCityList">
				 <span class="vm city-name f14">{{cityName}}</span>
	        	 <span class="city-arrow-icon vm f1"></span>			 
			</div>
		  	<div class="sel-lists f14 fl pr" @click="moveTab">
			        <div hot='sel' :class="{selnav: selectednav,fb:selectednav}">正在热映</div>
			        <div :class="{selnav: !selectednav,fb: !selectednav}">即将上映</div>
			        <span class="move pa" :style="{left: moveDistance}"></span>
			</div>			
		</header>

		<section  v-show="selectednav"  class="content">
	    		<swiper></swiper>
	    		<hot  :hotLists="hotLists" />
	    </section>	
	    <playVideo></playVideo>
	</section>
</template>

<script>
import AMap from 'AMap' // 高德地图
import { mapMutations } from 'vuex'
import selectCity from '../components/home/selectCity.vue' // 选择城市组件
import swiper from '../components/home/swiper.vue'
import hot from '../components/home/hot.vue'
import playVideo from '../components/playVideo/playVideo.vue'
 	export default {
		  data () {
		  		return {
		  			cityName:'广州',
		  			moveDistance: '5%',
		  			selectednav:true, // 默认选中热映
		  			pageNum:1, //
		  			pageSize:4,
		  			hotLists:[], // 热映电影数据 
		  		}
		  	},
		  components: {
		  	selectCity,
		    swiper,
		    hot,
		    playVideo,
		  },

		  mounted () {
		  		this.getCurrentCity()
		  		this.requestData('/getHotReleaseFilm')
		  },
		  methods: {
			 ...mapMutations([
			  	'showCityList',
			]),
		  	getCurrentCity () {
		  			const that = this
		  		    var map = new AMap.Map('container', {
				        resizeEnable: true
				    });
					    AMap.plugin('AMap.Geolocation', function() {
			        var geolocation = new AMap.Geolocation({
			        	GeoLocationFirst: false,
			            enableHighAccuracy: false,//是否使用高精度定位，默认:true
			            timeout: 10000,          //超过10秒后停止定位，默认：5s
			            maximumAge: 0 //定位结果缓存0毫秒，默认：0
			        });
			        map.addControl(geolocation);
			        geolocation.getCurrentPosition(function(status,result){
			            if(status=='complete'){
			                onComplete(result)
			            }else{
			                onError(result)
			            }
			        });
			          //解析定位结果
					    function onComplete(data) {
					        console.log("用户地址: ")
					        console.log(data)
					        console.log(data.addressComponent.city)
					        that.cityName = data.addressComponent.city
					        console.log(data.formattedAddress)
					    }
					    //解析定位错误信息
					    function onError(data) {
					        console.log('定位失败')
					        console.log('失败原因:')
					        console.log(data.message)
					    }
			    });

		  	},
		    moveTab (event) {
		      event.target.getAttribute('hot') ? this.selectHotTab() : this.slectComingTab()
		    },
		    selectHotTab () {
		      this.selectednav = true
		      this.moveDistance = '5%'
		    },
		    slectComingTab () {
		      this.selectednav = false
		      this.moveDistance = '55%'
		    },
		    requestData(url) {
		    	let params = {}
		    	params.pageNum = this.pageNum
		    	params.pageSize = this.pageSize
		    	this.$http.get(this.$domain + url,{params:params}).then((res) => {
		    			this.hotLists = res.data
		    	     }).catch(()=> {  console.log('服务器出错!')})
		    },
		    touchEnd(e) {
		    this.bottomFlash()
		  	this.requestData('/getHotReleaseFilm')		       	
		    },
		    bottomFlash() {
		    		   		//变量scrollTop是滚动条滚动时，距离顶部的距离
	   		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
	  		//变量windowHeight是可视区的高度
	   		var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
	   		//变量scrollHeight是滚动条的总高度
	   		var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;	             //滚动条到底部的条件
            if(scrollTop+windowHeight===scrollHeight){
              		this.pageSize += 4
              }   
		    },
		  },
	}
</script>

<style>
.home-header {
  height: 40px;
  font-size: 0px;
  background-color: #fff;
}
.selnav {
  color: #ff4d64;
}
.city {
  width: 35%;
  height: 100%;
  line-height: 40px;
  text-align: center;
  display: inline-block;
}
.city-arrow-icon {
  margin-left: 4px;
  width: 12px;
  height: 12px;
  display: inline-block;
}
.city-arrow-icon:after {
  content: "";
  display: block;
  width: 6px;
  height: 6px;
  margin-left: 0;
  border: 1px solid #50505a;
  border-top: 0 none;
  border-left: 0 none;
  margin-left: 2px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
.content {
  margin-bottom: 58px;
}
.sel-lists {
  width: 65%;
  display:-moz-box; 
  display: -webkit-box;
  display: box;
}
.sel-lists div {
  -moz-box-flex: 1.0; 
  -webkit-box-flex: 1.0; 
  line-height: 40px;
  text-align: center;
}
.move {
  display: inline-block;
  bottom: 0px;
  width: 40%;
  border-bottom: 3px solid #ff4d64;
  -webkit-transition: left 0.7s ease-in-out;
  transition: left 0.9s ease-in-out;
}
.click-load-more {
  height: 42px;
  line-height: 42px;
  text-align: center;
  color: #333;
  font-size: 15px;
  background-color: #fff;
  margin: 5px 0 8px;
}
.loading-icon span {
  vertical-align: middle;
}

</style>