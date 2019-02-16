'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {


  // 添加电影评论
  async addMovieComment() {
  	const ctx = this.ctx
  	const response = await ctx.service.comment.addMovieComment(ctx.request.body);
  	ctx.body = response;
  	ctx.status = 202
  }

  // 显示评论电影列表
  async showCommentMovies() {
  	const ctx = this.ctx
  	const response = await ctx.service.comment.showCommentMovies(ctx.request.query.id);
  	ctx.body = response
  	ctx.status = 200
  }

}

module.exports = CommentController;
