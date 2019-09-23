<template>
    <el-card>
        <!--面包屑 -->
        <bread-crumb slot='header'>
           <template slot='title'>
               内容列表
           </template>
        </bread-crumb>
        {{formData}}
        <!-- 表单 -->
        <el-form style="margin-left:50px">
            <!-- 文章状态 -->
            <el-form-item label="文章状态:">
              <!-- v-model来源于 el-radio中的label属性 -->
                 <el-radio-group @change="changeCondition" v-model="formData.status">
                   <el-radio :label="5">全部</el-radio>
                   <el-radio :label="0">草稿</el-radio>
                   <el-radio :label="1">待审核</el-radio>
                   <el-radio :label="2">审核通过</el-radio>
                   <el-radio :label="3">审核失败</el-radio>

            </el-radio-group>
            </el-form-item>
            <el-form-item label="频道列表:">
                <!-- 频道列表 -->
                <el-select @change="changeCondition" v-model="formData.channel_id">
                  <!-- 循环生成el-option -->
                  <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name">

                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间选择:">
              <!-- value-format 指定绑定的值的格式 -->
                 <el-date-picker
                 @change="changeCondition"
                   v-model="formData.date"
                   type="daterange"
                   value-format="yyyy-MM-dd"
                   start-placeholder="开始日期"
                   end-placeholder="结束日期">
          </el-date-picker>
            </el-form-item>
        </el-form>
        <!-- 主体内容 -->
     <div class='total'>共找到55091条符合条件的内容</div>
     <div class='article-item' v-for="(item,index) in list" :key="index">
         <!-- 布局 -->
         <!-- 左侧 -->
        <div class='left'>
            <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
            <div class='info'>
                <span class='title'>{{item.title}}</span>
                <!--插值表达式 使用过滤器 -->
                <el-tag :type="item.status | statusType" class='status'>{{item.status | statusText }}</el-tag>
                <span class='date'>{{item.pubdate}}</span>
            </div>
        </div>
        <!-- 右侧 -->
        <div class='right'>
            <span><i class="el-icon-edit"></i>修改</span>
            <span><i class="el-icon-delete"></i>删除</span>
        </div>
     </div>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5, // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
        channel_id: null, // 频道id
        date: []
      },
      list: [],
      channels: [], // 定义一个频道数组
      defaultImg: require('../../assets/img/default.gif') // 将图片地址转成base64
    }
  },
  methods: {
    // 状态变化事件
    changeCondition () {
      // 因为值改变时 formdata已经是最新的值 所以直接可以用formData的值请求
      // 组装请求参数
      let params = {
        status: this.formData.status === 5 ? null : this.formData.status, // 状态  如果为5时，就是全部，但是接口要求全部不传内容 null就相当于什么都没传
        channel_id: this.formData.channel_id, // 频道id
        begin_pubdate: this.formData.date.length ? this.formData.date[0] : null,
        end_pubdate: this.formData.date.length > 1 ? this.formData.date[1] : null // 结束时间
      }

      this.getArticles(params)
    },
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results // 获取文章列表
      })
    },
    // 获取频道列表
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取channels
      })
    }
  },
  created () {
    this.getChannels() // 获取频道
    this.getArticles() // 获取文章
  },
  filters: {
    //   定义一个过滤器 处理显示文本
    // 过滤器的第一个参数 永远是前面传过来的值
    // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    // 处理状态的显示样式
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'danger'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.total {
    border-bottom: 1px dashed #ccc;
    height:50px;
    line-height: 50px;
}
.article-item {
    display: flex;
    justify-content: space-between;
    padding: 20px 10px;
    border-bottom: 1px solid  #f2f3f5;
    .left {
        display: flex;
        img {
            width: 180px;
            height:100px;
            border-radius: 4px;
        }
        .info {
            height: 100px;
            display: flex;
            flex-direction: column;
            margin-left:10px;
            justify-content: space-around;
            .date {
                color:#999;
                font-size:12px;
            }
            .title {
                font-size:14px;
            }
            .status {
                width: 60px;
                text-align: center
            }
        }
    }
    .right {
        font-size: 12px;
        span {
            margin-right:8px;
        }
    }
}
</style>
