const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');

class UserService extends Service {

  // 检查是否用户已经注册
  async checkUserRegister(param,type) { // 0检查用户名 其他为检查手机
      let str = param;
      if( parseInt(type) === 1 ) {
         const user = await this.app.mysql.get('user', { username: str });         
         return this.esistOrNot(user,'用户名');
      } else {
         const user = await this.app.mysql.get('user', { phone: str });
         return this.esistOrNot(user,'手机号');
      }
  }

  // 创建用户
  async createNewUser(params) {  // '${params.password}'
  	let createTime = Date.parse(new Date());
    let response = await this.app.mysql.insert('user',{username: params.name, 
        		password:params.psw, phone:params.phone, createTime: createTime })
     if (response.affectedRows === 1) {
          const user = await this.app.mysql.get('user', { username: params.name});
          delete user.password; 
          delete user.createTime;
          this.ctx.session.user = user; 
        	return { msg: '注册成功', code:201  }	
        } else {
        	return { msg: '注册失败，请联系管理员', code:400  }	
        }       
  }


 // 获取所有用户列表
   async getUserInfoList(params) {
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
        let res1 = await this.app.mysql.select('user',{
            limit: pageSize, // 返回数据量
            offset: offsetNum, // 数据偏移量
        });
        let sql2 = `select COUNT(*) from user`;
        console.log(sql2);
        let res2 = await this.app.mysql.query(sql2);
        let obj = {};
        obj.data = res1;
        obj.total = res2[0]['COUNT(*)'];
        return obj;
   }


  // 退出登录
 loginOut() {
 	this.ctx.session.user = null;
 	return { msg:'退出登录成功!', code: 200 }
 }

// 查验对象是否存在
 esistOrNot(object1,str){
    if ( !object1 ) {
         return { msg: '问题不大!',code: 200 }
      } else {
         return { msg: str+'已被使用!',code: 400}
      }
}

  

}

module.exports = UserService;
