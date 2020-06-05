import Vue from 'vue'
let loading = null

export default {
  open (txt) {
    loading = Vue.prototype.$loading({
      lock: true,
      text: txt || '数据加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  },
  close () {
    loading.close()
  }
}
