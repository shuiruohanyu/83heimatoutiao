<template>
<!-- 头部最外层放置一个el-row -->
  <el-row class='layout-header' type='flex' align="middle" justify="space-between">
      <!-- 左侧 -->
      <el-col :span="6">
          <i class="el-icon-s-unfold"></i>
          <span class='title'>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="4">
          <!-- 用户头像 -->
          <img class='head-img' :src="userInfo.photo ? userInfo.photo : defaultImg" alt="">

    <!-- 下拉菜单组件  el-dropdown -->
    <!-- command事件 -->
     <el-dropdown trigger="click" @command="commonClick">
         <!-- 匿名插槽  -->
         <span class="el-dropdown-link">
          {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
         </span>
        <!-- 具名插槽 dropdown -->
      <el-dropdown-menu slot="dropdown">
        <!-- command属性会在触发点击时 携带给command事件的方法 -->
        <el-dropdown-item command="account">个人信息</el-dropdown-item>
        <el-dropdown-item command="git">git地址</el-dropdown-item>
        <el-dropdown-item command="lgout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
      </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}, // 个人信息对象
      defaultImg: require('../../assets/img/avatar.jpg') // 转成base64
    }
  },
  methods: {
    // 获取用户个人资料
    getUserInfo () {
      this.$axios({
        url: '/user/profile' }).then(result => {
        this.userInfo = result.data.data // 接收数据对象
      })
    },
    // 公共点击事件
    commonClick (key) {
      if (key === 'account') {
        // 跳转到 账户信息
        this.$router.push('/home/account')
      } else if (key === 'git') {
        // 去项目git地址
        window.location.href = 'https://github.com/shuiruohanyu/83heimatoutiao'
      } else {
        // 退出
        window.localStorage.clear() // 只能清除本项目的所有前端缓存
        this.$router.push('/login') // 跳转到登录页
      }
    }
  },
  // 钩子函数
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
 .layout-header {
     height:50px;
     .el-icon-s-unfold {
         font-size: 22px;
     }
     .title {
         vertical-align: top;
         margin-left: 4px;
     }
     .head-img {
         width:40px;
         height:40px;
         border-radius: 50%;
         vertical-align: middle;
         margin-right:4px;
     }
 }
</style>
