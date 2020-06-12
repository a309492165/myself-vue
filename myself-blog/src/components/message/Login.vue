<template>
  <div class="login-container">
    <el-dialog title="登录" :visible.sync="dialogFormVisible" :width="'460px'">
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        :label-width="formLabelWidth"
      >
        <el-form-item label="手机号" prop="mobile">
          <el-input
            v-model="form.mobile"
            autocomplete="off"
            placeholder="请输入11手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            autocomplete="off"
            placeholder="请输入密码"
            show-password
            @keyup.enter.native="handleLogin('ruleForm')"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleLogin('ruleForm')"
          >登 录</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { setEncrypt } from '@/utils/encrypt'
import regAll from '@/utils/regAll'
import util from '@/utils/util'
export default {
  name: 'Register',
  data() {
    return {
      dialogFormVisible: false,
      form: {
        mobile: '',
        password: ''
      },
      formLabelWidth: '120px',
      rules: {
        mobile: [
          { required: true, message: '请输入11位手机号', trigger: 'blur' },
          {
            pattern: regAll.mobile.reg,
            message: regAll.mobile.message,
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            pattern: regAll.password.reg,
            message: regAll.password.message,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapMutations({
      setUserinfo: 'setUserinfo'
    }),
    handleLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const mobile = this.form.mobile
          const password = setEncrypt(this.form.password)
          this.$axios.post('/login', { mobile, password }).then(data => {
            this.setUserinfo(data)
            this.$tip.success('登录成功')
            this.dialogFormVisible = false
            this.form.mobile = ''
            this.form.password = ''
            let str = JSON.stringify(data)
            sessionStorage.setItem('_mySelf', util.compile(str))
          }).catch(e => {
            // console.log(e)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
