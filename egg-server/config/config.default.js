'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1539713896771_3098';

  // 导航
  config.cluster = {
  	listen: {
  		port: 7001,
  		hostname: "127.0.0.1"
  			}
 }

  // 关闭csrf防御验证
config.security = {
    csrf: {
            enable: false,
            ignoreJSON: true
    },
    domainWhiteList: ['localhost:7001'],
};

  //  设置cors跨域
config.cors = {
  origin:'*',
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
};


  //  添加处理的中间件
config.middleware = ['errorHandler'];
  // 只对 /api 前缀的 url 路径生效
config.errorHandler =  {
    match: '/api',
}

 // mysql模块
exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: 'localhost',
    // 端口号
    port: '3306',
    // 用户名
    user: 'root',
    // 密码
    password: '',
    // 数据库名
    database: 'yapp',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};



// // 设置session 24 * 3600 * 1000
exports.session = {
  key: 'EGG_SESS',
  maxAge: 6 * 3600 * 1000, //  12小时
  httpOnly: true,
  encrypt: true, // 加密
  renew: true,  // 自动重置 Session 的有效期。
};


  return config;
};



