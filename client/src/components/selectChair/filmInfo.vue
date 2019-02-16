<template>
	<section class="flex flex-column film-content pw5">
		<div class="filmName">{{movieInfo.filmName}}</div>
		<div class="showTime tddd">今天 11-30 19:45~21:32 (英语 3D)</div>
		<div class="care">
			<i class="icon-3d" style="background-image: url(//gw.alicdn.com/tfscom/TB1esvNbILJ8KJjy0FnXXcFDpXa-45-45.png_Q30.jpg)"></i>
		3D眼镜需自备或到影院购买</div>
		</div>
		<div class="seat-legend mt20">
			<ul class="flex flex-center">
				<li class="flex flex-center">
					<chair :chairStatus="3" />
					<p class="ml10 red fb">已售</p>
				</li>
				<li class="ml1vw fb flex flex-center">
					<chair :chairStatus="1" />
					<p class="ml10">可选</p>
				</li>
			</ul>
		</div>
	</section>
</template>
<script>
import chair from './chair.vue'
export default {
	props: {
		movieInfo: Object,
	},
	components: {
		chair,
	}
}
</script>
<style>
.film-content {
	background-color: #fff;
}
.filmName {
	font-size: 1rem;
    color: #333;
}
.showTime {
	margin-top: 5px;
    font-size: .8125rem;
    color: #777;
}
.care {
    font-size: .8125rem;
    color: #777;	
}
.icon-3d {
    position: relative;
    top: 2px;
    display: inline-block;
    margin: 0 .3125rem 0 0;
    margin: 0 1.33333333vw 0 0;
    width: .9375rem;
    width: 4vw;
    height: .9375rem;
    height: 4vw;
    background-size: contain;	
}
ul li {
	list-style: none;
	font-size:.9rem;
}
.ml1vw {
	margin-left: 5vw;
}

</style>