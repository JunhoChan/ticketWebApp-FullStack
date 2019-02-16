<template>
	<header class="pf flex flex-center w  bgfff" id="header-top">
		<div v-if="leftNavNum===1" class="pa goBack f11rem flex flex-center blue" @click="goBack">
			<i class="left-arrow" />返回
		</div>
		<p class="tddd fb f13rem">{{title}}</p>
	</header>
</template>
<script>
export default {
	data() {
		return {
			leftNavNum:0,
		}
	},
	created() {
		this.leftNavNum = parseInt(this.leftNav)
		// console.log(this.leftNavNum)
	},
	methods: {
		goBack() {
			console.log('点击了返回')
			this.$router.go(-1)
		}
	},
	props: {
		title:String,
		leftNav:String, // 1显示 0不显示
	}
}
</script>
<style>
#header-top {
	height:6.5vh;
	z-index:100;
}
.goBack {
	left:1rem;
}
.left-arrow {
	display:block;
	width:10px;
	height:10px;
	border:2px solid #265787;
	border-left:0 none;
	border-top:0 none;
	transform:rotate(135deg);
	-ms-transform:rotate(135deg); 	/* IE 9 */
	-moz-transform:rotate(135deg); 	/* Firefox */
	-webkit-transform:rotate(135deg); /* Safari 和 Chrome */
	-o-transform:rotate(135deg); 	/* Opera */
}
</style>