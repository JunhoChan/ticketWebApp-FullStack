// app/service/film.js
const Service = require('egg').Service;

class FilmService extends Service {

  // 查询
  async show(id) {
        const result = await this.app.mysql.get('film', { filmId: id })
        if( result ) {
           return {msg: '查询成功!', code: 200 , data: result}
        }
        return  {msg: '查询失败!', code: 400}
  }

  //新增
  async create(params) {
        console.log('-传来的字段--')
        console.log(params)
        const result = await this.app.mysql.insert('film', params );
        if(result.affectedRows === 1 ) {
                return { msg: '新增成功!', code:201 }; 
        }
        return {msg: '新增失败!',code: 400 };
  }

  // 更新
  async update(id,params) {
        const result = await this.app.mysql.update('film', params , { where: {
          filmId:id
        } 
      })
        if( result.affectedRows === 1 ) {
           return {msg: '修改成功!', code: 202}
        }
        return  {msg: '修改失败!', code: 400}
  }

  // 删除
  async destroy(id) {
       const result = await this.app.mysql.delete('film', {filmId:id});
        if( result.affectedRows === 1 ) {
             return  { msg:'删除成功!', code: 203}
        }
       return  { msg:'数据可能不见了!', code: 400}
  }

  // 查看所有可以上映的电影根据影院
  async getAllFilms(params) {
        let id = params.id,
            pageObj = this.setPage(params)
        let res3 = await this.app.mysql.select('cinema_film',{
            where:{ cinemaId: id , status: ['1','2']  },
            columns:['filmId']
        })
        let filmIdArray = await this.convertArray(res3) // 将已有电影放入此
        console.log('--过滤电影数据--')
        console.log(filmIdArray)
        let offsetNum = parseInt(pageObj.pageNum * pageObj.pageSize - pageObj.pageSize);
        let res1 = await this.app.mysql.select('film',{
            limit: pageObj.pageSize, // 返回数据量
            offset: offsetNum, // 数据偏移量
        });
        let res2 = await this.app.mysql.select('film',{
        });
        let obj = {};
        obj.data =  this.currentFilmStatusAtCinema(res1, filmIdArray) // 添加电影状态
        obj.total = JSON.parse( JSON.stringify(res2) ).length
        obj = JSON.stringify(obj)
        return obj;
  }

  // 影院热映(上映)的电影
  async getHotReleaseFilm(params) {
    let id = params.id,
        pageObj = this.setPage(params),
        offsetNum = parseInt(pageObj.pageNum * pageObj.pageSize - pageObj.pageSize)
    if(!id) {
        const res = await this.app.mysql.select('film',{
            limit: pageObj.pageSize, // 返回数据量
            offset: offsetNum, // 数据偏移量
            });
          return res;
    } else {
          // 获取热映数据
       const res1 = await this.app.mysql.select('cinema_film',{
            where:{ status: 1, cinemaId: id },
            columns:['filmId']
        });

       let filmIdArray = await this.convertArray(res1), // 将已有电影放入此
                   obj = {}  
        if (filmIdArray.length === 0) {
              obj.total = 0
        } else {
            const res2 = await this.app.mysql.select('film',{
            where: { filmId: filmIdArray },
            limit: pageObj.pageSize, // 返回数据量
            offset: offsetNum, // 数据偏移量
            });
                  // 总数据量
            const res3 = await this.app.mysql.select('film',{
                where: { filmId: filmIdArray },
            });      
            obj.data = res2;
            obj.total = JSON.parse( JSON.stringify(res3) ).length;
            obj = JSON.stringify(obj)
        }
          return obj;
    }
  }

