<template>
	<section class="cinema-list mt40" v-if="cinemaList.length>0">
		<ul class="cinema-list-ul">
			<li class="list-item" v-for="item in cinemaList">
				<div class="list-item-container" @click="toCinemaDetail(item)">
					<h3>
						<span class="list-title">{{item.cName}}</span>
						<span class="list-price">
							27<span class="primary-color">元</span><span class="char">起</span>
						</span>
					</h3>
                    <div class="list-address">
                        {{item.cAddress}}（晚上22点后请由青宫南门入）
                    </div>
                    <div class="list-status">
                        <div class="status-info"><p>改签</p></div>
                        <div class="status-info"><p>观影小食</p></div>
                        <div class="status-info"><p>可停车</p></div>
                        <div class="status-info"><p>IMAX厅</p></div>                        
                    </div>
                    <div class="list-activity mt5">
                        <div class="activity-item">
                            <span class="icon-activity icon-new">新</span>特惠
                        </div>
                        <div class="activity-item">
                        <span class="icon-activity icon-food">食</span>小食限量7.9元起 
                        </div>
                    </div>
				</div>

			</li>
                      
		</ul>    
	</section>
</template>	

<script>
export default {
	props: {
		cinemaList:Array,
	},
	methods: {
		toCinemaDetail (params) {
            this.$router.push({path:'/cinemaDetail',query: params})
        },
	},
}
</script>

<style>
ul li{
list-style: none;
}
.list-item {
    font-size: 12px;
    line-height: 200%;
    overflow: hidden;
}

.list-item-container {
	width:100vw;
    padding-left:15px;
    padding-top:20px;
    padding-bottom:8px;
    background-color:#fff;
    border-bottom:1px solid #e2e2e2;    
}
.list-item-container h3 {
	position: relative;
    font-size: 1.0625rem;
    line-height: 1.5rem;
    margin-bottom: 2px;
    font-weight: 500;
    color: #000;
}
.list-title  {
	display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 16.875rem;
    vertical-align: top;
}
.list-price {
	display: inline-block;
    line-height: 1.5rem;
    vertical-align: baseline;
    color: #ff4d64;
    margin-right: .0625rem;
    font-size: .9375rem;
    font-weight: 400;
    padding-right: 2.9375rem;
    position: absolute;
    right: 0;
    top: 0;
}
.primary-color {
    font-size: .625rem;
	color: #ff4d64;
}
.char {
	font-size: .625rem;
    color: #999;
}
.list-address {
    width: 16.875rem;    
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: .8125rem;
}
.list-status {
    display:flex;
}
.status-info {
    color: #349cec;
    border:1px solid #349cec;
    margin-left:5px;
    height:1rem;
    padding-right:5px;
    padding-left:5px;
    border-radius:2px;
}
.status-info p {
    transform:translateY(-4px);
}
.activity-item {
    height: .9375rem;
    line-height: .9375rem;
    color: #999;
    font-size: .75rem;
    margin-top: .3125rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.icon-activity {
    border-radius: 2px;
    display: inline-block;
    width: 15px;
    height: 15px;
    line-height: 15px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    margin-right: .1875rem;
    margin-right: .8vw;
}
.icon-new {
        background-color: #fe7a4c;
}
.icon-food {
    background-color: #fea54c;
}	
</style>