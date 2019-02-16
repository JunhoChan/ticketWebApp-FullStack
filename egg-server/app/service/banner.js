const Service = require('egg').Service;

class BannerService extends Service {

  // 获取banner数据
  async getAllBannerInfo() {
    const res =  await this.app.mysql.select('banner', { where:{status:1} })
    if(!res) {
          return {  msg:'no data' ,code:200}
    }else {
          // let jsonObj = JSON.stringify(res)
          return { data:res, code:200, msg:'成功获取数据' }
    }
  }



}

module.exports = BannerService;
