<template>
  <div>
    <el-card class="box-card" :body-style="{ padding: '0px' }">
      <div slot="header" class="clearfix">
        <div>
          <label>筛选搜索</label>
          <div :style="{ float: 'right' }">
            <el-button size="mini" @click="resetForm">重置</el-button>
            <el-button type="primary" size="mini" @click="getRolePages"
              >查询搜索</el-button
            >
          </div>
          <br /><br />
          <label :style="{ marginLeft: '60px' }">输入搜索：</label>
          <el-input
            size="mini"
            placeholder="角色名称"
            :style="{ width: '200px' }"
            v-model="name"
          >
          </el-input>
        </div>
      </div>
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <el-button size="mini" @click="addRole">添加角色</el-button>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          row-key="id"
          v-loading="loading"
        >
          <el-table-column label="编码" type="index" align="center" width="80">
          </el-table-column>
          <el-table-column prop="name" label="角色名称" min-width="160">
          </el-table-column>
          <el-table-column prop="description" label="描述" min-width="160">
          </el-table-column>
          <el-table-column prop="createdTime" label="添加时间" min-width="160">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160"
            align="center"
          >
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="$router.push({
                name: 'allocMenu',
                params: {
                  roleId: scope.row.id
                }
              })">分配菜单</el-button>
              <el-button size="small" type="text" @click="$router.push({
                name: 'allocResource',
                params: {
                  roleId: scope.row.id
                }
              })">分配资源</el-button>
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >编辑</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="deleteRoleById(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :style="{ marginTop: '5px' }"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-sizes="[5, 10, 20]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-card>
    </el-card>
    <el-dialog
      :destroy-on-close="true"
      title="添加角色"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <add-or-edit-role
        v-if="dialogVisible"
        :isEdit="isEdit"
        :currentRoleId="currentRoleId"
        ref="addOrEditRoleRef"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRolePages, saveOrUpdate, deleteRoleById } from '@/services/role'
import addOrEditRole from './components/addOrEditRole.vue'
export default Vue.extend({
  name: 'RolePage',
  components: {
    addOrEditRole
  },
  created () {
    this.getRolePages()
  },
  methods: {
    handleClick (row: any) {
      this.currentRoleId = row.id
      this.isEdit = true
      this.dialogVisible = true
    },

    // 查询数据
    async getRolePages () {
      const params = {
        name: this.name,
        current: this.current,
        size: this.size
      }
      this.loading = true
      const { data } = await getRolePages(params)
      this.loading = false
      if (data.code === '000000') {
        this.tableData = data.data.records
        this.current = data.data.current
        this.size = data.data.size
        this.total = data.data.total
      }
    },

    resetForm () {
      this.name = ''
      this.current = 1
      this.size = 10
      this.getRolePages()
    },

    handleSizeChange (val: number) {
      this.size = val
      this.getRolePages()
    },
    handleCurrentChange (val: number) {
      this.current = val
      this.getRolePages()
    },

    addRole () {
      this.dialogVisible = true
      this.isEdit = false
    },

    deleteRoleById (id: number) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await deleteRoleById(id)
          if (data.code === '000000') {
            this.getRolePages()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    handleClose () {
      this.currentRoleId = null
      this.isEdit = false
      this.dialogVisible = false
    },

    async saveOrUpdate () {
      const { form } = (this.$refs.addOrEditRoleRef as any).getDatas()
      const { data } = await saveOrUpdate(form)
      if (data.code === '000000') {
        this.$message.success('添加成功')
        this.dialogVisible = false
        this.currentRoleId = null
        this.isEdit = false
        this.getRolePages()
      }
    }
  },
  data () {
    return {
      tableData: [],
      name: '',
      current: 1,
      size: 10,
      total: 0,
      loading: false,
      dialogVisible: false,
      currentRoleId: null,
      isEdit: false
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
