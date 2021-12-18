<template>
  <div class="login-form">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="top"
      label-width="80px"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="buttonLoading" @click="onSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import request from '@/utils/request'
import qs from 'qs'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'LoginPage',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      buttonLoading: false,
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        this.buttonLoading = true
        const { data } = await request({
          method: 'POST',
          url: '/front/user/login',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: qs.stringify(this.form)
        })
        this.buttonLoading = false
        if (data.state !== 1) {
          return this.$message.error(data.message)
        }
        this.$router.push({
          name: 'home'
        })
        this.$message.success('登录成功')
      } catch (error) {
        console.log('登录失败', error)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.login-form {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-form {
    width: 280px;
    padding: 20px;
    background: #fff;
  }
  .el-button {
    width: 100%;
  }
}
</style>
