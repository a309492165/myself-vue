<template>
  <div class="look-container">
    <el-timeline>
      <el-timeline-item v-for="(item, idx) in dataList" :timestamp="item.updatedAt.slice(0, 10)" placement="top" :key="idx">
        <el-card>
          <div class="card-box">
            <img :src="item.imgSrc" alt="" width="120px" height="70px">
            <div>
              <h4 @click="jumpBlog(item.id)">{{item.title}}</h4>
              <p>{{item.username}} 发布于 {{item.updatedAt}}</p>
            </div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[3, 5, 10]"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { findLookAll } from '@/api/comment'
export default {
  name: 'Look',
  data () {
    return {
      dataList: [],
      pagination: {
        currentPage: 1,
        size: 3,
        total: 0
      },
      jgp1: require('@/assets/img/bg/1.jpg'),
      jgp2: require('@/assets/img/bg/2.jpg'),
      jgp3: require('@/assets/img/bg/3.jpg')
    }
  },
  mounted () {
    this.initList()
  },
  methods: {
    initList () {
      const offsetp = this.pagination.currentPage
      const limitp = this.pagination.size
      findLookAll({offsetp, limitp}).then(data => {
        this.dataList = data.dataList.map((item, i) => {
          let num = i % 3
          if (num === 0) {
            item.imgSrc = this.jgp1
          } else if (num === 1) {
            item.imgSrc = this.jgp2
          } else if (num === 2) {
            item.imgSrc = this.jgp3
          }
          return item
        })
        this.pagination.total = data.total
      }).catch(e => {
        // console.log(e)
      })
    },
    handleSizeChange(val) {
      this.pagination.size = val
      this.initList()
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.initList()
    },
    jumpBlog(id) {
      const routeUrl = this.$router.resolve({
        path: '/singleblog',
        query: {id}
      })
      window.open(routeUrl.href, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  display: flex;
  justify-content: flex-end;
}
.card-box {
  display: flex;
  img {
    margin-right: 10px;
  }
  h4 {
    margin: 10px 0;
  }
  h4:hover {
    cursor: pointer;
    color: rgb(80, 151, 151);
  }
}
</style>
