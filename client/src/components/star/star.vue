<template>
<!--   <div class="star" :class="`star-${size}`">
    <span class="star-item" v-for="(sc, index) in starClasses" :key="index" :class="sc"></span>
  </div> -->
  <div class="star">
  	<div class="star-item" v-for="(sc, index) in starClasses" :key="index" :class="sc"></div>
<!--   	<div class="on"></div> -->
  </div>
</template>

<script>
	const ClassOn = 'on',
		  ClassHalf = 'half',
		  ClassOff = 'off'
export default {
	props: {
		score: Number,
		size: Number
	},
	computed: {
		starClasses () {
			const scs = []
			const {score} = this
			const scoreInteger = Math.floor(score)
        // 添加类名CLASS_ON
        for (let i = 0; i < scoreInteger; i++) {
          scs.push(ClassOn)
        }
        // 添加类名CLASS_HALF
        if (score * 10 - scoreInteger * 10 >= 5) {
          scs.push(ClassHalf)
        }
        // 添加类名CLASS_OFF
        while (scs.length < 5) {
          scs.push(ClassOff)
        }
        return scs
      }
		},
	created() {
		// console.log(this.score)
		// console.log(this.size)
	}

}
</script>

<style>
	.star {
		display:flex;
		font-size: 0;
	}
	.star-item {
		width:20px;
     	height:20px;
	}
     .on {
     	background-image: url('./images/star24_on@2x.png'); 	
	 }
    .half {
     	background-image: url('./images/star24_half@2x.png');   	
     }
     .off {   	
     	background-image: url('./images/star24_off@2x.png');
     }

</style>