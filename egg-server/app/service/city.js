const Service = require('egg').Service;
const fs = require('fs');

class CityService extends Service {

  // 获取所有城市信息
  async getAllcityInfo() {
      const city  = await this.readFileData('city.json')
      return city
  }




  // 更新用户地址信息
  async update() {

  }
  

  // 读取本地文件
  readFileData (file)  {
      let promise = new Promise((resolve, reject) => {
          fs.readFile("./app/mock/" + file, "utf-8", (err, data) => {
              if(err) {
                  console.log(err);
                  reject("read filedata error!");
              }else {
                  data = JSON.parse(data);
                  resolve(data);
              }
          })
      });
      return promise;
  }

}

module.exports = CityService;
