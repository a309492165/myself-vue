<template>
  <div id="editblog-container">
    <div class="head">
      <span @click="handleBackList"
        ><i class="el-icon-arrow-left"></i>返回</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditBlog',
  data() {
    return {}
  },
  methods: {
    handleBackList() {
      this.$parent.handleEditIs()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
