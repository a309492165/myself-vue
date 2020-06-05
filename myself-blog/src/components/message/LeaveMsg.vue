<template>
  <div class="leave-msg">
    <span @click="handleMsg"><i class="el-icon-edit"></i>留言</span>
    <div v-if="isShow">
      <el-input
        class=" mt-10"
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="100"
        resize="none"
        :autosize="{ minRows: 3, maxRows: 6 }"
        show-word-limit
      ></el-input>
      <div class="footer mt-10">
        <el-button size="mini" type="info" @click="handleMsg">取消</el-button>
        <el-button size="mini" type="primary" @click="handleAddMsg"
          >发布</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { addComment } from '@/api/comment.js'
import { mapState } from 'vuex'
import util from '@/utils/util'
export default {
  name: 'LeaveMsg',
  data() {
    return {
      textarea: '',
      isShow: false
    }
  },
  computed: {
    ...mapState({
      userinfo: 'userinfo'
    })
  },
  methods: {
    handleMsg() {
      this.isShow = !this.isShow
    },
    handleAddMsg: util.throttle(function () {
      if (!this.userinfo) {
        this.$tip.warning('请您登录')
        return
      }
      let msg = this.textarea.trim()
      if (!msg) {
        this.$tip.warning('留言信息不能为空')
        return
      }
      addComment({ msg, uid: this.userinfo.id }).then(data => {
        this.$tip.success(data)
        this.$parent.handleComments()
        this.isShow = false
        this.textarea = ''
      }).catch(e => {
        this.$tip.error('留言失败')
      })
    }, 800)
  }
}
</script>

<style lang="scss" scoped>
.leave-msg {
  span {
    cursor: pointer;
  }
  > span:hover {
    color: #21a1ff;
    text-decoration: underline;
  }
  .footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
