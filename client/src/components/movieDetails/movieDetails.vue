<template>
	<section id="movieDetail">
		<section id="tap" :class="{fixed:tapFixed}"  >
			<ul class="tab-container">
				<li :class="tapIndex === 1?'active':'' " @click="selectTab(1)">简介</li>
				<li :class="tapIndex===2?'active':'' "  @click="selectTab(2)" >影评</li>
				<li :class="tapIndex === 3?'active':''" @click="selectTab(3)" >更多</li>
			</ul>
			<div class="line-container">
				<div class="line" :style="{left: moveDistance}" ></div>
			</div>
		</section>


		<section class="ins mb25" ref="ins">
			<p class="show-desc" :class="FilmContent===false?'maxHeight':''">{{movieIns}}
			<span class="show-more" @click="showFilmContent" v-if="FilmContent===false">展开</span>
			<span @click="showFilmContent" class="orange fb" v-else>收起</span>
			</p>
		</section>

		<section class="comment" ref="comment" >
			<h2 class="mb10">演职人员</h2>
		 <div class="swiper-container">
		    <div class="swiper-wrapper">
		      <div class="swiper-slide">
		      	<div class="swiper-slide-img" style="background-image:url(//gw.alicdn.com/i1/TB1hJn9jNTpK1RjSZR0XXbEwXXa_.jpg_320x320Q30.jpg);"></div>
		      	<dl>
		      		<dt>演员名</dt>
		      		<dd class="profession">演示</dd>
		      	</dl>
		      </div>
		      <div class="swiper-slide">Slide 2</div>
		      <div class="swiper-slide">Slide 3</div>
		      <div class="swiper-slide">Slide 4</div>
		      <div class="swiper-slide">Slide 5</div>
		      <div class="swiper-slide">Slide 6</div>
		    </div>
	 	 </div>

		</section>


		<section id="comment-1">
			<h2 class="mb10">视频和剧照</h2>
			<div class="swiper-container">
			    <div class="swiper-wrapper">
			      <div class="swiper-slide">
			      	<img src="//gw.alicdn.com/i3/TB1GgH_q7voK1RjSZFNXXcxMVXa_.jpg_600x600Q30.jpg" alt="剧情我不知道" />
			      </div>
			      <div class="swiper-slide">
			      	<img src="//gw.alicdn.com/i3/TB1GgH_q7voK1RjSZFNXXcxMVXa_.jpg_600x600Q30.jpg" alt="剧情我不知道" />
			      </div>
			      <div class="swiper-slide">
			      	<img src="//gw.alicdn.com/i3/TB1GgH_q7voK1RjSZFNXXcxMVXa_.jpg_600x600Q30.jpg" alt="剧情我不知道" />
			      </div>			      
			    </div>
		 	 </div>			
		</section>

		<section class="more" ref="more">
		<h2>观众热评</h2>
		<Comment class="mt10" />
		</section>

		<div class="actions-wrap">
			<span class="btn">选座购票</span>
		</div>
	</section>
</template>

<script>
import Swiper from './../../../static/js/swiper.min.js'
import Comment from './comment.vue'
export default {
	data() {
		return {
			moveDistance: '15%',
			tapIndex: 1,
			tapFixed:false,
			FilmContent:false, // 隐藏内容
		}
	},
	mounted() {
        window.addEventListener('scroll', this.handleScroll) // 添加监听时间
        var swiper = new Swiper('.swiper-container', {
     		  slidesPerView: 'auto',
		      spaceBetween: 5,
		      centeredSlides: false,		      
		    });
    },
	methods: {
		// 显示电影介绍内容
		showFilmContent() {
		  if(this.FilmContent === true){
		  		this.FilmContent = false
			} else {
		  		this.FilmContent = true
			}
		},
		// 滚动
        handleScroll () {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          var offsetTop = 350; // 暂时
          // console.log(scrollTop)
          if (scrollTop > offsetTop) {
            this.tapFixed = true
            if (scrollTop >= 850 && scrollTop < 1900) {
            	this.moveDistance = '48%'
				this.tapIndex = 2
            } else if(scrollTop >= 1900) {
            	this.moveDistance = '82%'
				this.tapIndex = 3
            } else {
            	this.moveDistance = '15%'
				this.tapIndex = 1
            }
          } else {
            this.tapFixed = false
          }
        }, 		
		// 选择选项卡
		selectTab(tapValue) {
				if (tapValue === 1) {
					this.moveDistance = '15%'
					this.tapIndex = 1
					console.log('点击')
					window.scrollTo(0,320);
				} else if (tapValue === 2) {
					this.moveDistance = '48%'
					this.tapIndex = 2
					window.scrollTo(0,850);				
				} else {
					this.moveDistance = '82%'
					this.tapIndex = 3
					window.scrollTo(0,1900);						
				}
		}
	},
	components: {
		Comment,
	},
	props: {
		movieIns: String,
	},
    destroyed () { // 离开页面或组件需要处理
      window.removeEventListener('scroll', this.handleScroll)
      this.FilmContent = false
    },    
}
</script>

