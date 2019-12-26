<template>
<!-- 先定义一个大容器 -->
  <el-container>
    <!-- 先放置一个左侧 -->
    <el-aside  :style="{width: collapse ? '60px' : '200px'}" style="transition: all 0.5s;overflow:hidden;background-color:#323745">
      <!-- 左侧导航组件 -->
      <layout-aside :collapse="collapse"></layout-aside>
    </el-aside>
    <!-- 右侧大容器 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <!-- 头部组件 -->
        <layout-header></layout-header>
      </el-header>
      <!-- 中部区域 -->
      <el-main style="padding:0">
        <!-- 二级路由容器 -->
         <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '../../utils/eventBus'

export default {
  data () {
    return {
      collapse: false // 默认是展开的
    }
  },
  created () {
    eventBus.$on('changeCollapse', () => {
      this.collapse = !this.collapse
    })
  }
}
</script>

<style>

</style>
