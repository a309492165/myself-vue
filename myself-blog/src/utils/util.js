// 通用函数工具类
export default {
  // 防抖
  debounce (fn, delay) {
    let timeout = null
    return function(event) {
      if (timeout !== null) clearTimeout(timeout)
      timeout = setTimeout(() => {
        fn.call(this, event)
      }, delay)
    }
  },
  // 节流
  throttle (func, delay) {
    let prev = Date.now()
    return function() {
      let context = this
      let args = arguments
      let now = Date.now()
      if (now - prev >= delay) {
        func.apply(context, args)
        prev = Date.now()
      }
    }
  },
  // 字符串简单加密
  compile(code) {
    var c = String.fromCharCode(code.charCodeAt(0) + code.length)
    for (var i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
    }
    return escape(c)
  },
  // 字符串简单解密
  encompile(code) {
    code = unescape(code)
    var c = String.fromCharCode(code.charCodeAt(0) - code.length)
    for (var i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1))
    }
    return c
  }
}
