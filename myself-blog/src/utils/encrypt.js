import { JSEncrypt } from 'jsencrypt'

export function setEncrypt (str) {
  // 加密公钥
  const publicKey = `-----BEGIN PUBLIC KEY-----
    MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgH9RB1AJw1b5f1eE52+icZplN40I
    eAooLdn9zb2tJCHmUQuFHaMAgUGTlrMYstjjy5MMvteZ3L0LmJd9g9Czyp2PQblk
    WEATn3YA9G00DiEgWJZ5cc7BFrLHIbFqSK8+BBFxGcFHhD2gvp62OaJPTkRvYgjv
    r+TvVdvVRo3DPT/rAgMBAAE=
    -----END PUBLIC KEY-----`
  const jsencrypt = new JSEncrypt()
  jsencrypt.setPublicKey(publicKey)
  return jsencrypt.encrypt(str)
}

export function deEncrypt (str) {
  // 解密私钥
  const privkey = `-----BEGIN PRIVKEY KEY-----
    MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGAf1EHUAnDVvl/V4Tn
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
    sH7a9iqV1Ry4
    -----END PRIVKEY KEY-----`
  // 解密
  const jsencrypt = new JSEncrypt()
  jsencrypt.setPrivateKey(privkey)
  return jsencrypt.decrypt(str)
}
