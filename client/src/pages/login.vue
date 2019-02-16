<template>
	<section id="login">
		<div class="login-bg pa"></div>
		<div class="login-wrapper flex flex-row-center  flex-column pa fff mt100">
			<h1 class="fb f2rem blue">{{Info}}</h1>
			<div class="flex flex mt50 select-tap fb " @click="selectTap">
			  <span class="mr30 pl5 pr5" data-tap="1" :class="showLogin?'tap-active':''">登录</span>
			  <span class="ml30 pr5 pl5" data-tap="2" :class="!showLogin?'tap-active':''">注册</span>
			</div>
			<form  @submit.prevent="userLogin" v-if="showLogin" v-model="Lparams">
				<section class="input-message mt20">
				    <input type="text" class="w h p2vw" name="userName"  placeholder="手机/邮箱/用户名" v-model="Lparams.userName"/>	
				</section>
				<section class="input-message mt20">
					<input type="password" class="w h p2vw" name="psw"  placeholder="密码"
					  v-model="Lparams.psw" />	
				</section>
				<section class="input-message mt20 pr">
					<input type="text" class="w h p2vw" name="psw" maxlength="4" placeholder="验证码"   v-model="Lparams.captcha" />
					<img ref="captcha" class="get_verification pa" src="http://127.0.0.1:7001/api/getVarificationCode"  alt="captcha" @click.prevent="getVerifyCode" />	
				</section>
				<button class="login-btn fff mt20 fb f1rem">登 录</button>
			</form>

			<form  @submit.prevent="userRegister" v-else>
				<section class="input-message mt20">
				<input type="text" class="w h p2vw" name="userName" @blur="checkUserName"placeholder="用户名" v-model="Rparams.userName" />	
				</section>
				<section class="input-message mt20">
				<input type="password" class="w h p2vw" name="psw"  placeholder="密码"
						v-model="Rparams.psw" @blur="checkPswRule"/>	
				</section>
				<section class="input-message mt20">
				<input type="password" class="w h p2vw" name="comfirmPsw" 
						v-model="Rparams.comfirmPsw" @blur="checkComfirmRule" placeholder="确认密码"/>	
				</section>
				<section class="input-message mt20 pr">
					<input type="text" class="w h p2vw" name="psw" maxlength="4" placeholder="验证码"   v-model="Rparams.captcha" />
					<img ref="captcha" class="get_verification pa" src="http://127.0.0.1:7001/api/getVarificationCode"  alt="captcha" @click.prevent="getVerifyCode" />	
				</section>
				<button class="login-btn fff mt20 fb f1rem">注 册</button>
			</form>
			<div class="mt10 fb f12">JunhoChan</div>
		</div>
	</section>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
	data() {
		return {
			Info:'账号登录',
			showLogin:true,
			Lparams:{},
			Rparams:{},
			regFlag:false,
			errInfo:'',
		}
	},
	methods: {
		// 选项卡
		selectTap ($event) {
			if(parseInt($event.path[0].getAttribute('data-tap')) ===1) {
					this.showLogin = true
					this.Info = "账号登录"
			} else {
					this.showLogin = false
					this.Info = "账号注册"
			}
		},
		userLogin() {
			if (!this.Lparams.userName || !this.Lparams.psw || !this.Lparams.captcha) {
					Toast('请输出完整信息后，再登录')
					return
			}
			let params = {},
				that = this
			params.name = this.Lparams.userName
			params.pwd = this.Lparams.psw
			params.captcha = this.Lparams.captcha.toLowerCase();
			this.$http.post(this.$domain + '/user/loginAndGetUser',params).then( (res) => {
					if(res.data.code === 200) {  // 登录成功的操作
						that.$store.dispatch('recordUserInfo', res.data.data)
						that.$router.replace('/mine')
					} else {
						Toast(res.data.msg)
						that.$refs.captcha.src = 'http://127.0.0.1:7001/api/getVarificationCode?time=' + new Date()
						that.Lparams.captcha = ''
					}
			}).catch((err) => {  console.log(err) })
		},
		userRegister() {
			if(!this.Rparams.userName || !this.Rparams.psw || !this.Rparams.comfirmPsw || 
				!this.Rparams.captcha ) {
				Toast('请完整输入注册信息!')
				return 
			}
			if (this.regFlag === false) {
				Toast('用户名被注册');
				return	
			}
			let params = {}
			params.name = this.Rparams.userName
			params.psw = this.Rparams.psw
			params.captcha =  this.Rparams.captcha.toLowerCase()
			this.$http.post(this.$domain + '/user/addNewUser',params).then((res) => {
				if(res.data.code =201 && !res.data.info) { // 注册成功
					this.showLogin = true
					this.Rparams = {}
					Toast('注册成功!')
				} else {
					Toast(res.data.msg)
					this.Rparams.captcha = ''
				}
			}).catch((err) => { console.log(err) })
		},
		// 检查用户名
		checkUserName() {
			if(!this.Rparams.userName) return
  			this.$http.get(this.$domain + '/user/checkUserRegister/1/' + this.Rparams.userName ).then( (res)=> {
  						console.log(res.data)
  						if(parseInt(res.data.code) === 400 ) {
  								Toast(res.data.msg);				
  						} else {
  							this.regFlag = true
  						}
  			}).catch( (err)=> { console.log(err) } )
		},
		// 检查密码规格
		checkPswRule() {
			if(!this.Rparams.psw) {
					Toast('请填写密码')
					this.Rparams.psw = ''
					return 0
			} else if(this.Rparams.psw.split('').length < 6) {
					Toast('密码长度过短')
					this.Rparams.psw = ''
					return 0
			}
		},
		// 2次密码是否一致
		checkComfirmRule() {
			if(!this.Rparams.psw) return  
			if(this.Rparams.psw !== this.Rparams.comfirmPsw) {
					Toast('2次输入的密码不一致!')
					this.Rparams.comfirmPsw = ''
					return 0		
			}
		},
		// 获取验证码
		getVerifyCode() {
			 this.$refs.captcha.src = 'http://127.0.0.1:7001/api/getVarificationCode?time=' + new Date()
		},
	}
}
</script>
<style>
#login {
	width:100vw;
	height:100vh;
}
.blue {
	color:#abc4de;
}
.login-bg {
	width:100vw;
	height:100vh;
	background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544176975784&di=660fcf1ec799a5b63772738e9d9f7792&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F3b993ff332e7298632716e066be730f049c93387.png);
	background-repeat:no-repeat;
	background-size:cover;
	background-position: 50%;
	-webkit-filter: blur(10px);
    -moz-filter: blur(10px);
    -o-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(10px);
    z-index:0;
    // -webkit-filter: grayscale(40%); /* Chrome, Safari, Opera */
    // filter: grayscale(40%);	
}
.login-wrapper  {
	width:100%;
	overflow:hidden;
}
.f2rem {
	font-size:2.5rem;
}
.p2vw {
	padding-left:2vw;
}
.input-message {
	height:48px;
	width:78vw;
}
.input-message  input {
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: 0;
    font: 400 14px Arial;
}

.input-message  input:focus {
	outline:none;
    border: 2px solid #02386f;
}
.login-btn {
	border: none;
	width:78vw;
	height:42px;
	background-color:#02386f;
	border-radius:5px;
}
.tap-active {
	border-bottom:1px solid #f47c81;
	color:#f47c81;
}
.get_verification {
	top:-.3rem;
	width:40vw;
	right:0;
}
</style>