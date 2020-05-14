<template>
  <div id="admin-blog-container">
    <div v-if="!editIs" class="admin-blog-list">
      <div class="head">
        <span @click="handleAdd"><i class="el-icon-edit"></i>新增</span>
        <span class="login-colspan-middle">|</span>
        <span @click="handleDelete"><i class="el-icon-delete"></i>删除</span>
      </div>
      <el-table
        :data="
          tableData.filter(
            data =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        stripe
        style="width: 100%"
        height="500"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="Date" prop="date" sortable> </el-table-column>
        <el-table-column label="Name" prop="name"> </el-table-column>
        <el-table-column align="right" width="200px">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <edit-blog v-if="editIs" ref="editBlog"></edit-blog>
  </div>
</template>

<script>
import EditBlog from '@/components/admin/EditBlog.vue'
export default {
  name: 'AdminBlog',
  components: {
    EditBlog
  },
  data() {
    return {
      editIs: false,
      editId: null,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '李小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      search: ''
    }
  },
  methods: {
    handleAdd() {},
    handleEdit(index, row) {
      this.editIs = true
      console.log(index, row)
    },
    handleEditIs() {
      this.editIs = false
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleSelectionChange(val) {}
  }
}
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  justify-content: flex-end;
  span {
    color: #ec7600;
    cursor: pointer;
  }
  span:hover {
    color: #21a1ff;
    text-decoration: underline;
  }
  .login-colspan-middle {
    margin: 0 4px;
  }
}
</style>
