export default {
  password: {
    // reg: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,}$/,
    // message: '请输入密码为数字+字母+字符，至少八位'
    reg: /^.{6,}$/,
    message: '请输入密码，至少六位'
  },
  mobile: {
    reg: /^1[345678]\d{9}$/,
    message: '输入正确的手机号码'
  }
}
