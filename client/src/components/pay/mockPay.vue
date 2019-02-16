<template>
	<section class="mask" id="mock-user-pay" v-if="$store.state.dicountment.realPay">

		<div class="pay-content-container on-mask flex flex-center scaleUserPay">
			<div class="userPay-wrapper bgfff border-radius">
				<div class="userPay-header f13rem p10 border-bottom">
					<span class="ml5" @click="closeRealPay">X</span>
					<span class="fb ml20">请输入支付密码</span>
				</div>
				<div class="userPay-price flex flex-column flex-center pw5 border-bottom">
					<div class="f1rem">JunhoChan Pay</div>
					<div class="f2rem mt10"><span class="f21rem">&yen;</span>{{ctotalPrice}}.00</div>
				</div>
				<div class="userPay-from flex flex-center flex-bt pw4 border-bottom">
					<span class="ml10">The tech By JunhoChan</span>
					<span class="mr10 right-arrow"></span>
				</div>
				<div class="userPay-password flex flex-center pw3">
					<ul class="flex">
						  <li v-for="(item, index) in dotPsw">
						   		<span v-show="spanLen>index-1">●</span>
						  </li>
					</ul>
				</div>
			</div>
		</div>

		<div class="pay-keyboard-container bgfff fadeInKeyboard">
			<ul class="flex flex-center" @click="inputpsw">
				<li v-for="item in keyboard">
					{{item}}
				</li>
				<li>x</li>
			</ul>
		</div>
	</section>
</template>

<script>
import { Toast } from 'mint-ui';
import { mapMutations } from 'vuex' // vuex is involved in current discountment
export default{
	data() {
		return {
			dotPsw:[1,2,3,4,5,6],
			keyboard:[1,2,3,4,5,6,7,8,9,'',0],
			psw:[], // defau;t psw is '123456'
			spanLen:-1,
		}
	},
	created() {
		console.log(this.ctotalPrice)
	},
	methods: {
		...mapMutations([
		  		'closeRealPay', 
		]),
		// 输入密码
		inputpsw($event) {
			if( !isNaN(parseInt($event.target.innerHTML))){
				this.psw.push(parseInt($event.target.innerHTML))
				this.spanLen++
			}else {
				if($event.target.innerHTML === 'x') { // delete error psw
					if(this.psw.length === 0) return;
						this.psw.pop()
						this.spanLen--;
				}
			}
			this.validPswLengthAndSendData()
		},
		// 验证密码
		validPswLengthAndSendData() {
			if(this.psw.length === 6) {
				let str = this.psw.join('')
				this.psw = []
				this.spanLen = -1
				if(str==='123456') {
					this.$emit('payOrder')
				} else {
					this.closeRealPay()
					Toast('支付密码错误!')
				}
			}
		},
	},
	props: {
		ctotalPrice: Number,
	}
}
</script>

<style>
#mock-user-pay {
	width: 100vw;
	height: 100vh;
}

#mock-user-pay .pay-content-container {
	width: 100vw;
	height: 58vh;
}

#mock-user-pay .pay-keyboard-container {
	margin-top:8vh;
	width: 100vw;
	height: 35vh;
	z-index: 10000000000;
}

#mock-user-pay  .pay-content-container ul{
	width:90%;
	height:3.6rem;
}
#mock-user-pay  .pay-content-container ul li {
	display:flex;
	flex:1;
    align-items: center;
    justify-content: center;
    border:1px solid #d9d9d9;
    font-size:1.5rem;
}
.userPay-wrapper {
	width:90vw;
	height:70%;
}

.userPay-from .right-arrow {
	display:block;
	width:8px;
	height:8px;
	border:1px solid #999;
	border-left:0 none;
	border-top:0 none;
	transform:rotate(-45deg);
	-ms-transform:rotate(-45deg); 	/* IE 9 */
	-moz-transform:rotate(-45deg); 	/* Firefox */
	-webkit-transform:rotate(-45deg); /* Safari 和 Chrome */
	-o-transform:rotate(-45deg); 	/* Opera */
}
#mock-user-pay .pay-keyboard-container ul {
	width:100%;
	height:100%;
	flex-wrap:wrap;
	background-color:#F8F8FF;
}
#mock-user-pay .pay-keyboard-container ul li{
	width:32.7vw;
	height:24%;
	display:flex;
	flex:0 0 auto;
    align-items: center;
    justify-content: center;
    font-size:1.8rem;
	border:1px solid #d9d9d9;    
}
.pay-keyboard-container ul li:nth-child(10),
.pay-keyboard-container ul li:nth-child(12),
.pay-keyboard-container ul li:active {
    background-color: #d1d4dd;
}



@-webkit-keyframes fadeInKeyboard {
  0% {
    opacity: .7;
    -webkit-transform: translateY(180px);
    transform: translateY(180px)
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0)
  }
}
@keyframes fadeInKeyboard {
  0% {
    opacity: .7;
    -webkit-transform: translateY(180px);
    -ms-transform: translateY(180px);
    transform: translateY(180px)
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0)
  }
}
.fadeInKeyboard {
  -webkit-animation: fadeInKeyboard 1s;
  animation: fadeInKeyboard 1s;
}



@-webkit-keyframes scaleUserPay {
  0% {
    opacity: .7;
    -webkit-transform: scale(0,0);
    transform: scale(0,0);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1,1);
    transform: scale(1,1);
  }
}
@keyframes scaleUserPay {
  0% {
    opacity: .7;
    -webkit-transform: scale(0,0);
    -ms-transform: scale(0,0);
    transform: scale(0,0);
  }
  100% {
    opacity: 1;
    -webkit-transform:  scale(1,1);
    -ms-transform:  scale(1,1);
    transform:  scale(1,1);
  }
}
.scaleUserPay {
  -webkit-animation: scaleUserPay 1s;
  animation: scaleUserPay 1s;
}

</style>