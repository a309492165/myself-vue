<template>
  <div class="reply mt-5">
    <span>{{ pop.createdAt }}</span>
    <el-popover
      placement="bottom-end"
      width="400"
      trigger="click"
      v-model="pop.visible"
    >
      <el-input
        class=" mt-10"
        type="textarea"
        placeholder="请输入内容"
        v-model="pop.viContent"
        maxlength="100"
        resize="none"
        :autosize="{ minRows: 3, maxRows: 6 }"
        show-word-limit
      ></el-input>
      <div class="footer mt-10">
        <el-button size="mini" type="text" @click="pop.visible = false"
          >取消</el-button
        >
        <el-button size="mini" type="primary" @click="handleReply"
          >确定</el-button
        >
      </div>
      <span class="call-reply" slot="reference">回复</span>
    </el-popover>
  </div>
</template>

<script>
import { addReply } from '@/api/comment.js'
import { mapState } from 'vuex'
import util from '@/utils/util'
export default {
  name: 'Reply',
  props: {
    pop: {
      type: Object,
      default: () => {}
    },
    commentId: {
      type: Number
    }
  },
  computed: {
    ...mapState({
      userinfo: state => state.userinfo
    })
  },
  data() {
    return {}
  },
  methods: {
    handleReply: util.throttle(function () {
      let commentId = this.commentId
      let content = this.pop.viContent.trim()
      if (!content) {
        this.$tip.warning('回复不能为空')
        this.pop.viContent = ''
        return false
      }
      let uid, cid
      if (this.userinfo) {
        uid = this.userinfo.id
        cid = null
      }
      if (this.pop.hasOwnProperty('cid') && this.pop.user_id !== this.userinfo.id) {
        uid = this.userinfo.id
        // 给之前的主人打电话
        cid = this.pop.user_id
      }
      addReply({content, commentId, uid, cid}).then(data => {
        this.$tip.success(data)
        this.$parent.initList()
        this.pop.visible = false
        this.pop.viContent = ''
      }).catch(e => {
        this.$tip.success('回复失败')
      })
    }, 800)
  }
}
</script>

<style lang="scss" scoped>
.reply {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  .call-reply:hover {
    cursor: pointer;
    color: #ec7600;
  }
}
.footer {
  display: flex;
  justify-content: flex-end;
}
</style>
