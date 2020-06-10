<template>
  <div class="add-title-model">
    <el-button type="primary" @click="openAdd"
    >新增{{text}}</el-button
    >
    <div v-show="catalog.show">
    <p>{{text}}标题</p>
    <el-input
        v-model="catalog.text"
        :placeholder="`请输入${text}标题`"
        clearable
    ></el-input>
    <p class="clearfix">
        <el-button type="success" size="mini" @click="handleAdd"
        >提交</el-button
        >
        <el-button type="info" size="mini" @click="catalog.show = false"
        >取消</el-button
        >
    </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddTitleModel',
  props: {
    text: {
      type: String,
      default: ''
    },
    isShowPop: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    isShowPop (val, oldVal) {
      if (!val) {
        this.catalog.text = ''
        this.catalog.show = false
      }
    }
  },
  data() {
    return {
      catalog: {
        show: false,
        text: ''
      }
    }
  },
  methods: {
    openAdd () {
      this.catalog.show = true
      this.$parent.resetCatalogAddShow()
    },
    handleAdd () {
      this.$parent.handleAdd(this.catalog.text)
    }
  }
}
</script>

<style lang="scss" scoped>
// 目录
.add-title-model {
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
</style>
