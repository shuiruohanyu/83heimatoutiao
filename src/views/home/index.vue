<template>
<!-- 先定义一个大容器 -->
  <el-container>
    <!-- 先放置一个左侧 -->
    <el-aside>
      <!-- 左侧导航组件 -->
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧大容器 -->
    <el-container>
      <!-- 头部 -->
      <el-header>头部</el-header>
      <!-- 中部区域 -->
      <el-main>
        <!-- 二级路由容器 -->
         <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>

<style>

</style>
