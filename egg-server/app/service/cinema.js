const Service = require('egg').Service;

class CinemaService extends Service {

  // 获取所有影院信息
  async getAllCinema(params) { // 0检查用户名 其他为检查手机  pageNum: '1', pageSize: '20'
        let pageNum = 1;
        let pageSize = 5;
        if (params.hasOwnProperty("pageNum") && params.pageNum >= 1) {
            pageNum = parseInt(params.pageNum);
        }
        if (params.hasOwnProperty("pageSize")) {
            pageSize = parseInt(params.pageSize);
        }
        let offsetNum = parseInt(pageNum * pageSize - pageSize);
        // console.log('偏移量: '  + offsetNum + 'pageNum: ' + pageNum + 'pageSize: ' + pageSize)
        let res1 = await this.app.mysql.select('cinema',{
            limit: pageSize, // 返回数据量
            offset: offsetNum, // 数据偏移量
        });
        let sql2 = `select COUNT(*) from cinema`;
        console.log(sql2);
        let res2 = await this.app.mysql.query(sql2);
        let obj = {};
        obj.data = res1;
        obj.total = res2[0]['COUNT(*)'];
        return obj;
  }

  // 获取单个影院信息
  async show(id) {
        const result = await this.app.mysql.get('cinema', { cinemaId: id })
        if( result ) {
           return {msg: '查询成功!', code: 200 , data: result}
        }
        return  {msg: '查询失败!', code: 400}
  }

  // 修改影院信息
  async update(id,params) {
        const result = await this.app.mysql.update('cinema', params , { where: {
          cinemaId:id
        } 
      })
        if( result.affectedRows === 1 ) {
           return {code: 202}
        }
        return  {code: 400}
  }
  

}

module.exports = CinemaService;
