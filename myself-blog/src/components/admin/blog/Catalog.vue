<template>
  <div class="catalog">
    <add-title-model :text="'目录'" :isShowPop="catalog.add.show"></add-title-model>
    <div class="catalog-list-content">
      <p
        :class="{ active: catalog.list.active == idx }"
        @click="handleChangeCatalog(idx)"
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
import AddTitleModel from './AddTitleModel'
import DeletePop from '@/components/pop/DeletePop.vue'
import EditOneInput from '@/components/pop/EditOneInput.vue'
import { queryCatalogAll, addCatalog, deleteCatalog, updateCatalog } from '@/api/blog'
import util from '@/utils/util'
import { mapMutations } from 'vuex'
export default {
  name: 'Catalog',
  components: {
    AddTitleModel,
    DeletePop,
    EditOneInput
  },
  data() {
    return {
      userInfo: {},
      currentIdx: null,
      catalog: {
        add: {
          show: true
        },
        list: {
          active: 0,
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
    let userStr = util.encompile(sessionStorage.getItem('_mySelf'))
    this.userInfo = JSON.parse(userStr)
    this.queryAll()
  },
  methods: {
    ...mapMutations({
      setCatalogId: 'adminBlog/setCatalogId'
    }),
    queryAll () {
      queryCatalogAll({ uid: this.userInfo.id }).then(data => {
        this.catalog.list.content = data
        if (data.length > 0) {
          this.setCatalogId(data[0].id)
        }
      })
    },
    // 目录条功能集合
    handleAdd (text) {
      addCatalog({ uid: this.userInfo.id, title: text }).then(
        data => {
          this.$tip.success(data)
          this.catalog.add.show = false
          this.queryAll()
        }
      ).catch(e => {
        // console.log(e)
      })
    },
    resetCatalogAddShow () {
      this.catalog.add.show = true
    },
    handleChangeCatalog (idx) {
      this.catalog.list.active = idx
      this.setCatalogId(this.catalog.list.content[idx].id)
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
      deleteCatalog({ id }).then(data => {
        this.$tip.success(data)
        this.queryAll()
        this.deleteDialogVisible = false
      }).catch(e => {
        // console.log(e)
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
      updateCatalog({ id, title: content }).then(data => {
        this.$tip.success(data)
        this.queryAll()
        this.editDialogVisible = false
        // this.catalog.list.content[this.currentIdx].title = content
      }).catch(e => {
        // console.log(e)
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
