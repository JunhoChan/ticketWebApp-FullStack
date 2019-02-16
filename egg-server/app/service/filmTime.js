const Service = require('egg').Service;

class FilmTimeService extends Service {
	// 添加数据
	async addNewShowTime(params) {
	if(  parseInt(await this.checkExistOrNot(params)) === 1) {// 检查数据是否存在
				return {msg:'已有场次',data:400}
		}		
	const result = await this.app.mysql.insert('film_time', params );
	        if(result.affectedRows === 1 ) {
	                return { msg: '新增成功!', code:201 }; 
	        }
	        return {msg: '新增失败!',code: 400 };
	}

	// 获取数据
	async getRelativeData(params) {
		let obj = JSON.parse(params)
		// console.log(params.filmId ,params.cinemaId)
		let res3 = await this.app.mysql.select('film_time',{
			where: {cinemaId: obj.cinemaId ,	filmId: obj.filmId } ,
			columns: ['startTime','endTime','showId','filmId','status'],
		})
		return res3
	}

	// 删除数据
	async destroy(id) {
		const result = await this.app.mysql.delete('film_time', {id:id});
        if( result.affectedRows === 1 ) {
             return  { msg:'删除成功!', code: 203}
        }
        return  { msg:'数据可能不见了!', code: 400}
	}

	// // 获取影院上映电影 某时段  位置情况
	// async getMovieShowSeat(id) {
	// 	const res = await this.app.mysql.select('film_time', {
	// 		where:{showId: id},
	// 		columns: ['showId','position']
	// 	})
	// 	return res
	// }

	// 获取所有影院电影上线情况
	async getdataAnalysis() {
		let sql1 = 'select startTime as time,count(*) as startNum from film_time group by startTime',
			sql2 = 'select endTime as time,count(*) as endNum from film_time group by endTime',
			obj  = {}
		const res1 = await this.app.mysql.query(sql1),
			  res2 = await this.app.mysql.query(sql2)
			obj.startData = res1
			obj.endData = res2
			obj = JSON.stringify(obj)
	   return obj;
	}


	// 检查是否已经存在
	async checkExistOrNot(params) {
		const result = await this.app.mysql.get('film_time', params );
		   if( result ) {
           return 1
        }
        return 0
	}

  
}

module.exports = FilmTimeService;
