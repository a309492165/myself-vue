<template>
  <div class="register-container">
    <el-dialog
      title="用户注册"
      :visible.sync="dialogFormVisible"
      :width="'460px'"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth">
        <el-form-item label="用户名称" prop="username">
          <el-input
            v-model="form.username"
            autocomplete="off"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
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
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <span @click="handleOpenLogin" class="mt-10">已有账户前往登录</span>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleRegister('ruleForm')"
          >注 册</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { setEncrypt } from '@/utils/encrypt'
import regAll from '@/utils/regAll'
export default {
  name: 'Register',
  data() {
    return {
      dialogFormVisible: false,
      form: {
        username: '',
        mobile: '',
        password: ''
      },
      formLabelWidth: '120px',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, message: '长度最少两个字符', trigger: 'blur' }
        ],
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
    handleOpenLogin() {
      this.dialogFormVisible = false
      this.$parent.handleLogin()
    },
    handleRegister(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const username = this.form.username
          const mobile = this.form.mobile
          const password = setEncrypt(this.form.password)
          this.$axios.post('/register', { username, mobile, password }).then(data => {
            this.$tip.success(data)
            this.form.mobile = ''
            this.form.username = ''
            this.form.password = ''
            this.handleOpenLogin()
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

<style lang="scss" scoped>
.dialog-footer {
  span {
    float: left;
    color: #ec7600;
    cursor: pointer;
  }
  span:hover {
    color: #21a1ff;
    text-decoration: underline;
  }
}
</style>
