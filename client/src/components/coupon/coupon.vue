<template>
	<section class="flex mb15" id="discount-coupon" @click="selectedCoupon">
		<div class="flex flex-center" v-show="couponStatus===2">
			<span class="pr mr5 fb f13rem red" :class="selectStatus===false?'coupon-selector':'coupon-selector-selected'"></span>
		</div>
		<div class="discount-coupon-wrapper flex" :class="validCoupon?'validCoupon':'unvalidCoupon'">
			<div class="discount-circle-wrapper pw3">
				<i class="discount-circle-icon mb15"></i>
				<i class="discount-circle-icon mb15"></i>
				<i class="discount-circle-icon"></i>			
			</div>
			<div class="discount-details-wrapper">
				<div class="discount-details-top pb20 pl flex pr">
					<div class="flex flex-center discount-price mt10">
						&yen;&nbsp;<span class="f18rem fb red">{{price}}</span>
					</div>
					<div class="flex flex-column ml10 mt5">
						<span class="mb5 fb f1rem">新人专属优惠卷</span>
						<span class="f12">满20元可用</span>
					</div>
				</div>
				<div class="discount-details-bottom flex flex-bt mt25 f075 ml20">
						<span>有效期至{{validTime}}</span>
						<span>优惠卷使用规则&or;</span>
				</div>
			</div>
		</div>
	</section>
</template>
<script>	
export default {
	data () {
		return {
			couponStatus: 1, //1 展示 2展示&可使用
			selectStatus:false, //  当前没被选中
			validCoupon:false, // 默认优惠卷没效果
		}
	},
	created() {
		this.couponStatus = parseInt(this.type)
		this.__init()
	},
	methods: {
		selectedCoupon() {
			if(parseInt(this.totalPrice) < 20 || !this.totalPrice ) { // 20 是最低满足条件
				return;
			}
			this.selectStatus = !this.selectStatus
			this.$emit('selectCoupon',parseInt(this.price))
		},
		__init() { // 检验票是否可使用 
			if(this.couponStatus === 2) { // 2 代表进入可以选择优惠卷 1 仅看
					if(parseInt(this.totalPrice) > 20 && this.totalPrice) { // 20代表满足使用条件
							this.validCoupon = true
					}
			} else {
				this.validCoupon = true
			}
		}
	},
	props: {
		price:String,
		validTime:String,
		type:String, // 其实是整形 因为被隐转了 
		totalPrice: Number, // 订单总金额
	},
}	
</script>
<style>

.validCoupon {
	background-color:#fe7587;
	color:#333;
}
.unvalidCoupon {
	background-color: grey;
	color: #333;
}
.discount-coupon-wrapper {
	width:90vw;
	height:8rem;
	border-radius:1rem;
	border-left:thick double #ff0000;
}
.coupon-selector {
	width:10px;
	height:10px;
	border-radius:50%;
	border:2px solid red;
	background-color:#fff;
}

.coupon-selector-selected {
	width:10px;
	height:10px;
	border-radius:50%;
	border:2px solid red;
	background-color:#fff;
}

.coupon-selector-selected:after {
	content:'';
	display:block;
	width:7px;
	height:7px;
	border-radius:50%;
	background-color:red;
	position:absolute;
	left:1px;
	top:1.4px;
}
.discount-circle-icon {
	display:block;
	width:1.5rem;
	height:1.5rem;
	background-color:#f5f5f5;
	border-radius:50%;
}
.discount-price {
	display:table-cell;     
	vertical-align:bottom;   
}
.discount-details-wrapper {
	width:80%;
	padding:4vw 4vw 0 0;
}
.discount-details-top {
  width:100%;
  border-bottom:1px solid #fff;
}
.discount-details-top:after {
  content: '惠';
  color:#fff;
  position:absolute;
  font-size:.8rem;
  bottom:-30%;
  font-weight:bold;
  background-color:#fa465d;
  width:6%;
  height:4vw;
  line-height:4vw;
  text-align:center;
}
</style>