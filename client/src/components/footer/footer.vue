<template>
  <footer class="footer">
  	<section class="footer mint-1px-t">
	  	<nav class="nav nav-movie" :class="{'cur-page': route === '/home'}">
	  		<router-link to="/home">
	  			<div class="nav-icon">
	  				<img v-show="route !== '/home'" src="./../../assets/images/hno.svg" alt="">
	  				<img v-show="route === '/home'" src="./../../assets/images/hok.svg" alt="">
	  			</div>
	  		</router-link>
	  	</nav>
	  	<nav class="nav nav-cinama" :class="{'cur-page': route === '/cinema'}">
			<router-link to="cinema">
				<div class="nav-icon">
					<img v-show="route !== '/cinema'" src="./../../assets/images/mno.svg" alt="">
					<img v-show="route === '/cinema'" src="./../../assets/images/mok.svg" alt="">
				</div>
			</router-link>
	  	</nav>
	  	<nav class="nav nav-me" :class="{'cur-page': route === '/mine'}">
	  		<router-link to="mine">
	  			<div class="nav-icon">
	  				<img v-show="route !== '/mine'" src="./../../assets/images/eno.svg" alt="">
	  				<img v-show="route === '/mine'" src="./../../assets/images/eok.svg" alt="">
	  			</div>
	  		</router-link>
	  	</nav>
  	</section>
  </footer>
</template>
<script>
export default{
  props: {
  	'showNav': {
  		type: Boolean,
  		default: true
  	}
  },
  computed: {
  	route () {
  		return this.$route.path
  	}
  },
  methods: {
  	goBack () {
  		this.$router.back()
  	}
  }
}
</script>

<style>
.footer {
	background-color: #fff;
	position: fixed;
	width: 100%;
	bottom: 0px;
	height: 50px;
	display: flex; 
	padding-top: 7px;
	box-sizing: border-box;
	z-index: 10000;
}
.footer nav {
	flex:1;
	text-align: center;
	color: #8a869e;
}
.footer .cur-page.nav{
	color: #ff4d64;
}
.nav-icon {
	width: 22px;
	height: 22px;
	margin: 0 auto;
}
.nav-icon img {
	width: 100%;
	height: 100%;
}
.nav-movie::after,
.nav-cinama::after,
.nav-me::after {
	padding-top: 2px;
	text-align: center;
	width: 30px;
	display: inline-block;
	font-size: 12px;
}
.nav-movie::after {
	content: "电影";
}
.nav-cinama::after {
	content: "影院";
}
.nav-me::after {
	content: "我的";
}
.go-back {
	background: #ff2c43;
}
.back {
	font-size: 30px;
	color: #fff;
	padding-left: 35px;
	margin-top: -4px;
	transform: scaleY(1.5);
}
</style>
