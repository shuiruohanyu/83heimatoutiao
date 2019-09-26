<template>
  <div class='date'>
    <div :style="hourStyle" class='hour'></div>
    <div :style="minStyle" class='min'></div>
    <div :style="secondStyle" class='second'></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hour: 12,
      min: 60,
      second: 60
    }
  },
  created () {
    this.updateTime()
    setInterval(() => {
      this.updateTime()
    }, 1000)
  },
  //   - 时针 =》 8点 =》 一圈 360deg =>  一格30deg => 30*8=>240deg
  // - 分针 =》 20分 =》 1圈360deg => 一格6deg => 20* 6 =》 120deg
  // - 秒针 =》 20秒 =》 一圈360deg => 1格6deg => 20*6 => 120deg
  computed: {
    //  时针的样式
    hourStyle () {
      let hour = this.hour - 12 ? this.hour - 12 : this.hour
      let rowDeg = 30 * hour + this.min / 60 * 30 // 时针至少转的角度 + 分针分钟数/60 * 30度
      return { transform: `rotate(${rowDeg}deg)` }
    },
    minStyle () {
      let rowDeg = 6 * this.min
      return { transform: `rotate(${rowDeg}deg)` }
    },
    secondStyle () {
      let rowDeg = 6 * this.second
      return { transform: `rotate(${rowDeg}deg)` }

    //   return { transform: `rotate(${rowDeg}deg)`, transition: 'all 1s linear' }
    }
  },
  methods: {
    updateTime () {
      let currentDate = new Date() // 获取当前时间对象
      this.hour = currentDate.getHours() // 获取当时的小时
      this.min = currentDate.getMinutes() // 获取当前的分钟
      this.second = currentDate.getSeconds() // 获取当前的秒
    }
  }
}
</script>

<style lang='less' scoped>
  .date {
      background-image: url('../../assets/img/back.png');
      background-size: cover;
      width:400px;
      height: 400px;
      display: flex;
      justify-content: center;
      position: relative;
      .hour,.min,.second {
          position: absolute;
          bottom:200px;
          transform-origin: 0 100%;
      }
    .hour {
        background-image: url('../../assets/img/hou.png');
        width:8px;
        height: 100px;
    }
     .min {
        background-image: url('../../assets/img/min.png');
        width:6px;
        height:120px;
    }
    .second {
        background-image: url('../../assets/img/sec.png');
        width:4px;
        height:160px;
    }
  }
</style>
