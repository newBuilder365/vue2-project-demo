<template>
  <div>
    <el-card class="box-card" v-loading="loading">
      <template>
        <el-card
          shadow="never"
          class="box-card"
          :style="{ minHeight: '180px' }"
          v-for="item in allCategoryData"
          :key="item.id"
        >
          <div slot="header" class="clearfix">
            <el-checkbox :indeterminate="item.isIndeterminate" v-model="item.checkAll" @change="handleCheckAllChange(item)">{{ item.name }}</el-checkbox>
          </div>
          <el-checkbox-group v-model="item.checked" @change="handleCheckedChange(item)">
            <el-row :gutter="20">
              <el-col :span="8" v-for="resource in getCurrentResource(item.id)" :key="resource.id" :style="{marginBottom: '10px'}">
                <el-checkbox :label="resource.id" :key="resource.id">
                  {{ resource.name }}
                </el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </el-card>
      </template>
      <div
        :style="{
          textAlign: 'center',
          marginBottom: '10px',
          marginTop: '20px'
        }"
      >
        <el-button type="primary" size="small" @click="onEditSave">保存</el-button>
        <el-button size="small" @click="reset">清空</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { getAll, getAllResource, allocateRoleResources, getRoleResources } from '@/services/resource'
import Vue from 'vue'
export default Vue.extend({
  name: 'AllocResourcePage',
  data () {
    return {
      allCategoryData: [],
      resourceData: [],
      loading: false

    }
  },
  created () {
    this.getAll()
    this.getAllResource()
    this.getRoleResources()
  },
  methods: {
    async getAll () {
      this.loading = true
      const { data } = await getAll(this.$attrs.roleId)
      this.loading = false
      if (data.code === '000000') {
        this.allCategoryData = data.data.map((v: any) => ({ ...v, checkAll: false, isIndeterminate: false, checked: [] }))
      }
    },

    async getAllResource () {
      this.loading = true
      const { data } = await getAllResource()
      this.loading = false
      if (data.code === '000000') {
        this.resourceData = data.data
      }
    },

    // 获取分类下的资源
    getCurrentResource  (categoryId: string | number) {
      return this.resourceData.filter(
        (v: any) => v.categoryId === categoryId
      )
    },

    handleCheckAllChange (item: any) {
      item.checked = item.checkAll ? this.resourceData.filter((v: any) => v.categoryId === item.id).map((v: any) => v.id) : []
      item.isIndeterminate = false
    },
    handleCheckedChange (item: any) {
      item.checkAll = item.checked.length === this.getCurrentResource(item.id).length
      item.isIndeterminate = item.checked.length > 0 && item.checked.length < this.getCurrentResource(item.id).length
    },

    reset () {
      this.allCategoryData = this.allCategoryData.map((v: any) => ({ ...v, checkAll: false, isIndeterminate: false, checked: [] })) as never
    },

    async onEditSave () {
      let resourceIdList: any = []
      this.allCategoryData.forEach((v: any) => {
        resourceIdList = [...resourceIdList, ...v.checked]
      })
      const params = {
        roleId: this.$attrs.roleId,
        resourceIdList
      }
      this.loading = true
      const { data } = await allocateRoleResources(params)
      this.loading = false
      if (data.code === '000000') {
        this.$message.success('保存成功')
        this.$router.back()
      }
    },

    async getRoleResources () {
      const { data } = await getRoleResources(this.$attrs.roleId)
      if (data.code === '000000') {
        this.allCategoryData.forEach((item: any) => {
          const resource = data.data.find((v: any) => v.id === item.id)
          if (resource && resource.resourceList) {
            item.checked = resource.resourceList.filter((c: any) => c.selected).map((c: any) => c.id)
            item.checkAll = item.checked.length === resource.resourceList.length
            item.isIndeterminate = item.checked.length > 0 && item.checked.length < resource.resourceList.length
          }
        })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep .el-card__header {
  padding: 18px 20px;
  box-sizing: border-box;
  background: rgb(242, 246, 252);
}
</style>
