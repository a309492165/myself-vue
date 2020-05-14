'use strict';
// 1、在js中，暴露一个方法
module.exports = () => {
  // 2、返回一个异步的函数
  return async function login(ctx, next) {
    if (ctx.session.userinfo) {
      await next();
    } else {
      ctx.body = {
        code: -1,
        msg: '请登录用户',
      };
      return;
    }
  };
};
