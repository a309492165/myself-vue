<template>
  <div class="leave-list mt-20">
    <section v-for="leavemsg of leaveList" :key="leavemsg.id">
      <div class="title">
        <span><i class="el-icon-user"></i>{{leavemsg.username}}</span>
        <em>:</em>
        {{ leavemsg.content }}
      </div>
      <reply :pop='leavemsg' :commentId='leavemsg.commentId'></reply>
      <div class="reply-box clearfix mt-10">
        <section v-for="r of leavemsg.replys" :key="r.id">
          <div class="title">
            <span><i class="el-icon-user"></i>{{ r.username }}</span>
            <em>:</em>
            <span v-if="r.cname" class="reply-cname">@{{ r.cname }}</span>
            <em v-if="r.cname">:</em>
            {{ r.content }}
          </div>
          <reply :pop='r' :commentId='leavemsg.commentId'></reply>
        </section>
      </div>
    </section>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[3, 5]"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Reply from '@/components/message/Reply.vue'
import { queryCommentAll } from '@/api/comment.js'
import { mapMutations } from 'vuex'
import utilTools from '@/plugins/utilTools'
export default {
  name: 'LeaveList',
  components: {
    Reply
  },
  data() {
    return {
      textarea: '',
      leaveList: [],
      visible: false,
      isShow: false,
      pagination: {
        currentPage: 1,
        size: 3,
        total: 0
      }
    }
  },
  mounted() {
    this.initList()
  },
  methods: {
    ...mapMutations({
      setUserinfo: 'setUserinfo'
    }),
    initList() {
      const offsetp = this.pagination.currentPage
      const limitp = this.pagination.size
      queryCommentAll({offsetp, limitp}).then(res => {
        if (!res.code) {
          this.leaveList = res.data.map(item => {
            if (item.replys && item.replys.length > 0) {
              item.replys = item.replys.map(r => {
                r.visible = false
                r.viContent = ''
                return r
              })
            }
            if (item.visible === 0) {
              item.visible = false
              item.viContent = ''
            }
            return item
          })
          this.pagination.total = res.total
          if (res.userinfo) {
            this.setUserinfo(res.userinfo)
            let str = JSON.stringify(res.userinfo)
            sessionStorage.setItem('_mySelf', utilTools.compile(str))
          } else {
            this.setUserinfo(null)
          }
        }
      })
    },
    handleMsg() {
      this.isShow = !this.isShow
    },
    handleSizeChange(val) {
      this.pagination.size = val
      this.initList()
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.initList()
    }
  }
}
</script>

<style lang="scss" scoped>
.leave-list {
  section {
    margin: 10px;
    .title {
      font-size: 14px;
      font-weight: 700;
      > span:first-child {
        color: #21a1ff;
      }
      em {
        color: #787978;
        font-style: normal;
      }
      > .reply-cname {
        color: #ec7600;
      }
    }
    .reply-box {
      background: #eaeaec;
      .reply {
        padding-bottom: 5px;
        border-bottom: 1px solid #999;
      }
      > section:last-child .reply {
        padding-bottom: 0;
        border-bottom: none;
      }
    }
  }
  .block {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
