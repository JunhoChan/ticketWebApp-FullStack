const Service = require('egg').Service;
const fs = require('fs');

class MessageService extends Service {

  async getMessageInfo() {
    let res = await this.app.mysql.select('message',{ where: {messageId: 1}  })
    // await this.app.mysql.select('banner', { where:{status:1} }) 
      return res[0];
  }


  async updateMessageInfo(param) {
    let params = {}
    params.content = param.content
    const result = await this.app.mysql.update('message', params , { where: {
          messageId:1
        } 
    })
    if( result.affectedRows === 1 ) {
           return {msg: 'success!', code: 202}
    }
      return  {msg: 'error!', code: 400}
  }


}

module.exports = MessageService;
