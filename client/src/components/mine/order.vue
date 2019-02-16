<template>
	<section id="orderList"  class="pa fadeInLeft flex flex-column" v-if="showOrder">
    <header class="orderList-header mint-1px-b">
        <span class="fb">我的订单</span>
        <span class="close-orderList pa blue flex flex-center" @click="closeIt">
        	<i class="left-arrow"></i>返回
    	</span>
    </header>
    <div class="mt100 flex flex-center f15rem" v-if="orderInfoList.length === 0">
            您当前还未观看过电影！
    </div>
    <div class="mt50 flex flex-column" style="overflow-y: scroll;overflow-x: hidden;" v-else>
             <ticket :orderInfoList="orderInfoList"></ticket>
    </div>
	</section>
</template>

<script>
import ticket from './ticket.vue'
export default {
  data() {
    return {
      orderInfoList:[],
    }
  },
  created() {
      this.orderInfoList = this.orderInfo
  },
	methods: {
		closeIt () {
			this.$emit('closeOrderPage') //关闭
		},
	},
	props: {
		showOrder:Boolean,
    orderInfo:Array
	},
	components:{
		ticket,
	}
}	
</script>

<style>
#orderList {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100000;
  background-color: #eddede;
  overflow:hidden;
}
.orderList-header {
  position:fixed;
  width:100vw;
  top:0;
	height: 46px;
	line-height: 46px;
	text-align: center;
	color: #000;
	font-size: 16px;
	background-color: #fff;
  z-index:1000;
}
.close-orderList {
	font-size: 1.1rem;
	left: 1rem;
	top:-.1rem;
}
@-webkit-keyframes fadeInLeft {
  0% {
    opacity: .7;
    -webkit-transform: translateX(180px);
    transform: translateX(180px)
  }
  100% {
    opacity: 1;
    -webkit-transform: translateX(0);
    transform: translateX(0)
  }
}
@keyframes fadeInLeft {
  0% {
    opacity: .7;
    -webkit-transform: translateX(180px);
    -ms-transform: translateX(180px);
    transform: translateX(180px)
  }
  100% {
    opacity: 1;
    -webkit-transform: translateX(0);
    -ms-transform: translateX(0);
    transform: translateX(0)
  }
}
.fadeInLeft {
  -webkit-animation: fadeInLeft 1s;
  animation: fadeInLeft 1s;
}




</style>