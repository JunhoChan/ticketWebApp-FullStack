<template>	
	<section ref="city" id="select-city" class="pf fadeInDown"  v-if="$store.state.city.show">
		<header class="city-header mint-1px-b pr">
			<span class="fb">选择城市</span>
			<span class="close-city pa" @click="closeCityList">×</span>
		</header>
		<div ref="city" @click="selectCity">
			<mt-index-list>
			  <mt-index-section :index="city.sort" v-for="city in cityList" key="city.sort" >
			    <mt-cell :title="name.regionName" v-for="name in city.data"  key="name.id"></mt-cell>
			  </mt-index-section>
			</mt-index-list>
		</div>
	</section>
</template>

<script>
import { mapMutations } from 'vuex'
export default{
	data () {
		return {
			showCityList: true,
			cityList: []
		}
	},
	methods: {
		...mapMutations([
			  	'closeCityList',
		]),
		requestData (url, fn) {
		  	this.$http.get(url).then(fn)
		},
		// 将获取的城市信息初始化
		__initCityInfo() {
			this.$http.get('/v1/city').then( (res) =>{
				let data = res.data
				let cityObj = data.data.returnValue
				let citySort = Object.keys(cityObj)
				console.log(citySort)
				this.convertCityData(citySort,cityObj)			
			}).catch((err) => {   console.log(err)})
		},
		// 城市数据规范化
		convertCityData(Arr,cityObj) {
			this.cityList.push({
				sort: '热门',
				data: [{
					regionName: '北京',
					id: 1,
					rN: 'bj'
				}, {
					regionName: '上海',
					id: 2,
					rN: 'sh'
				}, {
					regionName: '广州',
					id: 3,
					rN: 'gz'
				}, {
					regionName: '深圳',
					id: 4,
					rN: 'gz'
				}]
			})

			Arr.forEach((item) => {
				this.cityList.push({
					sort: item,
					data: cityObj[item]
				})
			})
		},
		selectCity (event) {
			let ele = event.target
			let className = ele.className
			let name = ''
			if (className === "mint-indexsection-index" || className ==="mint-indexlist-nav" || className === "mint-indexlist-navitem") {
				name = ''
			} else if (className === 'mint-cell-wrapper') {
				name = ele.children[0].children[0].innerHTML
			} else if (className === "mint-cell-title") {
				name = ele.children[0].innerHTML
			} else {
				name = ele.innerHTML 
			}
			if (name) {
				console.log('--信息--')
				console.log(name)
				// this.changeCityData({
				// 	city: {
				// 		name: name,
				// 		rN: this.matchCityStr(name)
				// 	}
				// }) 
			} else {
				return false
			}
		}
	},
	created () {
		this.__initCityInfo()
	}
}
</script>

<style>
.mint-indicator-wrapper {
	z-index: 1000
}
#select-city {
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 9999999;
	background-color: #fff;
}
.city-header {
	height: 46px;
	line-height: 46px;
	text-align: center;
	color: #000;
	font-size: 16px;
	background-color: #fff;
}
.close-city {
	font-size: 28px;
	color: #666;
	display: inline-block;
	height: 46px;
	width: 50px;
	line-height: 38px;
	text-align: center;
	right: 0px;
}
@-webkit-keyframes fadeInDown {
  0% {
    opacity: .7;
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px)
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0)
  }
}
@keyframes fadeInDown {
  0% {
    opacity: .7;
    -webkit-transform: translateY(-50px);
    -ms-transform: translateY(-50px);
    transform: translateY(-50px)
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0)
  }
}
.fadeInDown {
  -webkit-animation: fadeInDown .3s;
  animation: fadeInDown .3s;
}
@-webkit-keyframes fadeOutTop {
  0% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0)
  }
  100% {
		opacity: 0;
		-webkit-transform: translateY(-50px);
		transform: translateY(-50px)
  }
}
@keyframes fadeOutTop {
  0% {
    opacity: 1;
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0)
  }
  100% {
	  opacity: 0;
	  -webkit-transform: translateY(-50px);
	  -ms-transform: translateY(-50px);
	  transform: translateY(-50px)
  }
}
.fadeOutTop {
  -webkit-animation: fadeOutTop .35s;
  animation: fadeOutTop .35s;
}
</style>

