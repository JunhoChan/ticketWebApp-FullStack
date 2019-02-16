<template>
	<section id="playData">
		<div class="p10 f075 border-top border-bottom pr">
			<ul class="flex flex-center" @click="selectTab">
			 <li :class="tabIndex===0?'active':''" data-tap="0">今天11-28</li>
			 <li :class="tabIndex===1?'active':''" data-tap="1" class="ml20">明天11-28</li>
			 <li :class="tabIndex===2?'active':''" data-tap="2" class="ml20">后天11-28</li>
			 <li :class="tabIndex===3?'active':''" data-tap="3" class="ml20">11月28日</li>
			 <li :class="tabIndex===4?'active':''" data-tap="4" class="ml20">11月29日</li>
			</ul>
			<div class="pa slide-block" :style="{left: moveDistance}"></div>		
		</div>

		<div class="activity-content p15  border-bottom">
			<span class="tag-new ml10">新</span>
			<span class="theme">特惠活动每人仅限参加1次，单次限购1张</span>
			<span class="sub-title tddd">2个活动 ></span>
		</div>
		<schedules :SchedulesData="SchedulesData" :cinemaName="cName" />
	</section>
</template>

<script>
import schedules from './schedules.vue'
export default {
	data() {
		return {
			moveDistance: '13%', // 移动距离
			tabIndex: 0,  // 默认tab0为第一页
			SchedulesData: [],
			cName:'',
		}	
	},
	created() {
		this.SchedulesData = this.showTime
		this.selectShowStatus(this.tabIndex)
		this.cName = this.cinemaName
	},
	watch: {
		showTime: {
           handler(){
                this.SchedulesData = this.showTime
				this.selectShowStatus(this.tabIndex)
            },
            deep:true		
		}
	},
	methods: {
		selectTab(event) {
			this.tabIndex =	parseInt(event.path[0].getAttribute('data-tap'))
			switch(this.tabIndex) {
				case 1: this.moveDistance = '32%';
						break;
				case 2: this.moveDistance = '49%';
						break;
				case 3: this.moveDistance = '66%';
						break;
				case 4: this.moveDistance = '83%';
						break;												
				default: this.moveDistance = '13%';
						break;									
			}
				this.selectShowStatus(this.tabIndex)
		},
		selectShowStatus(i) {
			this.SchedulesData = this.showTime.filter((item,index,self)=>{
						if(item.status === i) return item
					})
		},
	},
	props: {
		showTime:Array,
		cinemaName:String,
	},
	components: {
		schedules
	}

}
</script>

<style>
ul li {
	list-style:none;
}
.active {
	color: #ff4d64;
}
.slide-block {
	background-color:#ff4d64;
	width:1rem;
	height:1px;
	bottom:0;
 	transition: left 0.9s ease-in-out;
}
.tag-new {
	width: 15px;
    height: 15px;
    line-height: 15px;
    border-radius: 2px;
    font-size: .625rem;
    color: #fff;
    text-align: center;
    background-color: #fe7a4c;    
}
.theme {
	padding-right: 1.9vw;
    color: #999;
    width: auto;
    font-size: .8525rem;    
}
.sub-title {
    height: 15px;
    line-height: 15px;
    font-size: .8125rem;	
}

</style>
