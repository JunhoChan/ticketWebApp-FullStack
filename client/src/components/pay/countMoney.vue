<template>
	<section :class="showCount?'mask':''" @click="closeCount" id="user-price">
		<div class="user-price-detail pf pw3" :class="showCount?'price-show':'price-hidden'">
			<div class="price-content">
				<div class="flex flex-bt">
					<div class="ml5 flex flex-center">
						<span class="price-info f075 fff fb mr5">原价</span>电影票*{{oldInfo.num}}</div>
					<span class="mr10vw"> {{oldInfo.totalPrice}}元</span>
				</div>
				<div class="flex flex-bt mt10">
					<div class="ml5 flex flex-center">
						<span class="price-activity f075 fff fb mr5">优惠</span>活动</div>
					<span class="mr10vw">-{{offerMoney}}元</span>
				</div>
				<div class="flex flex-bt mt10">
					<div class="ml5 flex flex-center">
						<span class="price-success f075 fff fb mr5">优惠</span>优惠卷</div>
					<span class="mr10vw">-{{saveMoney}}元</span>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
export default {
	methods: {
		closeCount() {
			this.$emit('closeCount')
		}
	},
	props: {
		showCount:Boolean,
		saveMoney:Number,
		offerMoney:Number,
		oldInfo:Object,
	}
}	
</script>
<style>
.user-price-detail {
	background-color:#fcfcfd;
	bottom:13vw;
	width:100vw;
	transition:transform .5s ease-in-out;
}
.price-hidden {
	transform:translateY(180px);
	-webkit-transform:translateY(180px);
	-moz-transform:translateY(180px); /* Firefox 4 */
	-webkit-transform:translateY(180px); /* Safari 和 Chrome */
	-o-transform:translateY(180px); /* Opera */
}
.price-show {
	transform:translateY(0px);
	-webkit-transform:translateY(0px);
	-moz-transform:translateY(0px); /* Firefox 4 */
	-webkit-transform:translateY(0px); /* Safari 和 Chrome */
	-o-transform:translateY(0px); /* Opera */
}	

.price-info {
	background-color:#73879c;
	border-radius:5px;
}

.price-activity {
	background-color:#eb5c6b;
	border-radius:5px;
}
.price-success {
	background-color:#7aeb5c;
	border-radius:5px;
}

</style>