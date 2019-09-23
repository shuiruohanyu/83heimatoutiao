<template>
  <!-- 卡片 -->
  <el-card v-loading="loading">
    <!-- header具名是给卡片的 -->
    <bread-crumb slot="header">
      <!-- title具名 是面包屑组件的具名 -->
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- http-request 自定义上传 -->
    <el-upload :show-file-list="false" :http-request="uploadImg" action="" class='too-difficult'>
        <el-button type='primary'>我太难了(上传)</el-button>
    </el-upload>
    <!-- el-tabs => el-tab-pane -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <!-- 全部素材 -->
        <div class="img-list">
          <el-card class="img-item" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <div class="operate">
              <!-- 收藏和取消收藏 -->
              <i @click="collectOrCancel(item)" :style="{color: item.is_collected ? 'red' : '#000'}" class="el-icon-star-on"></i>
              <!-- 删除 传入id -->
              <i @click="delImg(item.id)" class="el-icon-delete-solid"></i>
            </div>
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination @current-change="changePage" background layout="prev, pager, next" :total="page.total"
           :current-page="page.currentPage"
           :page-size="page.pageSize"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <el-card class="img-item" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
         <el-row type="flex" justify="center">
          <el-pagination @current-change="changePage" background layout="prev, pager, next" :total="page.total"
           :current-page="page.currentPage"
           :page-size="page.pageSize"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选中全部
      list: [], // 定义一个list接收数据
      //   分页信息
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      loading: false
    }
  },
  methods: {
    // 取消或者收藏
    collectOrCancel (item) {
      let mess = item.is_collected ? '取消' : ''
      this.$confirm(`您确定要${mess}收藏该图片?`).then(() => {
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'put',
          data: { collect: !item.is_collected } // 取反 收藏和取消收藏和当前的状态是反着的
        }).then(() => {
          // 收藏或者取消收藏成功  重新拉取数据
          this.getMaterial()
        })
      })
    },
    // 删除图片
    delImg (id) {
      this.$confirm('您确定要删除该图片吗').then(() => {
        // 如果点击了确定
        this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    //   上传方法
    uploadImg (params) {
      const data = new FormData() // 声明一个新的表单
      data.append('image', params.file)
      // 上传文件
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(() => {
        this.getMaterial()
      })
    },
    //   当页码改变时 会传入一个参数
    changePage (newPage) {
      this.page.currentPage = newPage // 将最新页码赋值给currentPage
      this.getMaterial() // 获取最新数据
    },
    // 切换页签方法
    changeTab () {
      // 首先要把页码归1
      this.page.currentPage = 1
      this.getMaterial()
    },
    //   获取素材列表
    getMaterial () {
      this.loading = true
      // this.activeName === 'collect' 相当于去找收藏的数据
      // 如果不等于collect 相等于去找全部的数据
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 赋值总数  每次总条数都会重新赋值
        this.loading = false
      })
    }
  },
  created () {
    this.getMaterial() // 请求数据
  }
}
</script>

<style lang='less' scoped>
.too-difficult {
    position: absolute;
    right:20px;
    margin-top:-10px;
}
.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .img-item {
    width: 180px;
    height: 180px;
    border-radius: 6px;
    margin: 30px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      background-color: #f4f5f6;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      i {
        font-size: 18px;
      }
    }
  }
}
</style>
