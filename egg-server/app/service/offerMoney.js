const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');

class offerMoneyService extends Service {

    // 获取所有满减优惠信息
  async getOfferMoneyInfo() {
      const result = await this.app.mysql.select('offerMoney', {});
      let res = JSON.stringify(result)
      return res
  } 

    // 编辑优惠卷
  async update(params) {
        const options = { where: { offerId: params.offerId} }
        const result = await this.app.mysql.update('offerMoney', params ,options )
        if( result.affectedRows === 1 ) {
           return {msg: '修改成功!', code: 202}
        }
        return  {msg: '修改失败!', code: 400}
  }


}

module.exports = offerMoneyService;
