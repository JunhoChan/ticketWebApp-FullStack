const Service = require('egg').Service;

Date.prototype.format = function(format) {
    var args = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    if (/(y+)/.test(format))
        format = format.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format))
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length)
            );
    }
    return format;        
} 

class CommentService extends Service {


  //  添加评论
  async addMovieComment(params) {
    let obj = {}
    obj.filmId = params.filmId
    obj.userId = params.userId
    let currentDate =  new Date().format("yyyy-MM-dd")
    params.ptime = currentDate
    const result = await this.app.mysql.insert('comment', params );
    if(result.affectedRows === 1 ) {
          this.userCommentIt(obj) // 修改评论记录
        return { msg: '新增成功!', code:201 }; 
    }
        return {msg: '服务器出现问题!',code: 400 };
  }

  // 用户评论了电影 修改状态 userId filmId
  async userCommentIt(params) {
    params.status = 1
    let res = await this.app.mysql.update('film_user', params ,{
      where:{ userId: params.userId, filmId: params.filmId }
    })
    return 1;
  }

  // 显示用户要评论的电影
  async showCommentMovies(param) {
      let sawArr = [],newArr =[] // 存储看过的电影ID
      const res1 = await this.app.mysql.select('film_user',{ // 找出相关用户看过的全部电影
        where:{ userId:param }, columns:['filmId','status']
      })
      JSON.parse(JSON.stringify(res1)).filter((item) =>{
            sawArr.push(item.filmId)
      })
        
      if(sawArr.length > 0) {
          //  所有买过票的电影
          const res2 = await this.app.mysql.select('film',{
             where: { filmId: sawArr },
             columns:['filmId','filmName','coverImg','startTime','fimeAtor','filmDiretor']
          })
          // 找出评价过的电影
          const res3 = await this.app.mysql.select('film_user',{
            where:{ userId:param , status:1 }, columns:['filmId']
          })
          JSON.parse(JSON.stringify(res3)).forEach((item)=> {
                newArr.push(parseInt(item.filmId ))
          })
          res2.forEach((item) => { // 添加电影评论状态
              if(newArr.indexOf(item.filmId) !== -1) {
                      item.status = 1  // 评论
              } else {
                      item.status = 0
              }
          })
          return res2;
      }

      return []; // 没买过票
  }



  // 找出被评价的电影ID  result数组
  // async searchCommentMovies(uId) {
  //     let newArr = []
  //     const response = await this.app.mysql.select('film_user',{
  //       where:{ userId:uId , status:1 }, columns:['filmId']
  //     })
  //     JSON.parse(JSON.stringify(response)).forEach((item)=> {
  //           newArr.push(parseInt(item.filmId ))
  //     })
  //     return newArr;
  // }

}

module.exports = CommentService;