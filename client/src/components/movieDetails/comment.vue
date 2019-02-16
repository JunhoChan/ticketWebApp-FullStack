<template>
	<section class="user-comment">
		<ul class="tag-list">
			<li>全部</li>
			<li>最新</li>
			<li>最热影评论</li>
						<li>全部</li>
			<li>最新</li>
			<li>最热影评论</li>
		</ul>
		<div class="show-comments-list">
			<div class="show-comment">
				<div class="comment-title">
					<div class="user-avatar" style="background: url(//gw.alicdn.com/i1/6000000000142/TB2gsjpfYsTMeJjSszgXXacpFXa_!!6000000000142-2-tfmovie.png_80x80Q30.jpg_.webp) center center / cover no-repeat rgb(204, 204, 204);"></div>
					<div class="user-wrap">
						<div class="user-info">
							<div class="name">林花谢了春红l h</div>
						</div>
						<div class="movie-info">
							<div class="primary-bg content-primary">购票</div>
						    <Star :score="5" :size="24"  class="remark-star"/> 
							<div class="remark-score">10.0</div>
						</div>
					</div>
				</div>

				<dl>
						<dd class="show-comment-content">
							看之前以为毒液是个怪物，看之后发现毒液原来竟是个萌宠！面容狰狞，凶残妖魅，正邪难分的毒液成为了暗黑英雄，明明是来侵略地球的，却在和埃迪相处的时间里突然爱上了地球甚至不惜背叛种族，让好人埃迪的能力越来越强，成了拯救地球的超级英雄，如果寄主是反派，则会助纣为虐。故事感挺强的，画面精细，现在这股全球“毒液热”来得好凶猛噢！
						</dd>
						<dd class="show-comment-interact mt10">
							<div class="comment-time"><span>11-13 10:52</span></div>
							<div class="comment-msg"></div>
						</dd>
				</dl>
			</div>
		</div>

		<div class="show-comments-list">
			<div class="show-comment">
				<div class="comment-title">
					<div class="user-avatar" style="background: url(//gw.alicdn.com/i1/6000000000142/TB2gsjpfYsTMeJjSszgXXacpFXa_!!6000000000142-2-tfmovie.png_80x80Q30.jpg_.webp) center center / cover no-repeat rgb(204, 204, 204);"></div>
					<div class="user-wrap">
						<div class="user-info">
							<div class="name">林花谢了春红l h</div>
						</div>
						<div class="movie-info">
							<div class="primary-bg content-primary">购票</div>
						    <Star :score="5" :size="24"  class="remark-star"/> 
							<div class="remark-score">10.0</div>
						</div>
					</div>
				</div>

				<dl>
						<dd class="show-comment-content">
							看之前以为毒液是个怪物，看之后发现毒液原来竟是个萌宠！面容狰狞，凶残妖魅，正邪难分的毒液成为了暗黑英雄，明明是来侵略地球的，却在和埃迪相处的时间里突然爱上了地球甚至不惜背叛种族，让好人埃迪的能力越来越强，成了拯救地球的超级英雄，如果寄主是反派，则会助纣为虐。故事感挺强的，画面精细，现在这股全球“毒液热”来得好凶猛噢！
						</dd>
						<dd class="show-comment-interact mt10">
							<div class="comment-time"><span>11-13 10:52</span></div>
							<div class="comment-msg"></div>
						</dd>
				</dl>
			</div>
		</div>


		<div class="show-comments-list">
			<div class="show-comment">
				<div class="comment-title">
					<div class="user-avatar" style="background: url(//gw.alicdn.com/i1/6000000000142/TB2gsjpfYsTMeJjSszgXXacpFXa_!!6000000000142-2-tfmovie.png_80x80Q30.jpg_.webp) center center / cover no-repeat rgb(204, 204, 204);"></div>
					<div class="user-wrap">
						<div class="user-info">
							<div class="name">林花谢了春红l h</div>
						</div>
						<div class="movie-info">
							<div class="primary-bg content-primary">购票</div>
						    <Star :score="5" :size="24"  class="remark-star"/> 
							<div class="remark-score">10.0</div>
						</div>
					</div>
				</div>

				<dl>
						<dd class="show-comment-content">
							看之前以为毒液是个怪物，看之后发现毒液原来竟是个萌宠！面容狰狞，凶残妖魅，正邪难分的毒液成为了暗黑英雄，明明是来侵略地球的，却在和埃迪相处的时间里突然爱上了地球甚至不惜背叛种族，让好人埃迪的能力越来越强，成了拯救地球的超级英雄，如果寄主是反派，则会助纣为虐。故事感挺强的，画面精细，现在这股全球“毒液热”来得好凶猛噢！
						</dd>
						<dd class="show-comment-interact mt10">
							<div class="comment-time"><span>11-13 10:52</span></div>
							<div class="comment-msg"></div>
						</dd>
				</dl>
			</div>
		</div>
		
		<div class="more-info">
			别想太多，下面撒都没有
		</div>				
	</section>
</template>

<script>
import Star from './../star/star.vue'
export default {
	components: {
		Star
	}
}
</script>

<style>
.tag-list {
	padding: 0 4vw;
    overflow: hidden;
}
li {
	list-style: none;
}
.tag-list  li {
	float: left;
	border: 1px solid #666;
    margin-right: .5rem;
    margin-bottom: .625rem;
    padding: .4375rem .9375rem;
    text-align: left;
    line-height: .875rem;
    font-size: .8125rem;
    color: #333;
    position: relative;
    border-radius:15px;
}
.show-comments-list {
	margin-left: 16px;
}
.show-comment {
	position: relative;
    margin-top: .5rem;
    margin-bottom: .5rem;
    padding-bottom: .5rem;
}
.comment-title {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: .625rem;
}
.user-avatar {
    position: relative;
    width: 2.8125rem;
    height: 2.8125rem;
    margin-right: .9375rem;
    -webkit-flex-shrink: 0;
    border-radius: 100%;
    -webkit-background-size: cover;
    padding: 2px;
}
.user-info {
	height: 22px;
    overflow: hidden;
}
.user-info .name {
	max-width: 16.875rem;
    font-size: .9375rem;
    font-weight: 700;
    display: inline-block;
    line-height: 22px;
    color: #000;
    vertical-align: middle;
    word-break: break-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.movie-info {
	min-height: 2.7vw;
	display:flex;
}

.content-primary {
    color: red;
    background-color: transparent;
    font-weight:bold;
}
.primary-bg {
	display: inline-block;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: #f8e2eb;
    position: relative;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    white-space: nowrap;
    height: 16px;
    line-height: 16px;
    padding: 0 4px;
    border-radius: 2px;
}
.remark-score {
	display: inline-block;
    font-size: 1.1125rem;
    color: #fea54c;
}
.show-comments-list .show-comment dl{
	padding-right: 1rem;
    padding-bottom: .9375rem;
}
.show-comment-content {
	font-size: .9375rem;
    line-height: 6.4vw;
    color: #333;
    text-align: justify;
}
.comment-time {
	flex:1;
	font-size: .8375rem;
	    color: #bcbcbc;
}
.more-info {
	height:100vh;
	width: 100vw;
	display:flex;
	background-color:#efeced;
	justify-content:center;
	align-items:center;
}
</style>