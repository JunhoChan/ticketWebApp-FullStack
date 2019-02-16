'use strict';

const Controller = require('egg').Controller;


  //  定义创建接口的请求参数规则
const createRule = {
  filmName: 'string', //电影名
  filmIntroduction: 'string', // 电影介绍
  filmScore: 'string', // 电影评分
  startTime: 'string', // 上映时间
  fimeAtor:  'string',	// 主演
  filmDiretor: 'string',  // 导演
  makingArea: 'string',	// 制作地区
  type:  'string', // 电影类型 0 动作 1科幻 2 日常 3 漫画 4 爱情 5 冒险
  coverImg: 'string',	// 电影封面
};


class FilmController extends Controller {
		// 查看所有电影列表 
		async index() {
				const ctx = this.ctx
				const params = ctx.request.query
				const response = await ctx.service.film.getAllFilms(params)
				ctx.body = response
				ctx.status = 200
		}


			// 查看电影  /film/:id
		async show() {
				const ctx = this.ctx;
				console.log(ctx.params.id)
				const response = await ctx.service.film.show(ctx.params.id)
				ctx.body = response
				ctx.status = 200
		}


			// 新增电影 post 
		 async create() {
			    const ctx = this.ctx;
			    // 校验 `ctx.request.body` 是否符合我们预期的格式
			    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
			    ctx.validate(createRule, ctx.request.body);
			    const response = await ctx.service.film.create(ctx.request.body);
			    ctx.body = response;
			    ctx.status = 201;
		  }

		  //  编辑电影  put
		  async update() {
		  		const ctx = this.ctx;
		  		const response = await ctx.service.film.update(ctx.params.id , ctx.request.body)
		  		// console.log('获取请求内容')
		  		// console.log(ctx.params.id)
		  		// console.log(ctx.request.body)
		  		ctx.body = response;
		  		ctx.status = 202;
		  }

		  //删除电影  delete
		  async destroy() {
		  		const ctx = this.ctx;
				console.log(ctx.params.id)
				const response = await ctx.service.film.destroy(ctx.params.id)
				ctx.body = response
				ctx.status = 203
		  }

		  // 影院热映电影
		  async hotReleaseFilm() {
		  		const ctx = this.ctx;
		  		const params = ctx.request.query
				const response = await ctx.service.film.getHotReleaseFilm(params)
				ctx.body = response
				ctx.status = 200
		  }

		  // 历史上映电影
		  async historyFilm() {
		  		const ctx = this.ctx;
		  		const params = ctx.request.query
				const response = await ctx.service.film.getHistoryFilm(params)
				ctx.body = response
				ctx.status = 200
		  }

		  // 设置成上下映状态
		  async setFilmState() {
		  		const ctx = this.ctx
		  		const params = ctx.request.query
		  		const response = await ctx.service.film.setFilmState(params)
				ctx.body = response
				ctx.status = 200
		  }
}

module.exports = FilmController;
