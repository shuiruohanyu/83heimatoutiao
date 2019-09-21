<template>
   <el-card>
       <!-- 面包屑组件 -->
       <!-- slot=> header 是给el-card的插槽 -->
        <bread-crumb slot='header'>
         <!-- slot => title是给面包屑的插槽 -->
            <template slot='title'>评论列表</template>
        </bread-crumb>
   </el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
