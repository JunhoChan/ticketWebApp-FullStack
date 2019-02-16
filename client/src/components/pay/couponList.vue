<template>
	<section id="coupunList"  class="pa fadeInLeft" v-if="$store.state.dicountment.show">
    <header class="coupunList-header mint-1px-b">
        <span class="fb">选择优惠卷</span>
        <span class="close-coupunList pa" @click="closeDicountmentList">×</span>
    </header> 
    <div ref="coupon" class="mt100 flex flex-column flex-center">
        <coupon price="5" validTime="2019.01.01" type="2" @selectCoupon="selectCoupon"
        :totalPrice='totalMoney' />  
        <coupon price="10" validTime="2019.01.01" type="2" @selectCoupon="selectCoupon"
        :totalPrice='totalMoney' />
        <coupon price="15" validTime="2019.01.01" type="2" @selectCoupon="selectCoupon"
        :totalPrice='totalMoney' />              
    </div>
	</section>
</template>

<script>
import coupon from './../coupon/coupon.vue'
import { mapMutations } from 'vuex' // vuex is involved in current discountment
export default {
	data() {
    return {
      saveMoney: -1,
      totalMoney:0,
    }
	},
  created(){
    this.totalMoney = this.totalPrice
  },
  methods: {
    ...mapMutations([
          'closeDicountmentList'
    ]),
    selectCoupon(val) {
      this.saveMoney = val
      //  emit data pushed current parently page   将数据传给父页
      this.closeDicountmentList()
      this.$emit("handleDiscountment", this.saveMoney)
      // console.log(this.saveMoney)
    },
  },
  components: {
    coupon,
  },
  props: {
    totalPrice:Number,
  }
}	
</script>

<style>
#coupunList {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #f5f5f5;
}
.coupunList-header {
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
.close-coupunList {
	font-size: 38px;
	color: #666;
	display: inline-block;
	height: 46px;
	width: 50px;
	line-height: 38px;
	text-align: center;
	right: 0px;
  top:.1rem;
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
  -webkit-animation: fadeInLeft .5s;
  animation: fadeInLeft .5s;
}
</style>