<template>
  <el-card>
      <bread-crumb slot='header'>
        <template slot='title'> 异步应用</template>
      </bread-crumb>
      <p>{{count}}</p>
      <el-button type="primary" @click="updateCountPromise">更新数据</el-button>
      <el-button type="success" @click="newUpdate">更新数据</el-button>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      count: 1
    }
  },
  methods: {
    //   async await
    async newUpdate () {
      let result = await this.updateAxios() // 造成强制等待
      this.count = result
    },
    //   传统promise更新
    updateCountPromise () {
      this.updateAxios().then(result => {
        this.count = result
      })
    },
    updateAxios () {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve(2)
        }, 3000)
      })
    }
  }
}
</script>

<style>

</style>
