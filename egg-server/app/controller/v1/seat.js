'use strict';

const Controller = require('egg').Controller;

class SeatController extends Controller {
  async index() {
  	const ctx = this.ctx
  	const response = await ctx.service.seat.index(ctx.query.showId);
    ctx.body = response;
    ctx.status = 200
  }
}

module.exports = SeatController;
