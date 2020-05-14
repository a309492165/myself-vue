<template>
  <!-- 编辑弹窗 -->
  <el-dialog
    :title="dialogObj.title"
    :visible.sync="editDialogVisible"
    width="600px"
    :before-close="cancelEditPop"
  >
    <div class="dialog-box">
      <el-input v-model="dialogObj.content"></el-input>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelEditPop">取 消</el-button>
      <el-button @click="confirmEdit" type="primary">{{ tabContent }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    editDialogVisible: {
      type: Boolean,
      default: false
    },
    dialogObj: {
      type: Object,
      default: () => {
        return { title: '编辑', content: '' }
      }
    },
    tabContent: {
      type: String,
      default: '修改'
    }
  },
  methods: {
    cancelEditPop() {
      this.$emit('cancelEditPop', false)
    },
    confirmEdit() {
      this.$emit('confirmEdit', this.dialogObj.content)
    }
  }
}
</script>

<style lang="scss" scoped>
// 弹窗
/deep/ .el-dialog__wrapper {
  .el-dialog {
    background-size: 100% 100%;
    .el-dialog__title,
    .el-dialog__headerbtn .el-dialog__close {
      color: #111;
    }
  }
  .dialog-box {
    color: #111;
    > input {
      width: 100%;
      padding-left: 10px;
    }
    p {
      padding: 0 20px;
    }
    input {
      padding: 10px;
      border-radius: 10px;
      outline: none;
      border: 1px solid #111;
      background: #043731;
      color: #111;
      border-color: #018381;
      font-size: 12px;
    }
    i {
      color: #00afaf;
      font-style: normal;
      text-decoration: underline;
      cursor: pointer;
      display: block;
      margin-top: 20px;
    }
    i:hover {
      color: #0ff;
    }
    > div {
      padding: 10px;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        i {
          width: 48px;
          margin-top: 0;
          display: inline-block;
        }
        input {
          width: 43%;
        }
      }
    }
  }
  .btn-right {
    float: left;
  }
}
</style>
