const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
let code = ''; // 系统获得的验证码


class CaptchaService extends Service {

 // 获取一次性验证码
 async getCaptchaCode() {
		 var captcha = svgCaptcha.create({
		 	  size: 4,
		    ignoreChars: '0o1l',
		    noise: 2,
		    color: true,
		  });
		 code = captcha.text.toLowerCase();
		 console.log('svgCaptcha验证码:' + code );
		 return  captcha.data; 
 }
 // 查看验证码是否正确

 validCaptcha(param) {
 	if (!code){
 		return  { msg: '验证码已失效，请重新刷新啦!' , code: 404, info:1 }
 	}
 	if (code !== param|| !param) {
 		return { msg: '验证码错误!' , code: 400 , info:1}
 	}
 	return 1;
 } 

 // 验证验证码与用户身份
 async validCaptchaCodeAndUserIndentify(params) {
 	let receiveRes  = this.validCaptcha(params.captcha)
 	if( receiveRes !== 1)  return receiveRes   // 错误处理结果
 	const response = await this.app.mysql.get('user', { username: params.name,password:params.pwd});
 	if ( !response ) {
 		return { msg: '用户名与密码不匹配!', code:400 };
 	} else {
 		delete response.password;  delete response.createTime;
 		this.ctx.session.user = response;
 		return { msg: '登陆成功!', code:200, data:response };
 	}
 }


  

}

module.exports = CaptchaService;
