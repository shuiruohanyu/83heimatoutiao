<template>
    <el-card>
        <!--面包屑 -->
        <bread-crumb slot='header'>
           <template slot='title'>
               内容列表
           </template>
        </bread-crumb>
        <!-- 表单 -->
        <el-form style="margin-left:50px">
            <!-- 文章状态 -->
            <el-form-item label="文章状态:">
                 <el-radio-group>
                   <el-radio>全部</el-radio>
                   <el-radio>草稿</el-radio>
                   <el-radio>待审核</el-radio>
                   <el-radio>审核通过</el-radio>
                   <el-radio>审核失败</el-radio>

            </el-radio-group>
            </el-form-item>
            <el-form-item label="频道列表:">
                <!-- 频道列表 -->
                <el-select>
                </el-select>
            </el-form-item>
            <el-form-item label="时间选择:">
                 <el-date-picker
                   type="daterange"
                   start-placeholder="开始日期"
                   end-placeholder="结束日期">
          </el-date-picker>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style>
</style>
