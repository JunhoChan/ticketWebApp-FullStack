'use strict';

const Controller = require('egg').Controller;

class CinemaController extends Controller {

	// 获取所有影院数据
	async getAllCinemaData() {
		const ctx = this.ctx;
		const params = ctx.request.query
		const res = await ctx.service.cinema.getAllCinema(params);
		ctx.body  = res;
	}

	// 获取单个影院详情信息 get /:id
	async show() {
		const ctx = this.ctx;
		const response = await ctx.service.cinema.show(ctx.params.id)
		ctx.body = response
		ctx.status = 200		
	}

	// 修改影院信息 PUT /:id
	async update() {
	  		const ctx = this.ctx;
		  	const response = await ctx.service.cinema.update(ctx.params.id , ctx.request.body)
		  	// console.log('获取请求内容')
		  	// console.log(ctx.params.id)
		  	// console.log(ctx.request.body)
		  	ctx.body = response;
		  	ctx.status = 202;		
	}

}

module.exports = CinemaController;
