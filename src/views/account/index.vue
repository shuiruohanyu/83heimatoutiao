<template>
    <el-card v-loading="loading">
        <bread-crumb slot='header'>
          <template slot='title'>账户信息</template>
        </bread-crumb>
        <!-- 表单 -->
        <el-form ref="accountForm" :rules="accountRules" :model="formData" style='margin-left:60px' label-width="100px">
            <el-form-item prop="name" label="用户名">
                <el-input v-model="formData.name" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input v-model="formData.intro" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
                <el-input v-model="formData.email" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <!-- 手机号不能修改 -->
                <el-input disabled v-model="formData.mobile" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="saveUser" type='primary'>保存信息</el-button>
            </el-form-item>
        </el-form>
        <!--上传  http-request-->
         <el-upload action="" :show-file-list="false" :http-request="uploadImg">
          <img class='head-img' :src="formData.photo ? formData.photo : defaultImg " alt="">
         </el-upload>
    </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus' // 实际上Vue实例
export default {
  data () {
    return {
      loading: false,
      defaultImg: require('../../assets/img/default.gif'),
      formData: {

      },
      accountRules: {
        name: [
          { required: true, message: '用户名不能为空' },
          { min: 1, max: 7, message: '用户名要控制在1到7个字符' }
        ],
        email: [{ required: true, message: '邮箱不能为空' }, { pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/, message: '邮箱格式不正确' }]
      } // 账户规则
    }
  },
  methods: {
    uploadImg (params) {
      this.loading = true

      let data = new FormData()
      data.append('photo', params.file) // 取出文件放到参数中
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(result => {
        eventBus.$emit('updateUserInfo') // 抛出一个事件
        this.formData.photo = result.data.photo // 成功上传的头像更新给当前的页面数据
        this.loading = false
      })
    },
    //   保存用户的个人信息
    saveUser () {
      this.$refs.accountForm.validate((isOK) => {
        if (isOK) {
          // 调用修改用户资料的接口
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(() => {
            // 提示别的组件 要更新数据
            eventBus.$emit('updateUserInfo') // 抛出一个事件
            // 成功了 提示消息
            this.$message({ message: '保存成功', type: 'success' })
          })
        }
      })
    },
    //   获取用户的个人信息
    getUserInfo () {
      this.loading = true
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
        this.loading = false
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
      top:120px;
      right:400px;
  }
</style>
