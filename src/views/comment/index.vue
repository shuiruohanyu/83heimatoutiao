<template>
   <el-card>
       <!-- 面包屑组件 -->
       <!-- slot=> header 是给el-card的插槽 -->
        <bread-crumb slot='header'>
         <!-- slot => title是给面包屑的插槽 -->
            <template slot='title'>评论列表</template>
        </bread-crumb>
        <!-- el-table 表格 data属性是一个对象数组-->
        <el-table :data="list">
            <!-- el-table-column 列 属性 prop => 键名 => 字段名 label => 表头 -->
            <el-table-column width="600px"  label="标题" prop="title"></el-table-column>
            <el-table-column :formatter="stateFormatter" align="center" label="评论状态" prop="comment_status"></el-table-column>
            <el-table-column align="center" label="总评论数" prop="total_comment_count" ></el-table-column>
            <el-table-column align="center" label="粉丝评论数" prop="fans_comment_count" ></el-table-column>
            <el-table-column align="center" label="操作"  >
              <!-- 作用域插槽 => 接收 el-table-column row/column/$index/store -->
               <template slot-scope="obj">
                <!-- 自定义内容 获取其他列的数据 -->
                 <el-button size="small" type='text'>修改</el-button>
                 <el-button @click="closeOrOpen(obj.row)" size="small" type='text'>
                   {{
                     obj.row.comment_status ? "关闭评论" : '打开评论'
                   }}</el-button>
               </template>
            </el-table-column>

        </el-table>
   </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    //   获取评论列表
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' } // params 是路径参数也就是 query参数
      }).then(result => {
        this.list = result.data.results // 把返回的数据赋值给list
      })
    },
    // filter => return
    stateFormatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    // 打开或者关闭  row 当前行数据
    closeOrOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开' // 得到打开或者关闭
      this.$confirm(`您确定要${mess}评论?`).then(() => {
        // 确定调用接口
        this.$axios({
          url: 'comments/status', // 地址
          method: 'put',
          params: { article_id: row.id }, // 路径参数
          data: { allow_comment: !row.comment_status } // body参数  调用状态和当前状态是反着的 所以取反
        }).then(() => {
          // 成功之后一定会进入then
          this.getComment() // 重新拉取数据
        })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
