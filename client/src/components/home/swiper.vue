<template>
    <div class="swiper-container" id="MySwiper1">
            <div class="swiper-wrapper">  
              	<div class="swiper-slide" v-for="item in banner">
  					<img class="img"  :src="item.bannerUrl" />
  		  		</div>
            </div>
         <div class="swiper-pagination"></div>  	
    </div>

</template>

<script>
import Swiper from './../../../static/js/swiper.min.js'
import {mapState} from 'vuex'
export default {
		// swiper载入
	 data () {
			return {
			}
		},	
 	 mounted(){
        this.$store.dispatch('getBannerInfo') // 发送请求
      },
    computed: {
        ...mapState(['banner'])
    },
    watch: {
      banner (value) {
          this.$nextTick(()=> {
              new Swiper('.swiper-container', {
                autoplay:true,
                loop:true,
                pagination: {
                  el: '.swiper-pagination',
                  clickable: true,
                   },
              })
          })
      }
    }
 }
</script>

<style>
	#MySwiper1 {
		width:100vw;
		height:12rem;
	}

   .swiper-pagination-bullet {
		background: #e5e8e8;
		opacity: 1; 
	}
    .swiper-pagination-bullet-active {
		background: #ff5733;
	}

</style>