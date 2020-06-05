<template>
  <div class="message-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <div v-if="!userinfo" class="login-col clearfix">
          <span @click="handleReg">注册</span>
          <span class="login-colspan-middle">|</span>
          <span @click="handleLogin">登录</span>
        </div>
        <div v-if="userinfo" class="login-col clearfix">
          <span>{{ userinfo.username }}</span>
          <span v-if="userinfo.username == 'admin'" class="login-colspan-middle"
            >|</span
          >
          <span v-if="userinfo.username == 'admin'" @click="jumpAdmin"
            >后台管理</span
          >
          <span class="login-colspan-middle">|</span>
          <span @click="handleOut">退出</span>
        </div>
      </el-col>
    </el-row>
    <leave-msg></leave-msg>
    <leave-list ref="leavelist"></leave-list>
    <register ref="register"></register>
    <login ref="login"></login>
  </div>
</template>

<script>
import LeaveMsg from '@/components/message/LeaveMsg.vue'
import LeaveList from '@/components/message/LeaveList.vue'
import Register from '@/components/message/Register.vue'
import Login from '@/components/message/Login.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Message',
  components: {
    LeaveMsg,
    LeaveList,
    Register,
    Login
  },
  computed: {
    ...mapState({
      userinfo: 'userinfo'
    })
  },
  created() {},
  methods: {
    ...mapMutations({
      setUserinfo: 'setUserinfo'
    }),
    handleReg() {
      this.$refs['register'].dialogFormVisible = true
    },
    handleLogin() {
      this.$refs['login'].dialogFormVisible = true
    },
    handleOut() {
      this.$axios.post('/out').then(data => {
        this.$tip.success(data)
        this.setUserinfo(null)
      })
    },
    handleComments() {
      this.$refs['leavelist'].initList()
    },
    jumpAdmin() {
      const routeUrl = this.$router.resolve({
        path: '/admin'
      })
      window.open(routeUrl.href, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-col {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
  span {
    color: #ec7600;
    cursor: pointer;
  }
  span:hover {
    color: #21a1ff;
    text-decoration: underline;
  }
  .login-colspan-middle {
    margin: 0 4px;
  }
}
</style>
