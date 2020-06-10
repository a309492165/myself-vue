'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const loginTrue = app.middleware.loginTrue();
  const { router, controller } = app;
  // 登录
  router.get('/', controller.home.index);
  router.post('/login', controller.home.login);
  router.post('/out', controller.home.out);
  router.post('/register', controller.home.register);
  // 留言
  router.get('/comment', controller.home.comment);
  router.post('/comment/add', loginTrue, controller.home.addComment);
  router.post('/comment/reply/add', loginTrue, controller.home.addReply);
  // 博客
  // *** 目录增删改查 ***
  router.post('/admin/blog/queryCatalog', loginTrue, controller.admin.findCatalogAll);
  router.post('/admin/blog/addCatalog', loginTrue, controller.admin.addBlogCatalog);
  router.post('/admin/blog/deleteCatalog', loginTrue, controller.admin.deleteBlogCatalog);
  router.post('/admin/blog/updateCatalog', loginTrue, controller.admin.updateBlogCatalog);
  // *** 文章增删改查 ***
  router.post('/admin/blog/queryArticle', loginTrue, controller.admin.findArticleAll);
  router.post('/admin/blog/addArticle', loginTrue, controller.admin.addArticle);
  router.post('/admin/blog/deleteArticle', loginTrue, controller.admin.deleteArticle);
  router.post('/admin/blog/updateArticle', loginTrue, controller.admin.updateArticle);
};
