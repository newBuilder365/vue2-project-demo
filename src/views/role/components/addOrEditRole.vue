<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" v-loading="loading">
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
import { getRoleById } from '@/services/role'
export default Vue.extend({
  name: 'AddOrEditPage',
  mounted () {
    if (this.isEdit) {
      this.getRoleById()
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      required: true
    },
    currentRoleId: {
      type: Number || NaN
    }
  },
  data () {
    return {
      form: {
        name: '',
        code: '',
        description: ''
      },
      loading: false
    }
  },
  methods: {
    getDatas () {
      return {
        form: this.form
      }
    },

    async getRoleById () {
      this.loading = true
      const { data } = await getRoleById(this.currentRoleId)
      this.loading = false
      if (data.code === '000000') {
        this.form = data.data
      }
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
