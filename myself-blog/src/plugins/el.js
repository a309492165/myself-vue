// element提示二次封装
import { Message } from 'element-ui'
export function tipsMsg(res = {}) {
  let typeMsg = 'warning'
  if (!res.code) {
    typeMsg = 'success'
  } else {
    typeMsg = 'warning'
  }
  Message[typeMsg]({
    message: res.msg
  })
}
