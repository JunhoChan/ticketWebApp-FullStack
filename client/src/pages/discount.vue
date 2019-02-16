<template>
	<section id="discount-page" class="flex flex-column">
		<headerTop leftNav="1" title="可用优惠卷"></headerTop>
		<div class="mt50">
			<div class="flex flex-center pt5 pb5 f16 add-discount-container">
				<span class="add-discount-icon">&#8853;</span>&nbsp;兑换优惠卷
			</div>
			<div class="flex flex-bt p10">
				<span class="f14 red">使用优惠卷</span>
				<span class="f14 flex">
					<span class="discount-question f12 flex flex-center">?</span>&nbsp;优惠卷说明
				</span>
			</div>
			<div class="mt20 flex flex-column flex-center">
				 <coupon price="15" validTime="无限制" type="1"/>  
				 <coupon price="15" validTime="无限制" type="1"/>  	
			</div>
		</div>	
	</section>
</template>

<script>
import headerTop from './../components/header/header.vue'
import coupon from './../components/coupon/coupon.vue'
export default {
	components: {
		headerTop,
		coupon,
	},
}
// gradient(-44deg,#fa465d,#fe7587);
</script>

<style>
.add-discount-container {
	background-color:rgba(0,0,0,.5);
	color:#fff;
	-webkit-font-smoothing:antialiased;
}
.add-discount-icon {
	font-size:1.5rem;
}
.discount-question {
	background-color:#fa465d;
	padding:3px;
	border-radius:50%;
	width:10px;
	height:10px;
	color:#fff;
}
</style>