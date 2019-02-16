<template>
	<section class="mask flex flex-center flex-column preActivity fb" @click="closeActivity">
		<div class="preActivity-wrapper pw5">
			<h2 class="fb f13rem flex flex-center fff">优惠规则</h2>
			<p class="mt10">1.该优惠活动满45元减{{offerMoneyInfo[0].saveMoney}}元，满90减{{offerMoneyInfo[1].saveMoney}}，上限150减{{offerMoneyInfo[2].saveMoney}}</p>
			<p class="mt5">2.该活动对所有用户开放</p>
			<p class="mt5">3.在使用该优惠过程中，若经发现有人恶意刷票，junhoChan有权取消其优惠资格</p>
			<p class="mt5">4.若出现不可抗力或情势变更的情况，junhoChan可依据相关法律法规主张免责</p>
			<p class="mt5">5.本次活动归属权归junhoChan所有，不接受任何反驳</p>
		</div>
	</section>
</template>
<script>
export default {
	methods: {
		closeActivity() {
			this.$emit('closeActivity')
		}
	},
	props:{
		offerMoneyInfo:Array,
	}
}	
</script>
<style>
.preActivity {
	color:black;
}
.preActivity-wrapper {
	background-color:rgba(0,0,0,.4);
	width:90%;
	padding:2vw;
	border-radius:10px;
	color:#fff;
}
</style>