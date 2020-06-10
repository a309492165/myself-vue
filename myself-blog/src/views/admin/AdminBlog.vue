<template>
  <div class="admin-blog-container">
    <catalog></catalog>
    <add-article></add-article>
    <div>33</div>
  </div>
</template>

<script>
import Catalog from '@/components/admin/blog/Catalog.vue'
import AddArticle from '@/components/admin/blog/AddArticle.vue'
import EditBlog from '@/components/admin/blog/EditBlog.vue'
export default {
  name: 'AdminBlog',
  components: {
    Catalog,
    AddArticle,
    EditBlog
  },
  data() {
    return {
      catalog: {
        add: {
          show: false,
          text: ''
        },
        list: {
          active: 0,
          content: [
            { title: '111111' }
          ]
        }
      },
      deleteDialogVisible: false
    }
  },
  methods: {
    // 目录条功能集合
    handleAddCatalog() {
      console.log(1111)
    },
    handleChangeCatalog(i) {
      this.catalog.list.active = i
    },
    handleDelCatalog() {
      this.deleteDialogVisible = true
    },
    cancelDelPop() {
      this.deleteDialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-blog-container {
  width: 100%;
  height: 100%;
  display: flex;
  > div {
    width: 20%;
    padding: 6px;
    border: 1px solid #ccc;
  }
  > div:nth-child(1) {
    background: #404040;
  }
  > div:nth-child(3) {
    width: 60%;
  }
}
// 目录
.catalog {
  overflow-x: hidden;
  color: #fff;
  .catalog-add-content {
    > .el-button {
      width: 100%;
    }
    p {
      margin: 6px 0;
      .el-button {
        float: right;
        margin-left: 10px;
      }
    }
  }
  .catalog-list-content {
    > p {
      margin-top: 10px;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
    }
    > p.active {
      border-left: 6px solid #ec7259;
      background: rgba(255, 255, 255, 0.3);
    }
  }
}
// 弹出窗效果
.pop-box {
  p {
    cursor: pointer;
    text-align: center;
  }
  p:hover {
    background: rgba(0, 0, 0, 0.3);
  }
}
</style>
