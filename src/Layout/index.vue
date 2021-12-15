<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <app-aside />
      </el-aside>
      <el-container>
        <el-header>
          <app-header />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'
export default Vue.extend({
  name: 'LayoutPage',
  components: {
    AppAside,
    AppHeader
  }
})
</script>

<style scoped>
.el-header {
  background: #fff;
}
.el-aside {
  background: #d3dce6;
  min-height: 100vh;
}
.el-main {
  background: #e9eef3;
}
</style>