<style>
#movieDetail {
	background-color: #fff;
	font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
}
.tab-container {
	display: flex;
	width: 100vw;
	justify-content: space-around;
	padding: 3vw 0;
}
.active {
	font-weight: 700;
}
.tab-container li {
    text-align: left;
    font-size: 1rem;
    line-height: 1rem;
    color: #4a4a4a;
}
li {
	list-style: none;
}
.line-container {
	height:2px;
	background-color:#999;
	position:relative;
}
.line {
	position: absolute;
    top: 0;
    width: 15px;
    height: 2px;
    border-radius: 100px;
    background-color: blue;
    -webkit-transition: .5s;
    transition: .5s;
}
.ins {
	background-color:#fff;
	padding-top:4vw;
	border-bottom:0!important;
}
.ins .show-desc {
	white-space: normal;
    position: relative;
}

.maxHeight {
	    max-height: 4.5rem;
}
.ins p {
	white-space: nowrap;
    text-align: justify;
    display: inline-block;
    position: relative;
    margin-bottom: .75rem;
    font-size: .9375rem;
    line-height: 1.5625rem;
    color: #333;
    margin-left: 16px;
    margin-right: 16px;
    overflow:hidden;
    font-weight:560;
}

.show-more {
	position:absolute;
	color:blue;
	font-size:1rem;
	top:50px;
	right:0;
	z-index:50;
	background-color:#fff;
	font-weight:700;
}

.comment {
	width:100vw;
	height:auto;
}
#comment-1 {
	width:100vw;
	max-height: 31.3vw;
}
#comment-1 .swiper-container {
      width: 100%;
      height: 100%;
    }
#comment-1 .swiper-container .swiper-wrapper  .swiper-slide {
      background: #fff;
      width: 80%;
      height: 31.3vw;
      display: flex;
      justify-content: center;
      align-items: center;
    }   
#comment-1  .swiper-container .swiper-wrapper .swiper-slide:nth-child(2n) {
      width: 60%;
      height: 31.3vw;
    }
 #comment-1  .swiper-container .swiper-wrapper .swiper-slide:nth-child(3n) {
      width: 50%;
      height: 31.3vw;
    }
 h2 {
	font-weight:bold;
	font-size: 1rem;
    line-height: 2rem;
    padding-top: .5rem;
    color: #000;
    padding-left: 16px;
}
.more {
	margin-top:80px;
	background-color: #fff;
	position: relative;
	border-bottom: 0 !important;
}
.fixed {
	position:fixed;
	top:0;
	z-index:999;
	background-color:#fff;
}
.comment .swiper-container {
      width: 94%;
      height: 25%;
}
.comment .swiper-container .swiper-wrapper .swiper-slide {
	display: flex;
	flex-direction:column;
	width:23.2vw;
	vertical-align: top;
    text-align: center;
}
.swiper-slide-img {
	width: 5.4375rem;
    height: 7.5rem;
    background: #ccc 50% no-repeat;
    background-size: cover;
    overflow: hidden;
    margin: 0 auto;
    border-radius: 2px;
}
.swiper-slide  dl  dt {
	display: block;
    color: #333;
    font-size: .875rem;
    line-height: 1.25rem;
    max-height: 2rem;
    word-wrap: break-word;
    position: relative;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.profession {
	display: block;
    white-space: nowrap!important;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 1rem;
    line-height: 1rem;
    color: #777;
    font-size: .75rem;
    width: auto;
}

.actions-wrap {
	position: fixed !important;
    z-index: 99;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
}

.actions-wrap .btn {
	display: block;
    text-align: center;
    height: 3.4375rem;
    height: 14.7vw;
    line-height: 3.4375rem;
    line-height: 14.7vw;
    color: #fff;
    text-decoration: none;
    font-size: 1.125rem;
    border: none;
    box-sizing: border-box;
    background-image: linear-gradient(45deg,#ff7ba0,#ff4d64);
}

</style>