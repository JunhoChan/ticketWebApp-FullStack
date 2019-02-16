'use strict';

const Controller = require('egg').Controller;

class offerMoneyController extends Controller {

	// 获取所有满减优惠信息
	async getOfferMoneyInfo() {
		const ctx = this.ctx
		// const params = ctx.request.query
		const response = await ctx.service.offerMoney.getOfferMoneyInfo()
		ctx.body = response
		ctx.status = 200
 	 }

	async updateOfferMoneyInfo() {
		const ctx = this.ctx;		
		const response = await ctx.service.offerMoney.update(ctx.request.body)
		ctx.body = response;
		ctx.status = 202;
	}
	
}

module.exports = offerMoneyController;
