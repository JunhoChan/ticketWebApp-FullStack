const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');

class DiscountService extends Service {
  
  async create(params) {
      params.dRealNum = params.dNum
      const result = await this.app.mysql.insert('discount', params );
        if(result.affectedRows === 1 ) {
                return { msg: '新增成功!', code:201 }; 
        }
        return {msg: '新增失败!',code: 400 };
  }

  // 获取所有优惠卷
  async getAllDiscounts() {
      const result = await this.app.mysql.select('discount', {});
      let res = JSON.stringify(result)
      return res
  }

  // 删除优惠卷
  async destroy(param) {
     const result = await this.app.mysql.delete('discount', {discountId:param});
          if( result.affectedRows === 1 ) {
               return  { msg:'删除成功!', code: 203}
          }
         return  { msg:'数据可能不见了!', code: 400}
  }


  // 编辑优惠卷
  async update(params) {
        const options = { where: { discountId: params.discountId} }
        const result = await this.app.mysql.update('discount', params ,options )
        if( result.affectedRows === 1 ) {
           return {msg: '修改成功!', code: 202}
        }
        return  {msg: '修改失败!', code: 400}
  }


}

module.exports = DiscountService;
