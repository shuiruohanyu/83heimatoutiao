<template>
 <div class='home'>
    <el-row style='height:100vh' type='flex' justify="center" align="middle">
      <heima-date></heima-date>
    </el-row>
 </div>
</template>

<script>
// 一级路由下的默认的二级路由
export default {

}
</script>

<style scoped>
  .home {
      background-image: url('../../assets/img/home.jpeg');
      height: 100vh;
      background-size:cover;
  }
</style>
