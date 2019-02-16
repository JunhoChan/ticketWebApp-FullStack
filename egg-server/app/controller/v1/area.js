'use strict';

const Controller = require('egg').Controller;

class AreaController extends Controller {

  // 制片区域或国家信息
  async areaOrCountryInfo() {
  		const ctx = this.ctx;
  		const response = await ctx.service.area.getAreaOrCountryInfo();
  		ctx.body = response;
  		ctx.status = 200;
  }
}

module.exports = AreaController;
