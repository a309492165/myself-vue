<template>
  <div class="admin-container">
    <el-container>
      <el-header height="40px">
        <h1 class="h1 fl"><i class="el-icon-s-platform"></i>后台管理</h1>
        <el-dropdown @command="handleCommand" placement="bottom">
          <span class="el-dropdown-link">
            Admin<i class="el-icon-s-tools"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="100px">
          <el-menu
            :default-active="routeName"
            class="el-menu-demo"
            mode="vertical"
            @select="handleSelect"
          >
            <el-menu-item index="/admin/blog">博客中心</el-menu-item>
            <el-menu-item index="/admin/msg">留言中心</el-menu-item>
            <el-menu-item index="/admin/user">用户中心</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AdminContent',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      routeName: state => state.routeName
    })
  },
  methods: {
    handleCommand(command) {
      this.$message('click on item ' + command)
    },
    handleSelect(val) {
      this.$router.push({ path: val })
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-container {
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: calc(100% - 20px);
  }
}
.el-header {
  background: #3c8dbc;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-icon-s-platform {
    margin-right: 10px;
  }
  .el-dropdown {
    color: #fff;
    font-size: 16px;
    margin-right: 10px;
  }
}
.el-aside {
  text-align: center;
}
</style>
