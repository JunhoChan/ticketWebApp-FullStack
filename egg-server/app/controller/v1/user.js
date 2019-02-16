'use strict';

const Controller = require('egg').Controller;

// 1000000001
class UserController extends Controller {

  async index() {
  	this.ctx.body = '123';
  }	

    // 检查是否用户已经注册
  async checkUserRegister() {
  	const ctx = this.ctx
  	let param = ctx.params.str;
    console.log('--我的用户名--')
    console.log(param)
    const type =  ctx.params.type;
  	const user = await ctx.service.user.checkUserRegister(param,type);
  	ctx.body = user;
  }


// 创建用户
  async addNewUser() {
  	const ctx = this.ctx;
  	let params = ctx.request.body;
    const res1 = await ctx.service.captcha.validCaptcha(params.captcha);
    if(parseInt(res1) !== 1 ) {
        ctx.body = res1;
    } else {
        const response = await ctx.service.user.createNewUser(params);
        ctx.body = response;
    }
  }

  // 用户登录
  async loginAndGetUser() {
  	 const ctx = this.ctx;
     let params = ctx.request.body;
     const response = await ctx.service.captcha.validCaptchaCodeAndUserIndentify(params);
  	 ctx.body = response;
  }

 // 退出登录
  async loginOut() {
  	const response = await this.ctx.service.user.loginOut()
  	this.ctx.body = response;
  }

  // 获取验证码
  async getVarificationCode() {
  	const response = await this.ctx.service.captcha.getCaptchaCode();
  	this.ctx.type = 'svg'; 
  	this.ctx.body = response;
  }


  // 获取用户列表
  async getUserInfoList() {
    const ctx = this.ctx;
    const params = ctx.request.query
    const res = await ctx.service.user.getUserInfoList(params);
    ctx.body  = res;
  }

}

module.exports = UserController;