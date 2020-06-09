/* eslint-disable */
'use strict';
const moment = require('moment')
const JSEncrypt = require('node-jsencrypt')
module.exports = {
  formatData(data) {
    let isTrue = false
    if (Object.prototype.toString.call(data) === '[object Array]') {
      if (data && data.length > 0) {
        isTrue = true
      }
    } else {
      if (JSON.stringify(data) !== '{}') {
        isTrue = true
      }
    }
    let obj = {
      code: -1,
      data: null,
      msg: '请求失败',
    }
    if (isTrue) {
      obj = {
        code: 0,
        data,
        msg: '请求成功',
      }
    }
    return obj
  },
  formatDate() {
    return moment().format('YYYY-MM-DD HH:mm:ss')
  },
  sqlOneUser(d = false, w = 'username') {
    let sql
    if (d) {
      // 登录sql
      sql = `
        SELECT
          username, id
        FROM
          users
        WHERE
          mobile = ? AND password = ?
      `
    } else {
      // 注册sql
      sql = `
        SELECT
          username
        FROM
          users
        WHERE
          ${w} = ?
      `
    }
    return sql
  },
  decryptPass(val) {
    // 解密私钥
    const privkey = `MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGAf1EHUAnDVvl/V4Tn
    b6JxmmU3jQh4Cigt2f3Nva0kIeZRC4UdowCBQZOWsxiy2OPLkwy+15ncvQuYl32D
    0LPKnY9BuWRYQBOfdgD0bTQOISBYlnlxzsEWsschsWpIrz4EEXEZwUeEPaC+nrY5
    ok9ORG9iCO+v5O9V29VGjcM9P+sCAwEAAQKBgD4uzDyKWC79svWDAyqiE4xOTWCD
    t2V2lFZ5QOiYTSKFhCX1QTFgyMDHnf4hXRDTyZUrz3YsPwTSShgLhLsFZTrwMbx7
    kzxljB8W0CFuJHmo2kwTmjd1YSvXQ+vcJVtThj/ZjViF3+P8yX8LAV8FqhRy6pq0
    MQ5upd5XOip8hEshAkEA9uQ4MnB8rIbmBi/z03PEZcMZeopCEtP8uwdZU9fYY6wX
    T81qimdWBjN3m5z6Zs8+ceFjttkgIfIxl6tutsSbewJBAIQDegCiKLpbPA07htXb
    12VN5JlxU4gxuuoXItBpJk++/C/kfMhCKtXZ3CcsT69JluriIg1z+8oJLbT347U7
    ylECQQDQhMnt19GEiV6HRULCiVkLtW60b0cEzeP7Nma8iGVrMTJzJQPhpwshq6BO
    XpOh91E/L2RfTxxzbzFxbsnQNVc3AkABtEHI7E72SOM3kIMnE5VuO1kuGeZoJawy
    BWZvpkvWT7LVs29g7mm7JPrQjqPgsWR/V7f00IB5lTC/20tXNZRhAkBZt/m9VFhi
    dYIdTxS89xGZtUZG5h2UYr2Cwob/Tv33PTQgoVOXkRUGTICT5apBwIG3IvZa5Sx5
    sH7a9iqV1Ry4`
    // 解密
    const jse = new JSEncrypt()
    jse.setPrivateKey(privkey)
    const p = jse.decrypt(val)
    return p
  },
  errMsg() {
    return {
      code: -1,
      msg: '未知错误',
    }
  },
  // 查询单行返回判断
  lineJudgment(line = 0, successMsg = '成功', errorMsg = '失败') {
    let obj;
    if (line === 1) {
      obj = {
        code: 0,
        data: successMsg,
      };
    } else {
      obj = {
        code: -1,
        data: errorMsg,
      };
    }
    return obj;
  },
};
