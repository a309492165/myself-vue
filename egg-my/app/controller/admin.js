'use strict';
const Controller = require('egg').Controller;

class AdminController extends Controller {
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
}

module.exports = AdminController;
