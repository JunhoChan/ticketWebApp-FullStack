<template>
	<section id="map">
		<header class="header-content block w100 tddd flex flex-center">
			<span class="back" @click="back"></span>	{{params.cinemaName}}
		</header>
		<div id="container" ></div>
		<div id="panel" v-if="direct"></div>
		<div id="selectPanel" @click="directSelct">
			<p v-if="direct===true">关闭导航</p>
			<p v-else>显示导航</p>			
		</div>
	</section>
</template>

<script>
import AMap from 'AMap' // 高德地图  广东省广州市从化区太平镇博学路广州大学华软软件学院
export default {
	data() {
		return {
			showLine:false,
			direct:true,
			params:{},
		}
	},
	methods: {
		directSelct () {
			if(this.direct) {
				this.direct = false;
			}else {
				this.direct =true;
			}
			console.log(this.direct)
		},
		back() {
			this.$router.go(-1)
		},
		getAddressLine() {
					   var map = new AMap.Map("container", {
		        resizeEnable: true,
		        // center: [116.397428, 39.90923],//地图中心点
		        // zoom: 13 //地图显示的缩放级别
		    });
		    //构造路线导航类
		    var driving = new AMap.Driving({
		        map: map,
		        panel: "panel"
		    }); 
		    // 根据起终点名称规划驾车导航路线
		    driving.search([
		        {keyword: '从化区太平镇博学路广州大学华软软件学院',city:'广州'},
		        {keyword: this.params.address,city:this.params.city}
		    ], function(status, result) {
		        // if (status === 'complete') {
		        //     log.success('绘制驾车路线完成')
		        // } else {
		        //     log.error('获取驾车数据失败：' + result)
		        // }
		    });
		},
		selectPanel() {

		},
	},
	mounted() {
		// console.log('--高德地图--')
		// console.log(this.$route.params)
		this.params = this.$route.params
		this.getAddressLine()
	},
}	
</script>

<style>
.header-content {
	position:relative;
	width:100%;
	height:10vw;
	background-color: #f9f9f9;
    color: #000;
    font-size: 1.125rem;
    text-align: center;
    border-bottom: 1px solid #ccc;        	
}
.back {
	position:absolute;
	width: 0;
	height: 0;
	border-width: .55rem;
	border-style: solid;
	border-color: transparent #000 transparent transparent;
	left:-1.5rem;
}
.back:after {
	content:'';
	position:absolute;
	width: 0;
	height: 0;
	border-width: .50rem;
	border-style: solid;
	border-color: transparent #f9f9f9 transparent transparent;	
	z-index:999;
	top:-0.5rem;
	left:1.9rem;
}
#container {
    width: 100vw;
    height: 100vh;
}
#panel {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 10px;
    right: 10px;
    width: 280px;
 }
#panel .amap-call {
    background-color: #009cf9;
    border-top-left-radius: 4px;
   	border-top-right-radius: 4px;
}
#panel .amap-lib-driving {
	border-bottom-left-radius: 4px;
   	border-bottom-right-radius: 4px;
    overflow: hidden;
}
#selectPanel {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 5rem;
    left: 1rem;
    width: 3rem;
    height: 3rem;
    opacity:.9;
    border-radius:50%; 
}
#selectPanel p {
	font-size:.9rem;
	font-weight:700;
	width:90%;
	margin-left:.3rem;
	margin-top:.3rem;
	word-break: break-all;
    word-wrap: break-word;  
}
</style>