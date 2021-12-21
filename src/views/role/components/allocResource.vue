<template>
  <div>
    <el-card class="box-card" :body-style="{padding: '0px'}">
      <template>
        <el-card
        shadow="never"
        class="box-card"
        :style="{marginBottom: '10px', minHeight: '180px'}"
        v-for="item in allCategoryData"
        :key="item.id">
          <div slot="header" class="clearfix">
            <el-checkbox v-model="checked">{{ item.name }}</el-checkbox>
          </div>
          aaa
        </el-card>
      </template>
      <div :style="{textAlign: 'center', marginBottom: '10px'}">
        <el-button type='primary' size="small">保存</el-button>
        <el-button size="small">重置</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { getAll } from '@/services/resource'
import Vue from 'vue'
export default Vue.extend({
  name: 'AllocResourcePage',
  data () {
    return {
      allCategoryData: []
    }
  },
  created () {
    this.getAll()
  },
  methods: {
    async getAll () {
      const { data } = await getAll(this.$attrs.roleId)
      if (data.code === '000000') {
        this.allCategoryData = data.data
      }
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
