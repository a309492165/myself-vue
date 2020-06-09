/* eslint-disable */
'use strict'
// app/service/user.js
const Service = require('egg').Service

class UserService extends Service {
  async login() {
    const { ctx, app } = this
    let callObj;
    const { mobile, password } = ctx.request.body
    const rp = app.decryptPass(password)
    console.log(mobile, rp)
    const u = await app.mysql.query(app.sqlOneUser(true), [mobile, rp])
    if (u.length > 0) {
        const data = u[0];
        // 设置 session
        ctx.session.userinfo = data;
        callObj = app.formatData(data)
        callObj.msg = '登录成功'
    } else {
        callObj = {
          code: -1,
          msg: '登录失败，请确认用户信息'
        }
    }
    return callObj
  }
  async out() {
    const { ctx } = this
    ctx.session.userinfo = null
    const callObj = {
      code: 0,
      data: '用户已退出'
    }
    return callObj
  }
  async register() {
    const { ctx, app } = this
    const { username, mobile, password } = ctx.request.body
    const rp = app.decryptPass(password)
    if (username, mobile, rp) {
      const u = await app.mysql.query(app.sqlOneUser(), [username])
      if (u.length > 0) {
        return {
          code: -1,
          msg: '用户名已存在！'
        }
      }
      const m = await app.mysql.query(app.sqlOneUser(false, 'mobile'), [mobile])
      if (m.length > 0) {
        return {
          code: -1,
          msg: '手机号已存在！'
        }
      }
      const nowDate = app.formatDate()
      const sql = `
        INSERT INTO users
        (username, mobile, password, created_at)
        VALUES (?, ?, ?, ?)
      `;
      const isIn = await app.mysql.query(sql, [username, mobile, rp, nowDate])
      if (isIn.affectedRows == 1) {
        return {
          code: 0,
          data: '注册成功'
        }
      } else {
        return {
          code: -1,
          msg: '注册失败'
        }
      }
    } else {
      return app.errMsg()
    }
  }
}
module.exports = UserService
