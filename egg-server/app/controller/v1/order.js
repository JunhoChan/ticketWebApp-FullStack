'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {

	// 下订单
  async payOrder() {
  	const ctx = this.ctx
  	const response = await ctx.service.order.payOrder(ctx.request.body);
  	ctx.body = response;
  	ctx.status = 202
  }

  // 用户查看订单
  async showOrder() {
  	const ctx = this.ctx
  	const response = await ctx.service.order.showOrder(ctx.request.query)
  	ctx.body = response
  	ctx.status = 200
  }

}

module.exports = OrderController;
