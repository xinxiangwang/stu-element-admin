<template>
  <div>
    <xl-form label-position="left" :model="formObj" :rules="xlFormRules">
      <xl-form-item>
        <template #label>
          HOLLY SHIT!!!
        </template>
      </xl-form-item>
      <xl-form-item :label="formLabel" label-width="auto" />
      <xl-form-item label-width="100" label="账号：" prop="account">
        <xl-input v-model="formObj.account" />
      </xl-form-item>
      <xl-form-item label-width="100" label="密码：" prop="password">
        <xl-input v-model="formObj.password" />
      </xl-form-item>
    </xl-form>
    <hr>
    <p>原组件</p>
    <el-form :rules="elFormRules">
      <el-form-item label-position="left" label="姓名" prop="name" />
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formLabel: 'zzz',
      formObj: {
        account: 'admin',
        password: ''
      },
      elFormObj: {
        name: ''
      },
      elFormRules: {
        name: { required: true, message: '请输入', trigger: 'blur' }
      },
      xlFormRules: {
        account: { required: true, message: '请输入', trigger: 'blur' }
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.$set(this.xlFormRules, 'password', { required: true, message: '密码呢？？？', trigger: 'blur' })
    }, 1000)
  }
}
</script>
