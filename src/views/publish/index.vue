<template>
   <el-card>
       <bread-crumb slot='header'>
          <template slot='title'>发布文章</template>
       </bread-crumb>
       <!-- 表单 -->
       <el-form ref="publishForm" :model="formData" :rules="publishRules"  style='margin-left:100px' label-width="100px">
            <el-form-item  prop="title" label="标题">
                <el-input v-model="formData.title" style='width:400px'></el-input>
            </el-form-item>
            <el-form-item prop="content" label="内容">
                <quill-editor v-model="formData.content"  style='height:300px'></quill-editor>
            </el-form-item>
            <el-form-item label="封面"  prop="cover" style='margin-top:120px'>
                <el-radio-group @change="changeType" v-model="formData.cover.type">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道" prop="channel_id">
                <el-select v-model="formData.channel_id">
                    <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click="publish(false)">发布文章</el-button>
                <el-button @click="publish(true)">存入草稿</el-button>
            </el-form-item>

       </el-form>
   </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      // 表单数据对象
      formData: {
        title: '', // 标题
        content: '', // 内容
        channel_id: null, // 频道id
        cover: {
          type: 0,
          images: []
        } // 封面类型 -1:自动，0-无图，1-1张，3-3张
      },
      publishRules: {
        title: [{ required: true, message: '标题不能为空' }, {
          // 最小长度 min  最大长度max
          min: 5, max: 30, message: '标题长度要控制在5到30个字符之间'
        }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      } //  发布规则
    }
  },
  methods: {
    // 类型改变事件
    changeType () {
      // 可以获取到最新的type
      // 根据type进行images的长度变化
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = [''] // images长度1
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', ''] // images长度1
      } else {
        this.formData.cover.images = []
      }
    },
    //   获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取channels频道
      })
    },
    // 根据文章id获取文章详情
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
      })
    },
    // 发布文章 validate
    publish (draft) {
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          let { articleId } = this.$route.params // 有 articleId就是编辑 没articleId就是新增
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft },
            data: this.formData
          }).then(() => {
            // 发布成功了 => 回到内容列表
            this.$router.push('/home/articles')
          })

          // 原始代码
          // if (articleId) {
          //   // 修改
          //   this.$axios({
          //     url: `/articles/${articleId}`,
          //     params: { draft }, // draft为true时 是草稿 为false时 是正式内容
          //     method: 'put',
          //     data: this.formData
          //   }).then(result => {
          //     // 发布成功了 => 回到内容列表
          //     this.$router.push('/home/articles')
          //   })
          // } else {
          //   this.$axios({
          //     url: '/articles',
          //     method: 'post',
          //     params: { draft }, // draft为true时 是草稿 为false时 是正式内容
          //     data: this.formData
          //   }).then(() => {
          //   // 发布成功了 => 回到内容列表
          //     this.$router.push('/home/articles')
          //   })
          // }
        }
      })
    }
  },
  created () {
    this.getChannels() // 获取频道
    // 获取id
    let { articleId } = this.$route.params // 有 articleId就是编辑 没articleId就是新增
    articleId && this.getArticleById(articleId) // 如果articleId存在才执行后界面的逻辑
    // if (articleId) {
    //   this.getArticleById(articleId)
    // }
  }
}
</script>

<style>

</style>
