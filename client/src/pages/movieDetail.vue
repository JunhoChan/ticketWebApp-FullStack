<template>
	<section id="movie-detail">
        <section ref="content">
                        <section class="header back-color"></section>
            <section class="show-info">
                <div class="poster-wrap">
                    <img :src="movieDetailInfo.coverImg" alt="电影封面" />
                    <div class="play-icon"></div>
                </div>
                <div class="filmInfo-wrap">
                    <div class="film-name">
                        {{movieDetailInfo.filmName}}
                    </div>
                    <div class="film-source">
                        &nbsp;Ven om
                    </div>
                </div>
                <div class="movie-detail">
                    <p class="show-intro">动作 / 科幻 / 惊悚 / {{movieDetailInfo.makingArea}} / 107分钟</p>
                    <p class="show-intro">
                        {{movieDetailInfo.startTime}} 中国大陆上映 
                    </p>
                </div>
            </section>
            <div class="movie-area"></div>
            <section class="movie-grade">
                <div class="pl20 flex flex-column mt5">
                    <div class="flex">
                        <span class="score">{{movieDetailInfo.filmScore}}</span>
                        <span class="full-star pt10 pl5">
                            <div class="score-start" style="width:95%;">
                    <Star :score="4.5" :size="24" />                     
                            </div>
                        </span>
                    </div>
                    <div>
                        <span class="AllGrade">总体评分</span>
                        <span class="allNum">146.5W评</span>
                    </div>
                </div>
                <div class="pr20" style="width:40vw;">
                    <ul>
                        <li class="">
                            <mt-progress :value="90" :bar-height="5">
                                  <div slot="start" class="start">五星</div>
                            </mt-progress>
                        </li>
                        <li class="mt-15">
                            <mt-progress :value="5" :bar-height="5">
                                     <div slot="start" class="start">四星</div>
                            </mt-progress>
                        </li>
                        <li class="mt-15">
                            <mt-progress :value="5" :bar-height="5">
                                 <div slot="start" class="start">三星</div>
                            </mt-progress>
                        </li>
                        <li class="mt-15">
                            <mt-progress :value="5" :bar-height="5">
                                 <div slot="start" class="start">二星</div>
                            </mt-progress>
                        </li>
                        <li class="mt-15">
                            <mt-progress :value="5" :bar-height="5">
                                 <div slot="start" class="start">一星</div>
                            </mt-progress>
                        </li>                                       
                    </ul>   
                </div>
            </section>
            <section class="show-tip flex pl20 pt10">
                <div class="tip-icon">彩集</div>
                <div class="tip-content pl10">片尾字幕前有彩蛋</div>
            </section>
        </section>

            <section>
                <movieDetail :movieIns="movieDetailInfo.filmIntroduction" v-if="flag" />
            </section>
	</section>	
</template>

<script>
import Star from './../components/star/star.vue'
import movieDetail from './../components/movieDetails/movieDetails.vue'
export default {
    data() {
        return { movieDetailInfo: {}, flag:false }
    },
    components: {
        Star,
        movieDetail,
    },

    created() {
        this.movieDetailInfo = this.$route.params
        this.flag = true
        // console.log(this.movieDetailInfo.filmIntroduction)
    },
    mounted () {
        // this.$router.afterEach((to,from,next) => {
        //     window.scrollTo(0,0)
        // })
    },
}
</script>

<style>
 .header  {
 	height:40vw;
 	width: 100%;
 	transition: background-color .6s;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
 }
 .back-color {
 	background-color:rgb(64, 99, 144);
 }
 .show-info {
 	position: relative;
    margin-top: -20%;
    width:100%;
    background-color: transparent;
 }
 .poster-wrap {
 	position: absolute;
    top: 4px;
    left: 5.33333333vw;
    padding: 2px;
    border-radius: 4px;
    background-color: #fff;
    z-index:10;
 }
 .poster-wrap img {
    width: 23.46666667vw;
    height: 34.4vw;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 2px;
 }
 .play-icon {
 	position: absolute;
    right: 2.13333333vw;
    bottom: 3.13333333vw;
    width: 7.46666667vw;
    height: 7.46666667vw;
    background-repeat: no-repeat;
    background-position: 50%;
    background-image: url(https://gw.alicdn.com/tps/TB1PH2uLXXXXXaLaXXXXXXXXXXX-60-60.png);
    background-size: contain;
}

 .filmInfo-wrap {
 	display:flex;
 	position: absolute;
    top: 10px;
    left: 32.33333333vw;
    padding: 2px;
    flex-direction:column;
 }

 .film-name {
 	margin-bottom: 4px;
    padding-right: 4vw;
    text-align: left;
    line-height: 6.66666667vw;
    font-size:  1.375rem;
    color: #fff;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: 700;
 }
 
 .film-source {
    padding-right: 4vw;
    text-align: left;
    line-height: 3.2vw;
    opacity: .7;
    font-size: .75rem;
    color: #fff;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
 }
  .movie-detail {
  	position:absolute;
  	top:14vw;
  	width:61vw;
    margin-top: 3.66666667vw;
    padding-left: 32.8vw;
    padding-right: 5.33333333vw;
    padding-top: 4.26666667vw;
    min-height: 16vw;
    background-color: #fff;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    z-index:5;
 }
 .show-intro {
 	padding-bottom: 2.13333333vw;
    text-align: left;
    font-size: .75rem;
    line-height: 1.1;
    color: #777;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
 }
 .movie-area {
 	height:21vh;
 	width: 100%;
 }
 .movie-grade {
 	height:10vh;
 	width: 100%;
 	background-color:#fff;
 	display:flex;
 	justify-content:space-between;
 	padding-top:5px; 	
 }
 .score {
 	color: #333;
    font-weight: 500;
    margin-right: 4px;
    font-size: 2.1875rem;
    line-height: 2.375rem;
    line-height: 10.13333333vw;
    display: inline;
 }
 .score-star {

 }
 .AllGrade {
 	color: #000;
    font-weight: 700;
    font-size: .8125rem;
 }
 .allNum {
 	margin-left: .53333333vw;
    font-size: 12px;
    color: #777;
    opacity: .7;
 }
 ul li {
 	list-style: none;
 }
 .start {
 	font-size:.8rem;
 }
 .full-star {
 	width: 170px;
    height: 14px;
 }
 .show-tip {
 	background-color:#fff;
 	height:4vh;
 }
 .tip-icon {    
 	padding: 4px 6px;
    word-break: keep-all;
    display: inline-block;
    font-size: 10px;
    line-height: 10px;
    opacity: .6;
    text-align: center;
    position: relative;
	}
  .tip-content {
  	line-height: 16px;
    font-size: 14px;
    margin-left: 2.13333333vw;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>