'use strict';

// had enabled by egg
// exports.static = true;


// 开启mysql模块
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};


// 设置cors跨域
exports.cors = {
  enable: true,
  package: 'egg-cors',
};

// 开启验证
exports.validate = {
  enable: true,
  package: 'egg-validate',
};
