<template>
<section id="filmSwiper">
 <!-- Swiper -->
  <div class="swiper-container bg-poster" id="MySwiper2">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in movies">
          <div class="slide-content" style="width:100%;height:100%;"
              :style="{'background-image':'url(' + item.coverImg + ')'}" :data-id="item.filmId">
          </div>
      </div>
    </div>
  </div>
 <!-- 电影信息  -->
  <div class="movie-container block">
  	<span class="movie-name tddd">{{movieInfo.filmName}}</span>
  	<span class="vm f075">River评分</span>
  	<span class="vm orange f075">{{movieInfo.filmScore}}</span>
  	<p class="tddd f075 fcolor999">107分钟 | 动作 | {{movieInfo.filmDiretor}} {{movieInfo.fimeAtor}}</p>
  </div>
</section>
</template>

<script>
import Swiper from './../../../static/js/swiper.min.js'
export default {
  data() {  
    return {
            movieInfo: {},
    }
  },
  created() {
        this.movieInfo = this.movies[0]
  },
  methods: {
        searchItem(value) {
          this.movies.forEach((item,index,self) => {
                 if(item.filmId === value) this.movieInfo = item
          }) 
        },
   },
	mounted() {
		    var swiper = new Swiper('.swiper-container', {
		      effect: 'coverflow',
		      grabCursor: true,
		      centeredSlides: true,
		      slidesPerView: 'auto',
		      coverflowEffect: {
		        rotate: 0,
		        stretch: 30,
		        depth: 200,
		        modifier: -2,
		        slideShadows : true,
		      }
		    });
        let that = this
		    swiper.on('slideChangeTransitionEnd',function() {
		    	let index = this.activeIndex
		    	const items = document.getElementsByClassName('slide-content');
		    	// console.log(items[index].getAttribute('data-id'))
          that.searchItem( parseInt(items[index].getAttribute('data-id')))
          that.$emit('getSwiperValue', parseInt(items[index].getAttribute('data-id')) )
		    });
	},
  props: {
    movies: Array,
  },
}
</script>

<style>
  #MySwiper2 {
      width: 100%;
      padding-top: .8rem;
      height: 30vw;
 }
 .bg-poster {
 	background-image:url("//gw.alicdn.com/i4/TB1ne5IlVYqK1RjSZLeXXbXppXa_.jpg_170x10000Q75.jpg");
    width: 100%;
    height: 7.8125rem;
    height: 33.3vw;
    background-color: #ededed;
    -webkit-background-size: 3000%;
    background-repeat: no-repeat;
    background-position-y: 40%;
    -webkit-backface-visibility: hidden;

 }
#MySwiper2  .swiper-wrapper .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 5.7rem;
      height: 7.89rem;
}
.movie-container {
	width: 100%;
    height: 3.75rem;
    background-color: #fff;
    text-align: center;
    color:#333;
    padding-top:4px;
    font-size:1rem;
}
.movie-name {
	font-weight: 700;
    line-height: 7.5vw;
    font-size: 1.0625rem;
    word-break: break-all;
    max-width: 69.3vw;
}
</style>