<template>
<!-- 卡片 -->
   <el-card>
    <!-- header具名是给卡片的 -->
     <bread-crumb slot='header'>
     <!-- title具名 是面包屑组件的具名 -->
       <template slot='title'>
          素材管理
        </template>
     </bread-crumb>
     <!-- el-tabs => el-tab-pane -->
      <el-tabs v-model="activeName" @tab-click="getMaterial">
       <el-tab-pane label="全部素材" name="all">
           <!-- 全部素材 -->
           <div class='img-list'>
              <el-card class='img-item' v-for="item in list" :key="item.id">
               <img :src="item.url" alt="">
               <div class='operate'>
                   <i :style='{color: item.is_collected ? "red" : "#000"}' class='el-icon-star-on'></i>
                   <i class='el-icon-delete-solid'></i>
               </div>
              </el-card>
           </div>
       </el-tab-pane>
       <el-tab-pane label="收藏素材" name="collect">
             <div class='img-list'>
              <el-card class='img-item' v-for="item in list" :key="item.id">
               <img :src="item.url" alt="">
              </el-card>
           </div>
       </el-tab-pane>
  </el-tabs>
   </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选中全部
      list: [] // 定义一个list接收数据
    }
  },
  methods: {
    //   获取素材列表
    getMaterial () {
      // this.activeName === 'collect' 相当于去找收藏的数据
      // 如果不等于collect 相等于去找全部的数据
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect' }
      }).then(result => {
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getMaterial() // 请求数据
  }
}
</script>

<style lang='less' scoped>
.img-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
   .img-item {
       width: 180px;
       height: 180px;
       border-radius: 6px;
       margin:30px;
       position: relative;
       img {
           width:100%;
           height:100%;
       }
       .operate {
           background-color: #f4f5f6;
           position: absolute;
           left:0;
           bottom:0;
           width: 100%;
           height:30px;
           display: flex;
           justify-content: space-around;
           align-items: center;
           i {
               font-size:18px;
           }
       }
   }
}
</style>
