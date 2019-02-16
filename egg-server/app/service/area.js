const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');

class AreaService extends Service {

  // 获取区域信息
  async getAreaOrCountryInfo() {
    let response = await this.app.mysql.select('area')
        response = JSON.stringify(response)
        return response;
  }

  

}

module.exports = AreaService;
