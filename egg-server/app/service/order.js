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

class OrderService extends Service {
  
  // 用户下订单 新增订单->添加座位->用户买了电影
  async payOrder(params) {
    params.shopTime =  new Date().format("yyyy-MM-dd hh:mm:ss");
    const result = await this.app.mysql.insert('order', params );
    if(result.affectedRows === 1 ) {
            this.handlePosInf(params) // 处理位置信息 向seat插入信息
            this.recordUserBuyTicks(params) //记录用户买票并看是否评价
            return { msg: '新增成功!', code:201 }; 
    } else {
          return { msg: '服务器出现问题!', code:500 }; 
    }

  }

  // 处理位置信息
 handlePosInf(params) {
        let obj = {}
        obj.showId = parseInt(params.showId)
        obj.userId = parseInt(params.userId)
        let arr = params.position.split(",")
        arr.forEach(async (item) => {
            obj.position = item
            let result = await this.app.mysql.insert('seat', obj );
        })
  }

  // 记录用户买了电影票
  async recordUserBuyTicks(params) {
       let res1 = await this.app.mysql.select('film_time',{ // 查找相应场次的电影
            where:{ showId: params.showId },
            columns:['filmId']
       })
      let obj = {}
      obj.userId = parseInt(params.userId)
      obj.filmId = parseInt(res1[0].filmId)
      let flag = await this.checkHasFilmUer()
      if(parseInt(flag) !== 1) {
         let result = await this.app.mysql.insert('film_user', obj );
      } 
  }
  // 检查之前是否已经买过票了
  async checkHasFilmUer(params) {
     const result = await this.app.mysql.select('film_user', params)
      if(result) {
         return 1
      } else {
        return 0;
      }
  }

  // 用户查看订单逻辑
  async showOrder(params) {
      const res = await this.app.mysql.select('order',{ // 查找相应场次的电影
            where:{ userId: params.id },
            columns:['cinemaName','position','num','totalPrice','shopTime'],
            orders: [['orderId','desc']], // 排序方式
       })
      return res
  }


}

module.exports = OrderService;