<template>
  <div class="single-blog">
    <h1>{{this.title}}</h1>
    <div ref="editor" class="text"></div>
    <div class=""></div>
  </div>
</template>

<script>
import { findArticleOne } from '@/api/comment'
import E from 'wangeditor'
export default {
  name: 'SingleBlog',
  data () {
    return {
      editor: null,
      title: '单页面',
      content: ''
    }
  },
  mounted () {
    this.query()
  },
  methods: {
    query () {
      let id = this.$route.query.id
      findArticleOne({ articleId: id }).then(data => {
        console.log(data)
        this.title = data[0].title
        this.content = data[0].content
        this.seteditor()
      })
    },
    seteditor () {
      this.editor = new E(this.$refs.editor)
      // 创建富文本编辑器
      this.editor.create()
      this.editor.$textElem.attr('contenteditable', false)
      this.editor.txt.html(this.content)
    }
  }
}
</script>

<style lang="scss" scoped>
.single-blog {
  width: 800px;
  margin: 0 auto;
  height: auto;
  h1 {
    padding: 20px 0;
  }
  .text {
    border: none;
    height: auto;
  }
}
.w-e-toolbar {
  display: none;
}
</style>
