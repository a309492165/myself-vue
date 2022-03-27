<template>
  <div class="editor-box">
    <div class="editor-box-tool">
      <el-button type="info" @click="clearEditor">清空</el-button>
      <el-button type="success" @click="saveArticleContent(articleId, true)">提交</el-button>
    </div>
    <editor v-model="content" :isClear="isClear" @change="change"></editor>
  </div>
</template>

<script>
import Editor from './Editor'
import { queryArticleContent, updateArticleContent } from '@/api/blog'
import { mapState } from 'vuex'
export default {
  components: { Editor },
  computed: {
    ...mapState({
      articleId: state => state.adminBlog.articleId
    })
  },
  watch: {
    articleId (val, oldVal) {
      if (this.isChange) {
        // this.saveArticleContent(oldVal, false)
      }
      this.queryContent()
    }
  },
  data() {
    return {
      isClear: false,
      isChange: false,
      content: ''
    }
  },
  mounted () {
    if (this.articleId !== null) {
      this.queryContent()
    }
  },
  methods: {
    queryContent () {
      queryArticleContent({ articleId: this.articleId }).then(data => {
        if (data.length > 0) {
          this.content = data[0].content
        } else {
          this.content = ''
        }
      })
    },
    change (val) {
      console.log(this.content)
      // this.content = val
      this.isClear = false
      this.isChange = true
    },
    clearEditor () {
      this.isClear = true
      this.content = ''
    },
    saveArticleContent (articleId, isTip) {
      updateArticleContent({ articleId, content: this.content }).then(data => {
        if (isTip) {
          this.$tip.success(data)
        }
        this.isChange = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-box-tool {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
}
</style>
