<template>
<section id="cinema" @touchend="touchEnd($event)">
	<section class="topbar">
		<div class="city-selector">
			<div class="cityName">广州</div>
			<div class="selector-arrow"></div>
		</div>
		<div class="topbar-container">
			<div class="regionName-selector" >
				<div class="selector-value">区域</div>
			    <div class="selector-i-arrow"></div>
			</div>
			<div class="type-selector" @click="isShowOrder">
				<div class="selector-value">{{order}}</div>
			    <div class="selector-i-arrow"></div>			
			</div>
		</div>
	</section>
    <!--  区域内容  -->
    <section class="mask pr" v-show="showOrder" @click="showOrder=false">
        <div class="pa on-mask mt40 bgfff f14 w">
            <ul @click="selectOrder">
                <li class="border-bottom p10" data-order="1" 
                            :class="orderStatus === 1 ?'active': ''">综合排序</li>
                <li class="border-bottom p10" data-order="2" 
                            :class="orderStatus === 2 ?'active': ''">离我最近</li>
                <li class="border-bottom p10" data-order="3"
                            :class="orderStatus === 3 ?'active': ''">价格最低</li>
            </ul>
        </div>
    </section>

    <cinemaList :cinemaList="cinemaList" class="mb50"></cinemaList>   
</section>
</template>

<script>
import cinemaList from './../components/cinema/cinema'
export default {
	data() {
        return {
            order:'综合排序',
            orderStatus: 1, // 排序状态
            pageNum:1,
            pageSize:5,
            cinemaList: [],
            showOrder: false,
        }
    },
    created () {
            this.getCinemaList()
    },
    methods: {
        // 选择排序
        isShowOrder() {
            this.showOrder = true
            document.documentElement.style.overflow = 'hidden'            
        },
        selectOrder (event) {
            this.order = event.target.innerHTML.trim()
            this.orderStatus = parseInt(event.path[0].getAttribute('data-order'))
            console.log(this.orderStatus)
            this.showOrder = true
            document.documentElement.style.overflow = 'scroll'
        },
        getCinemaList() {
            let params = {}
            params.pageNum = this.pageNum
            params.pageSize = this.pageSize
            this.$http.get(this.$domain+'/getAllCinemaData', {params: params}).then((res) => {
                this.cinemaList = res.data.data
            })
        },
        touchEnd(e) {
            this.bottomFlash()
            this.getCinemaList()            
        },
        bottomFlash() {
                            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;                //滚动条到底部的条件
            if(scrollTop+windowHeight===scrollHeight){
                    this.pageSize += 2
              }   
        },        
    },
    components: {
        cinemaList,
    },	
}
</script>

<style>
.topbar {
    display: block;
    width: 100%;
    height:40px;
    color: #999;
    box-sizing: border-box;
    z-index: 1000000;
    position: fixed;
    background-color:#fff;
    top:0;
}
.city-selector {
	position: absolute;
    text-align: left;
    width: 6.5625rem;
    box-sizing: border-box;
    color: #999;
    padding-left: 2.5625rem;
    background-size: 1.5625rem;
    background-repeat: no-repeat;
    font-size: .875rem;
}
.cityName {
	display: inline-block;
    vertical-align: middle;
    height: 100%;
    line-height: 2.6875rem;
    max-width: 3.125rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.selector-arrow {
	position: absolute;
    text-align: left;
    width: 6.5625rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #999;
    padding-left: 2.5625rem;
    background-size: 1.5625rem;
    background-repeat: no-repeat;
    font-size: .875rem;
    top:1.1rem;
    left:2.3rem;
}
.selector-arrow:after {
	content: "";
    display: block;
    width: 5px;
    height: 5px;
    margin-left: 0;
    border: 1px solid #999;
    border-top: 0 none;
    border-left: 0 none;
    -webkit-transform: rotate(45deg);
}
.topbar-container {
	display: table;
    width: 100%;
    box-sizing: border-box;
    padding-left: 6.75rem;
}
.regionName-selector {
	display: table-cell;
    position: relative;
    text-align: center;
    width: 26%;
    color: #333;
    font-size: .8125rem;
    top:13px;
    left:1.8rem;
}
.regionName-selector:before {
	left: 0;
}
.regionName-selector:after {
	content: "";
    display: block;
    position: absolute;
    width: 1px;
    height: 1.4375rem;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #e2e2e2;
    -webkit-transform: scaleX(.5);
    -ms-transform: scaleX(.5);
    transform: scaleX(.5);
}
.selector-value {
	max-width: 24.1vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.selector-i-arrow {
    display: block;
    width: 5px;
    height: 5px;
    margin-left: 0;
    border: 1px solid #999;
    border-top: 0 none;
    border-left: 0 none;
    -webkit-transform: rotate(45deg);
    position:absolute;
    top:4px;
    left:4.8rem;
}
.type-selector {
	display: table-cell;
    position: relative;
    text-align: center;
    width: 28%;
    color: #333;
    font-size: .8125rem;
    top:13px;
    left:1rem;    
}
.type-selector:before {
	left: 0;
}
.type-selector:after {
	content: "";
    display: block;
    position: absolute;
    width: 1px;
    height: 1.4375rem;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #e2e2e2;
    -webkit-transform: scaleX(.5);
    -ms-transform: scaleX(.5);
    transform: scaleX(.5);
}

</style>