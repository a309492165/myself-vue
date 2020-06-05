import Vue from 'vue'

export default {
  /**
   * 二次确认弹窗
   * @param {*} param 参数
   * title: 提示
   * msg: 消息体
   * type: 类型
   */
  confirm (param) {
    param = Object.assign({}, {title: '提示', msg: '', type: 'warning'}, param)
    return Vue.prototype.$confirm(param.msg, param.title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: param.type,
      closeOnClickModal: false,
      closeOnPressEscape: false
    })
  },
  /**
   * 消息弹窗提示
   * @param {*} param 参数
   */
  alert (param) {
    param = Object.assign({}, {title: '提示', msg: '', type: 'warning'}, param)
    return Vue.prototype.$alert(param.msg, param.title, {
      confirmButtonText: '确定',
      type: param.type,
      closeOnClickModal: false,
      closeOnPressEscape: false
    })
  },
  /**
   * Admin 密码二次验证
   */
  pwdValid () {
    return Vue.prototype.$prompt('请输入密码', '密码验证', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(({ value }) => {
      // 密码验证
      return value
    })
  },
  /**
   * 成功提示
   * @param {*} msg 消息体
   */
  success (msg) {
    return Vue.prototype.$message({
      type: 'success',
      message: msg
    })
  },
  /**
   * 警告提示
   * @param {*} msg  消息体
   */
  warning (msg) {
    return Vue.prototype.$message({
      type: 'warning',
      message: msg
    })
  },
  /**
   * 错误提示
   * @param {*} msg 消息体
   */
  error (msg) {
    return Vue.prototype.$message({
      type: 'error',
      message: msg
    })
  },
  /**
   * 消息提示
   * @param {*} msg  消息体
   */
  info (msg) {
    return Vue.prototype.$message({
      type: 'info',
      message: msg
    })
  }
}
