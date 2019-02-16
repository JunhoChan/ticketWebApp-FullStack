'use strict';

const Controller = require('egg').Controller;

class MessageController extends Controller {
 
	// 获取主页信息 200 get 201 create 202 update 203 delete
	async getMessageInfo() {
	  	const ctx = this.ctx
	  	const response = await ctx.service.message.getMessageInfo();
	  	ctx.body = response;
	  	ctx.status = 200
  	}

	// 更新  update content column  when messageId equal 1
	async updateMessageInfo() {
	  	const ctx = this.ctx
	  	const response = await ctx.service.message.updateMessageInfo(ctx.request.body);
	  	ctx.body = response;
	  	ctx.status = 202
  	}


}

module.exports = MessageController;
