<template>
  <div>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
export default Vue.extend({
  name: 'LayoutPage'
})
</script>

<style scoped>
.el-header {
  background: #b3c0d1;
}
.el-aside {
  background: #d3dce6;
  min-height: 100vh;
}
.el-main {
  background: #e9eef3;
}
</style>