  // 影院历史上映的电影
  async getHistoryFilm(params) {
      let id = params.id,
           pageObj = this.setPage(params)
          // 获取热映数据
       const res1 = await this.app.mysql.select('cinema_film',{
            where:{ status: 2, cinemaId: id },
            columns:['filmId']
        });
       let filmIdArray = await this.convertArray(res1), // 将已有电影放入此
           offsetNum = parseInt(pageObj.pageNum * pageObj.pageSize - pageObj.pageSize),
                 obj = {}  

       if(filmIdArray.length === 0) {
              obj.total = 0;
       } else {
       let row = {};
       filmIdArray.length === 0? row : row =  {
            where: { filmId: filmIdArray },
            limit: pageObj.pageSize, // 返回数据量
            offset: offsetNum, // 数据偏移量
        }
       const res2 = await this.app.mysql.select('film',row);
       // 总数据量
       let row2 = {}
       filmIdArray.length === 0? row2 : row2 = {
          where: { filmId: filmIdArray },
       }
       const res3 = await this.app.mysql.select('film',row2);      
        obj.data = res2;
        obj.total = JSON.parse( JSON.stringify(res3) ).length;
        obj = JSON.stringify(obj)   
       }
        return obj;
  }

  // 设置影院影片上下映状态
  async setFilmState(params) {
       if(parseInt(params.status)>=3 || parseInt(params.status)< 0 || isNaN(params.status) ) {
                return {code: 400, msg:'取值错误' }
       }
       let res3;
      if (parseInt( await this.checkIsExist(params.cinemaId, params.filmId) )  >= 1 ) {
           res3 = await this.app.mysql.update('cinema_film', {status: params.status} ,{
                where:{ filmId: params.filmId, cinemaId: params.cinemaId },
            });
         } else {
            res3 = await this.app.mysql.insert('cinema_film', params);
         }
        if( res3.affectedRows === 1  ) {
          return {code: 201, msg:'success'}
        } else {
          return {code: 400, msg:'error' }
        }
  }

  // 添加影院电影状态
  currentFilmStatusAtCinema(result,filmIdArray) {
    let res = JSON.parse( JSON.stringify(result) )
          // 看是否符合条件 0 未上映 1上映
          res.forEach( (item,index,self) => {
              if(  filmIdArray.indexOf(item.filmId) !== -1 ) {
                        item.status =1
                 } else {
                        item.status =0
                     }
                })
          return res;
  }
  
  // 设置分页数据
  setPage(params) {
        let obj = {}
        let pageNum = 1 // 默认第一页
        let pageSize = 5 // 每页5个
        if (params.hasOwnProperty("pageNum") && params.pageNum >= 1) {
            pageNum = parseInt(params.pageNum);
        }
        if (params.hasOwnProperty("pageSize")) {
            pageSize = parseInt(params.pageSize);
        }
        obj.pageNum = pageNum;
        obj.pageSize = pageSize;
        return obj;
  }

  // 将查询结果构造成数组 获取所有filmId 
  async convertArray(result) {
      let params = JSON.parse( JSON.stringify(result) ),
          newArray = [];
      if(params.length === 0 ) return newArray; // 没有相关结果
      params.forEach( (item,index,self) => {
          newArray.push(item.filmId)  
      })
      return newArray;
  }     

  // 排除已存在的数据
  async excludeIsExistData(result, target) {
      let resultArray = JSON.parse( JSON.stringify(result) ),
          newArray = [],
          length = target.length;
          // 排去已有数据
          for(let i=0;i<=length-1;i++) { 
              resultArray.forEach( (item,index,self) => {
                   if(item.filmId === target[i])  {
                            self.splice(index,1)
                   }
              })
          }
        // console.log('--查看结果--')
        // console.log(resultArray)  
      return resultArray;
  }

  // 检查数据是否存在在cinema_film表中
  async checkIsExist(cId, fId) {
         const result = await this.app.mysql.select('cinema_film',{
            where: { cinemaId: cId, filmId: fId },
        })
         return parseInt(result.length); // 1 有 0 没有
    }        

  // 封装统一的调用检查函数，可以在查询、创建和更新等 Service 中复用
  // checkSuccess(result) {
  //   if (result.status !== 200) {
  //     const errorMsg = result.data && result.data.error_msg ? result.data.error_msg : 'unknown error';
  //     this.ctx.throw(result.status, errorMsg);
  //   }
  //   if (!result.data.success) {
  //     // 远程调用返回格式错误 
  //     this.ctx.throw(500, 'remote response error', { data: result.data });
  //   }
  // }
}

module.exports = FilmService;