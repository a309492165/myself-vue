/* eslint-disable */
'use strict'
// app/service/blog.js
const Service = require('egg').Service

class BlogService extends Service {
  // 目录增删改查
  async findCatalogAll () {
    let { ctx, app } = this; 
    const { uid } = ctx.request.body
    if (uid) {
      const sql = `
          SELECT
              * 
          FROM
              blog_catalog 
          WHERE
              uid = ?
      `
      const content = await this.app.mysql.query(sql, [uid])
      let res = app.formatData(content)
      return res
    } else {
      return app.errMsg()
    }
  }
  async addCatalog () {
    const { ctx, app } = this
    const { uid, title } = ctx.request.body
    if (uid && title) {
      const nowDate = app.formatDate()
      const sql = `
        INSERT INTO blog_catalog
        (uid, title, createdAt)
        VALUES (?, ?, ?)
      `;
      const isIn = await app.mysql.query(sql, [uid, title, nowDate])
      return app.lineJudgment(isIn.affectedRows, '新增成功', '新增失败')
    } else {
      return app.errMsg()
    }
  }
  async deleteCatalog () {
    const { ctx, app } = this
    const { id } = ctx.request.body
    if (id) {
      const sql = `
        DELETE FROM blog_catalog
        WHERE id = ?
      `;
      const isIn = await app.mysql.query(sql, [id])
      return app.lineJudgment(isIn.affectedRows, '删除成功', '删除失败')
    } else {
      return app.errMsg()
    }
  }
  async updateCatalog () {
    const { ctx, app } = this
    const { title, id } = ctx.request.body
    if (id) {
      const upDate = app.formatDate()
      const sql = `
        UPDATE blog_catalog
        SET title = ?, updatedAt = ?
        WHERE id = ?
      `;
      const isIn = await app.mysql.query(sql, [title, upDate, id])
      return app.lineJudgment(isIn.affectedRows, '修改成功', '修改失败')
    } else {
      return app.errMsg()
    }
  }
  // 文章增删改查
  async findArticleAll () {
    let { ctx, app } = this; 
    const { catalogId } = ctx.request.body
    if (catalogId) {
      const sql = `
          SELECT
              * 
          FROM
              blog_article
          WHERE
            catalogId = ?
      `
      const content = await this.app.mysql.query(sql, [catalogId])
      let res = app.formatData(content)
      return res
    } else {
      return app.errMsg()
    }
    
  }
  async addArticle () {
    const { ctx, app } = this
    const { catalogId, uid, title } = ctx.request.body
    if (catalogId && uid && title) {
      const nowDate = app.formatDate()
      const sql = `
        INSERT INTO blog_article
        (catalogId, user_id, title, createdAt, updatedAt, content)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const isIn = await app.mysql.query(sql, [catalogId, uid, title, nowDate, nowDate, ''])
      return app.lineJudgment(isIn.affectedRows, '新增成功', '新增失败')
    } else {
      return app.errMsg()
    }
  }
  async deleteArticle () {
    const { ctx, app } = this
    const { id } = ctx.request.body
    if (id) {
      const sql = `
        DELETE FROM blog_article
        WHERE id = ?
      `
      const isIn = await app.mysql.query(sql, [id])
      return app.lineJudgment(isIn.affectedRows, '删除成功', '删除失败')
    } else {
      return app.errMsg()
    }
  }
  async updateArticle () {
    const { ctx, app } = this
    const { id, title } = ctx.request.body
    if (id && title) {
      const upDate = app.formatDate()
      const sql = `
        UPDATE blog_article
        SET title = ?, updatedAt = ?
        WHERE id = ?
      `
      const isIn = await app.mysql.query(sql, [title, upDate, id])
      return app.lineJudgment(isIn.affectedRows, '修改成功', '修改失败')
    } else {
      return app.errMsg()
    }
  }
}

module.exports = BlogService
