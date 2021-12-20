<template>
  <div>
    <el-card class="box-card">
      <el-tree
        ref="tree"
        :data="menuTreeData"
        label="id"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="defaultSelectedKeys"
        :props="defaultProps"
        v-model="selectedKeys"
      >
      </el-tree>
      <div class="allocMenuFooter">
        <el-button type="primary" size="small" @click="onEditSave"
          >保存</el-button
        >
        <el-button type="small" @click="resetSelected">清空</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getMenuNodeList,
  getRoleMenus,
  allocateRoleMenus
} from '@/services/menu'
import { Tree } from 'element-ui'
export default Vue.extend({
  name: 'AllocMenuPage',
  created () {
    this.getRoleMenus()
    this.getMenuNodeList()
  },
  data () {
    return {
      menuTreeData: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      defaultSelectedKeys: [],
      selectedKeys: []
    }
  },
  methods: {
    async getMenuNodeList () {
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.menuTreeData = data.data
      }
    },

    async getRoleMenus () {
      const { data } = await getRoleMenus(this.$attrs.roleId)
      if (data.code === '000000') {
        this.getSelected(data.data)
      }
    },

    getSelected (subMenuList: any) {
      subMenuList.forEach((item: any) => {
        if (item.subMenuList) {
          this.getSelected(item.subMenuList)
        } else {
          if (item.selected) {
            this.defaultSelectedKeys = [
              ...this.defaultSelectedKeys,
              item.id
            ] as never
          }
        }
      })
    },

    onEditSave () {
      this.$confirm('此操作将分配菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const params = {
            menuIdList: (this.$refs.tree as Tree).getCheckedKeys(),
            roleId: this.$attrs.roleId
          }
          const { data } = await allocateRoleMenus(params)
          if (data.code === '000000') {
            this.$message({
              type: 'success',
              message: '取消操作!'
            })
            this.$router.back()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    resetSelected () {
      (this.$refs.tree as Tree).setCheckedKeys([])
    }
  }
})
</script>

<style lang="scss" scoped>
.allocMenuFooter {
  display: flex;
  justify-content: center;
}
</style>
