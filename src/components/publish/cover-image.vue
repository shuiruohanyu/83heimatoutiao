<template>
    <div class='cover-image'>
        <!-- v-for生成 封面图片 -->
        <div @click="openLayer(index)" class='cover-item' v-for="(item,index) in images" :key="index">
            <img :src="item ? item : defaultImg" alt="">
        </div>
        <!-- 弹层组件 -->
        <el-dialog @close="dialogVisible=false" :visible="dialogVisible">
           <!-- 监听谁的事件就在谁的标签上写监听 -->
            <select-image @selectOneImg="receiveImg"></select-image>
        </el-dialog>
    </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false, // 是否显示弹层
      selectIndex: -1
    }
  },
  methods: {
    //   打开层
    openLayer (index) {
      this.dialogVisible = true
      this.selectIndex = index // 将当前点击的图片索引值给data中一个属性
    },
    // 接收子组件传过来的值
    receiveImg (url) {
      this.$emit('selectImg', url, this.selectIndex) // 自定义事件 若干参数
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image {
    display: flex;
    margin:10px 0;
    margin-left:100px;
    .cover-item {
        border: 1px solid #ccc;
        padding: 10px;
        width: 220px;
        height:220px;
        img {
            width:100%;
            height: 100%;
        }
    }
}
</style>
