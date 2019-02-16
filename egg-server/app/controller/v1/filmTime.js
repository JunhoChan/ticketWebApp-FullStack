'use strict';

const Controller = require('egg').Controller;

class FilmTimeController extends Controller {

	// 添加新的播放时段
  async create() {
  	const ctx = this.ctx
  	const response = await ctx.service.filmTime.addNewShowTime(ctx.request.body);
	ctx.body = response;
	ctx.status = 201;
  }

  // 获取所有数据
  async index() {
  	const ctx = this.ctx
  	// console.log(ctx.request.query[0])
  	const params = ctx.request.query[0]
  	const response = await ctx.service.filmTime.getRelativeData(params);
	ctx.body = response;
	ctx.status = 200;
  }


  //删除电影  delete
  async destroy() {
	const ctx = this.ctx;
	const response = await ctx.service.filmTime.destroy(ctx.params.id)
	ctx.body = response
	ctx.status = 203
	}

  // 电影数据分析
  async dataAnalysis() {
  	const ctx = this.ctx;
  	const response =await ctx.service.filmTime.getdataAnalysis()
  	ctx.body = response
  	ctx.status = 200
  }



}

module.exports = FilmTimeController;
