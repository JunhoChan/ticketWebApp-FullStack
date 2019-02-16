'use strict';

const Controller = require('egg').Controller;

class DiscountController extends Controller {

  // 查看所有优惠卷
  async index() {
		const ctx = this.ctx
		// const params = ctx.request.query
		const response = await ctx.service.discount.getAllDiscounts()
		ctx.body = response
		ctx.status = 200
  }

  // 新增优惠卷
  async create() {
  	  const ctx = this.ctx;
	  const response = await ctx.service.discount.create(ctx.request.body);
	  ctx.body = response;
	  ctx.status = 201;
  }

  // 删除优惠卷
  async destroy() {
  		const ctx = this.ctx;
		console.log(ctx.params.id)
		const response = await ctx.service.discount.destroy(ctx.params.id)
		ctx.body = response
		ctx.status = 203
  }

  // 编辑优惠卷
	async update() {
		const ctx = this.ctx;		
		const response = await ctx.service.discount.update(ctx.request.body)
		ctx.body = response;
		ctx.status = 202;
  }

 

}

module.exports = DiscountController;