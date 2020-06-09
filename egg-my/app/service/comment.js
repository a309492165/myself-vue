/* eslint-disable */
'use strict';
// app/service/comment.js
const Service = require('egg').Service;

class CommentService extends Service {
  async findAll() {
    const { ctx, app } = this
    const offsetp = ctx.query.offsetp || 1
    const limitp = ctx.query.limitp || 1
    const sql = `
      SELECT 
        c.id AS commentId, 
        c.user_id, 
        c.content, 
        c.createdAt, 
        c.visible, 
        u.username 
      FROM comments c 
        LEFT JOIN users u on u.id = c.user_id 
      ORDER BY 
        c.createdAt DESC 
      LIMIT ?, ?
    `;
    
    const comment = await app.mysql.query(sql, [ Number((offsetp-1)*limitp), Number(limitp)])
    const sqlreply = `
      SELECT
        r.id AS replyId,
        r.content,
        r.createdAt,
        r.user_id,
        u.username,
        uc.id AS cid,
        uc.username AS cname 
      FROM
        reply r
        LEFT JOIN comments c ON r.comment_id = c.id
        LEFT JOIN users u ON r.user_id = u.id
        LEFT JOIN users uc ON r.call_id = uc.id 
      WHERE
        c.id = ? 
      ORDER BY
        r.createdAt DESC
    `;
    for (let i = 0; i < comment.length; i++) {
      let item = comment[i]
      let reply = await app.mysql.query(sqlreply, [item.commentId])
      item.replys = reply
    }
    let res = app.formatData({dataList: comment})
    const total = await app.mysql.query(`SELECT count(id) FROM comments`)
    if (total) {
      res.data.total = total[0]['count(id)']
    }
    // 获取 session 值
    const userinfo = ctx.session.userinfo;
    if (userinfo) {
      res.data.userinfo = userinfo
    }
    return res
  }
  async addComment() {
    const { ctx, app } = this
    const { msg, uid } = ctx.request.body
    if (uid && msg) {
      const nowDate = app.formatDate()
      const sql = `
        INSERT INTO comments
        (user_id, content, createdAt)
        VALUES (?, ?, ?)
      `;
      const isIn = await app.mysql.query(sql, [uid, msg, nowDate])
      return app.lineJudgment(isIn.affectedRows, '留言成功', '留言失败')
    } else {
      return app.errMsg()
    }
  }
  async addReply() {
    const { ctx, app } = this
    const { content, commentId, uid, cid } = ctx.request.body
    const nowDate = app.formatDate()
    const sql = `
      INSERT INTO reply
      (content, comment_id, user_id, call_id, createdAt)
      VALUES (?, ?, ?, ?, ?)
    `;
    const isIn = await app.mysql.query(sql, [content, commentId, uid, cid, nowDate])
    return app.lineJudgment(isIn.affectedRows, '回复成功', '回复失败')
  }
}

module.exports = CommentService
