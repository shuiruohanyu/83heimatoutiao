<template>
    <div class='cover-image'>
        <!-- v-for生成 封面图片 -->
        <div class='cover-item' v-for="(item,index) in images" :key="index">
            <img :src="item ? item : defaultImg" alt="">
        </div>
    </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png')
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
    }
}
</style>
