<template>
  <div class="catalog">
    <div class="catalog-add-content">
      <el-button type="primary" @click="catalog.add.show = true"
        >新增目录</el-button
      >
      <div v-show="catalog.add.show">
        <p>目录标题</p>
        <el-input
          v-model="catalog.add.text"
          placeholder="请输入目录标题"
          clearable
        ></el-input>
        <p class="clearfix">
          <el-button type="success" size="mini" @click="handleAddCatalog"
            >提交</el-button
          >
          <el-button type="info" size="mini" @click="catalog.add.show = false"
            >取消</el-button
          >
        </p>
      </div>
    </div>
    <div class="catalog-list-content">
      <p
        :class="{ active: catalog.list.active == item.id }"
        @click="handleChangeCatalog(item.id)"
        v-for="(item, idx) in catalog.list.content"
        :key="idx"
      >
        <span>{{ item.title }}</span>
        <el-popover class="pop" placement="left" width="50" trigger="hover">
          <div class="pop-box">
            <p @click="openEditCatalog(idx, item.title)">
              <i class="el-icon-edit"></i>编辑
            </p>
            <p @click="openDelCatalog(idx)">
              <i class="el-icon-delete"></i>删除
            </p>
          </div>
          <i slot="reference" class="el-icon-s-tools"></i>
        </el-popover>
      </p>
    </div>
    <delete-pop
      :deleteDialogVisible="deleteDialogVisible"
      @cancelDelPop="cancelDelPop"
      @confirmDel="confirmDel"
    ></delete-pop>
    <edit-one-input
      :editDialogVisible="editDialogVisible"
      :dialogObj="editDialog"
      @cancelEditPop="cancelEditPop"
      @confirmEdit="confirmEdit"
    ></edit-one-input>
  </div>
</template>

<script>
import DeletePop from '@/components/pop/DeletePop.vue'
import EditOneInput from '@/components/pop/EditOneInput.vue'
import { queryCatalogAll, addCatalog, deleteCatalog, updateCatalog } from '@/api/blog'
import utilTools from '@/plugins/utilTools'
import { tipsMsg } from '@/plugins/el'
export default {
  name: 'Catalog',
  components: {
    DeletePop,
    EditOneInput
  },
  data() {
    return {
      userInfo: {},
      currentIdx: null,
      catalog: {
        add: {
          show: false,
          text: ''
        },
        list: {
          active: 1,
          content: []
        }
      },
      deleteDialogVisible: false,
      editDialogVisible: false,
      editDialog: {
        content: ''
      }
    }
  },
  mounted() {
    let userStr = utilTools.encompile(sessionStorage.getItem('_mySelf'))
    this.userInfo = JSON.parse(userStr)
    this.queryAll()
  },
  methods: {
    queryAll() {
      queryCatalogAll({ uid: this.userInfo.id }).then(res => {
        if (!res.code) {
          this.catalog.list.content = res.data
        }
      })
    },
    // 目录条功能集合
    handleAddCatalog() {
      addCatalog({ uid: this.userInfo.id, title: this.catalog.add.text }).then(
        res => {
          if (!res.code) {
            this.catalog.add.text = ''
            this.catalog.add.show = false
            this.queryAll()
          }
          tipsMsg(res)
        }
      )
    },
    handleChangeCatalog(i) {
      this.catalog.list.active = i
    },
    // 删除
    openDelCatalog(i) {
      this.currentIdx = i
      this.deleteDialogVisible = true
    },
    cancelDelPop() {
      this.deleteDialogVisible = false
    },
    confirmDel() {
      let id = this.catalog.list.content[this.currentIdx].id
      deleteCatalog({ id }).then(res => {
        if (!res.code) {
          this.queryAll()
          this.deleteDialogVisible = false
        }
        tipsMsg(res)
      })
    },
    // 编辑
    openEditCatalog(i, content) {
      this.currentIdx = i
      this.editDialog.content = content
      this.editDialogVisible = true
    },
    cancelEditPop() {
      this.editDialogVisible = false
    },
    confirmEdit(content) {
      let id = this.catalog.list.content[this.currentIdx].id
      updateCatalog({ id, title: content }).then(res => {
        if (!res.code) {
          this.queryAll()
          this.editDialogVisible = false
          // this.catalog.list.content[this.currentIdx].title = content
        }
        tipsMsg(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
      span {
        word-break: break-all;
      }
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
