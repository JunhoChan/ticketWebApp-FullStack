'use strict';

const Controller = require('egg').Controller;

class BannerController extends Controller {

	// 获取banner数据
  async index() {
  		const ctx = this.ctx
  		let res = await ctx.service.banner.getAllBannerInfo()
  		ctx.body = res
  }

}

module.exports = BannerController;
