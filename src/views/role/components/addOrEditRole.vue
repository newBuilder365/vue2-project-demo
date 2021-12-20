<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.description" :rows="5"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'AddOrEditPage',
  data () {
    return {
      form: {
        name: '',
        code: '',
        description: ''
      }
    }
  },
  methods: {
    getDatas () {
      return {
        form: this.form
      }
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
