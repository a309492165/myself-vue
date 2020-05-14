'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async login() {
    const { ctx } = this;
    const data = await ctx.service.user.login();
    ctx.body = data;
  }
  async out() {
    const { ctx } = this;
    const data = await ctx.service.user.out();
    ctx.body = data;
  }
  async register() {
    const { ctx } = this;
    const data = await ctx.service.user.register();
    ctx.body = data;
  }
  async comment() {
    const { ctx } = this;
    const data = await ctx.service.comment.findAll();
    ctx.body = data;
  }
  async addComment() {
    const { ctx } = this;
    const data = await ctx.service.comment.addComment();
    ctx.body = data;
  }
  async addReply() {
    const { ctx } = this;
    const data = await ctx.service.comment.addReply();
    ctx.body = data;
  }
}

module.exports = HomeController;
