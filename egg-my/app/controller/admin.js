'use strict';
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');
const Controller = require('egg').Controller;

class AdminController extends Controller {
  // 图片上传
  async uploadFile() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const res = await ctx.service.tools.getUploadFile(stream.filename);
    // 创建文件流
    const writeStream = fs.createWriteStream(res.uploadDir);
    try {
      // 异步写入文件
      await stream.pipe(writeStream);
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
    }

    ctx.body = {
      code: 0,
      data: res.saveDir,
      // 所有表单字段都能通过 `stream.fields` 获取到
      fields: stream.fields,
    };
    // ctx.body = data;
  }
  async index() {
    const { ctx } = this;
    this.ctx.cookies.set('token', '123123', { maxAge: 60 * 1000, httpOnly: false, overwrite: true, signed: false, domin: 'http://127.0.0.1:8080/' });
    ctx.body = {
      code: 0,
      data: 123,
    };
  }
  // 目录增删改查
  async findCatalogAll() {
    const { ctx } = this;
    const data = await ctx.service.blog.findCatalogAll();
    ctx.body = data;
  }
  async addBlogCatalog() {
    const { ctx } = this;
    const data = await ctx.service.blog.addCatalog();
    ctx.body = data;
  }
  async deleteBlogCatalog() {
    const { ctx } = this;
    const data = await ctx.service.blog.deleteCatalog();
    ctx.body = data;
  }
  async updateBlogCatalog() {
    const { ctx } = this;
    const data = await ctx.service.blog.updateCatalog();
    ctx.body = data;
  }
  // 文章增删改查
  async findArticleAll() {
    const { ctx } = this;
    const data = await ctx.service.blog.findArticleAll();
    ctx.body = data;
  }
  async addArticle() {
    const { ctx } = this;
    const data = await ctx.service.blog.addArticle();
    ctx.body = data;
  }
  async deleteArticle() {
    const { ctx } = this;
    const data = await ctx.service.blog.deleteArticle();
    ctx.body = data;
  }
  async updateArticle() {
    const { ctx } = this;
    const data = await ctx.service.blog.updateArticle();
    ctx.body = data;
  }
  // 单文章主体增删改查
  async findArticleContent() {
    const { ctx } = this;
    const data = await ctx.service.blog.findArticleContent();
    ctx.body = data;
  }
  async updateArticleContent() {
    const { ctx } = this;
    const data = await ctx.service.blog.updateArticleContent();
    ctx.body = data;
  }
  // 查询单文章
  async findArticleOne() {
    const { ctx } = this;
    const data = await ctx.service.blog.findArticleOne();
    ctx.body = data;
  }
}

module.exports = AdminController;
