<template>
  <div>
    <el-card class="box-card" :body-style="{ padding: '0px' }">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
          <el-form-item label="资源名称">
            <el-input v-model="form.name" placeholder="资源名称" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="资源路径">
            <el-input v-model="form.url" placeholder="资源路径" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="资源分类">
            <el-select v-model="form.categoryId" placeholder="资源分类" size="mini">
              <el-option
              v-for="item in resourceDatas"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style="{float: 'right'}">
            <el-button @click="resetForm" size="mini">重置</el-button>
            <el-button type="primary" @click="getResourcePages" size="mini">查询搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <el-button size="mini">添加</el-button>
          <el-button size="mini">资源分类</el-button>
        </div>
        <el-table
          :data="resourceDatas"
          border
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column label="编码" align="center" type="index" width="80">
          </el-table-column>
          <el-table-column prop="name" label="资源名称" min-width="180">
          </el-table-column>
          <el-table-column prop="url" label="资源路径" min-width="180">
          </el-table-column>
          <el-table-column prop="description" label="描述" min-width="180">
          </el-table-column>
          <el-table-column prop="createdTime" label="添加时间" min-width="180">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="100"
          >
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          :style="{ marginTop: '5px' }"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.current"
          :page-sizes="[5, 10, 20]"
          :page-size="form.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-card>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourcePages, getAll } from '@/services/resource'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'ResourcePage',
  created () {
    this.getResourcePages()
    this.getAll()
  },
  data () {
    return {
      resourceDatas: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      form: {
        name: '',
        url: '',
        categoryId: null,
        current: 1,
        size: 10
      },
      total: 0,
      loading: false,
      resourceId: null,
      resourceCategory: []
    }
  },
  methods: {
    async getResourcePages () {
      this.loading = true
      const { data } = await getResourcePages(this.form)
      this.loading = false
      if (data.code === '000000') {
        this.resourceDatas = data.data.records
        this.total = data.data.total
        this.form.current = data.data.current
        this.form.size = data.data.size
      }
    },

    async getAll () {
      const { data } = await getAll(this.resourceId)
      if (data.code === '000000') {
        this.resourceCategory = data.data
      }
    },

    handleSizeChange (val: number) {
      this.form.size = val
      this.getResourcePages()
    },
    handleCurrentChange (val: number) {
      this.form.current = val
      this.getResourcePages()
    },

    resetForm () {
      (this.$refs.form as Form).resetFields()
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
