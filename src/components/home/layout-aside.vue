<template>
  <div class='layout-aside'>
     <div class='title'>
         <img src="../../assets/img/logo_admin.png" alt="">
     </div>
     <el-menu
      style="width:201px"
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#ffd04b">
      <!-- 首页 -->
       <el-menu-item index="4">
           <!-- 图标 -->
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 内容管理 二级菜单 el-submenu => el-menu-item-->
      <el-submenu index="1">
          <!-- el-submenu 插槽 title =>  一级显示内容 -->
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>内容管理</span>
        </template>
          <!-- 二级内容 -->
          <el-menu-item index="1-1">发布文章</el-menu-item>
          <el-menu-item index="1-2">内容列表</el-menu-item>
          <el-menu-item index="1-3">评论列表</el-menu-item>
          <el-menu-item index="1-3">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu>
          <!-- title插槽时submenu 中显示的一级内容 -->
          <template slot='title'>
              <i class='el-icon-s-custom'></i>
              <span>粉丝管理</span>
          </template>
          <!-- 二级内容 -->
         <el-menu-item>图文数据</el-menu-item>
         <el-menu-item>粉丝概况</el-menu-item>
         <el-menu-item>粉丝画像</el-menu-item>
         <el-menu-item>粉丝列表</el-menu-item>

      </el-submenu>
      <el-menu-item index="3" >
        <i class="el-icon-s-tools"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.layout-aside {
    background-color: #323745;
    height: 100vh;
    width:200px;
    .title {
        text-align: center;
        background-color: #2e2f32;
        padding:15px 0;
        img{
            height:30px;
        }
    }
}
</style>
