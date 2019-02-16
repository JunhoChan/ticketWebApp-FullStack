const Service = require('egg').Service;

class SeatService extends Service {
	async index(id) {
		const res = await this.app.mysql.select('seat',{
			where:{showId:id},
			columns:['showId','position']
		})
		return res;
	}


	// // 获取影院上映电影 某时段  位置情况
	// async getMovieShowSeat(id) {
	// 	const res = await this.app.mysql.select('film_time', {
	// 		where:{showId: id},
	// 		columns: ['showId','position']
	// 	})
	// 	return res
	// }
}

module.exports = SeatService;
