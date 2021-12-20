<template>
  <div>
    <el-card class="box-card">
      <!-- :model="ruleForm" :rules="rules" ref="ruleForm" -->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="href">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentId">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单">
            <el-option label="无上级菜单" :value="-1"></el-option>
            <el-option
            v-for="item in parentMenu"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标" prop="icon">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="shown">
          <el-radio v-model="form.shown" :label="true">是</el-radio>
          <el-radio v-model="form.shown" :label="false">否</el-radio>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input-number v-model="form.orderNum"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="resetForm" v-show="showRest">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Form } from 'element-ui'
import Vue from 'vue'
import { saveOrUpdateMenu, getMenuNodeList, getMenuById } from '@/services/menu'
export default Vue.extend({
  name: 'CreateOrEditMenuPage',
  created () {
    this.getMenuNodeList()
    if (this.$route.query.type === 'edit') {
      this.getMenuById()
    }
  },
  data () {
    return {
      form: {
        parentId: -1,
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: false
      },
      rules: {
        name: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ],
        icon: [{ required: true, message: '前端图标不能为空', trigger: 'blur' }]
      },
      parentMenu: []
    }
  },
  computed: {
    showRest () {
      return this.$route.query.type === 'add'
    }
  },
  methods: {
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        const { data } = await saveOrUpdateMenu(this.form)
        if (data.code === '000000') {
          this.$message.info('保存成功！')
          this.$router.back()
        }
      } catch (error) {
        this.$message.error('保存失败')
        console.log('error', error)
      }
    },

    async getMenuNodeList () {
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.parentMenu = data.data
      }
    },

    resetForm () {
      (this.$refs.form as Form).resetFields()
    },

    async getMenuById () {
      const id = this.$route.query.id || -1
      const { data } = await getMenuById(id as number)
      if (data.code === '000000') {
        this.form = data.data
      }
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
