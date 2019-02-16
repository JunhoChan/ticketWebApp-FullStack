'use strict';

const Controller = require('egg').Controller;


class CityController extends Controller {

	// 获取所有城市信息
  async index() {
    const ctx = this.ctx
    const res = await ctx.service.city.getAllcityInfo();
    ctx.body = res
  }


  // 更新用户地址
  async update() {
  	const ctx = this.ctx
  	ctx.body = res
  }
}

module.exports = CityController;
