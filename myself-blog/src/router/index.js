import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)
const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout.vue'),
      children: [
        { name: '/', path: '', component: () => import('@/views/page/Myself.vue') },
        { name: '/look', path: '/look', component: () => import('@/views/page/Look.vue') },
        { name: '/message', path: '/message', component: () => import('@/views/page/Message.vue') }
      ]
    },
    {
      path: '/admin',
      component: () => import('@/views/admin/AdminContent.vue'),
      children: [
        { name: '/admin/blog', path: 'blog', component: () => import('@/views/admin/AdminBlog.vue') },
        { name: '/admin/msg', path: 'msg', component: () => import('@/views/admin/AdminMsg.vue') },
        { name: '/admin/user', path: 'user', component: () => import('@/views/admin/AdminUser.vue') }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  store.commit('setRouteName', to.name)
  next()
})
export default router
