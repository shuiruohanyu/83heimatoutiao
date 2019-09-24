<template>
    <el-card>
        <bread-crumb slot='header'>
          <template slot='title'>账户信息</template>
        </bread-crumb>
        <!-- 表单 -->
        <el-form style='margin-left:60px' label-width="100px">
            <el-form-item label="用户名">
                <el-input v-model="formData.name" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input v-model="formData.intro" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="formData.email" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <!-- 手机号不能修改 -->
                <el-input disabled v-model="formData.mobile" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary'>保存信息</el-button>
            </el-form-item>
        </el-form>
        <img class='head-img' :src="formData.photo ? formData.photo : defaultImg " alt="">
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      defaultImg: require('../../assets/img/default.gif'),
      formData: {

      }
    }
  },
  methods: {
    //   获取用户的个人信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style scoped>
  .head-img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      position: absolute;
      top:100px;
      right:400px;
  }
</style>
