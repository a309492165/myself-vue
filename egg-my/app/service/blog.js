/* eslint-disable */
'use strict'
// app/service/blog.js
const Service = require('egg').Service
const path = require('path')
const fs = require('fs')

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
  // 单文章主体增删改查
  async findArticleContent () {
    let { ctx, app } = this; 
    const { articleId } = ctx.request.body
    if (articleId !== null) {
      const sql = `
          SELECT
            content 
          FROM
            blog_article
          WHERE
            id = ?
      `
      const content = await this.app.mysql.query(sql, [articleId])
      let res = app.formatData(content)
      return res
    } else {
      return app.errMsg()
    }
    
  }
  async updateArticleContent () {
    const { ctx, app } = this
    const { articleId, content } = ctx.request.body
    if (articleId && content !== null) {
      const upDate = app.formatDate()
      const sql = `
        UPDATE blog_article
        SET content = ?, updatedAt = ?
        WHERE id = ?
      `
      const isIn = await app.mysql.query(sql, [content, upDate, articleId])
      return app.lineJudgment(isIn.affectedRows, '修改成功', '修改失败')
    } else {
      return app.errMsg()
    }
  }
  // 查询单文章
  async findArticleOne () {
    let { ctx, app } = this; 
    const { articleId } = ctx.request.body
    console.log(articleId)
    if (articleId !== null) {
      const sql = `
          SELECT
            * 
          FROM
            blog_article
          WHERE
            id = ?
      `
      const content = await this.app.mysql.query(sql, [articleId])
      let res = app.formatData(content)
      return res
    } else {
      return app.errMsg()
    }
    
  }
  // 图片上传
  async uploadFile () {
    const { ctx, app } = this
    // files[0]表示获取第一个文件，若前端上传多个文件则可以遍历这个数组对象
    const file = ctx.request.files[0] 
    console.log(file)
    // 读取文件
    const fileA = fs.readFileSync(file.filepath)
    // 将文件存到指定位置
    fs.writeFileSync(path.join('app/public/upload/', `test.png`), fileA)
  }
}

module.exports = BlogService
