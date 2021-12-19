<template>
  <div class="menu">
    <el-card class="box-card" :body-style="{ padding: '0px' }">
      <div slot="header" class="clearfix">
        <el-button size="mini" @click="createMenu">添加菜单</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%" row-key="id" v-loading="loading">
        <el-table-column label="编号" align="center" type="index" width="80">
        </el-table-column>
        <el-table-column prop="name" label="菜单名称" min-width="120">
        </el-table-column>
        <el-table-column prop="level" label="菜单级数" min-width="120">
          <template slot-scope="scope">
            {{ renderLevel(scope.row.level) }}
          </template>
        </el-table-column>
        <el-table-column prop="icon" label="前端图标" min-width="120">
        </el-table-column>
        <el-table-column prop="orderNum" label="排序" min-width="120">
        </el-table-column>
        <el-table-column min-width="130" align="center">
          <template slot="header">
            操作
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllMenu, deleteMenu } from '@/services/menu'
export default Vue.extend({
  name: 'MenuPage',
  data () {
    return {
      tableData: [],
      loading: false
    }
  },
  created () {
    this.getAllMenu()
  },
  methods: {
    async getAllMenu () {
      this.loading = true
      const { data } = await getAllMenu()
      if (data.code === '000000') {
        this.tableData = data.data
      }
      this.loading = false
    },

    renderLevel (level: number) {
      switch (level) {
        default:
          return ''
        case 0:
          return '一级标题'
        case 1:
          return '二级标题'
      }
    },

    createMenu () {
      this.$router.push({
        name: 'create-edit-menu',
        query: {
          type: 'add'
        }
      })
    },

    handleEdit (id: any) {
      this.$router.push({
        name: 'create-edit-menu',
        query: {
          id,
          type: 'edit'
        }
      })
    },

    async handleDelete (id: number) {
      this.loading = true
      const { data } = await deleteMenu(id)
      this.loading = false
      if (data.code === '000000') {
        this.$message.success('删除成功')
        this.getAllMenu()
      }
    }
  }
})
</script>

<style>
</style>
