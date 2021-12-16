<template>
  <div class="login-form">
    <el-form
      ref="form"
      :model="ruleForm"
      :rules="rules"
      label-position="top"
      label-width="80px"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
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
export default Vue.extend({
  name: 'LoginPage',
  data () {
    return {
      form: {
        phone: '',
        password: ''
      },
      buttonLoading: false,
      rules: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
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
