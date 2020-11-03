<template>
  <div>
    <xl-form ref="xlForm" label-position="left" :model="formObj" :rules="xlFormRules">
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
      <xl-form-item>
        <el-button @click="submit">提交</el-button>
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
        account: { required: true, message: '请输入', trigger: 'blur' },
        password: { required: true, message: '密码呢？？？' }
      }
    }
  },
  mounted() {
    // console.log(this.removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2))
  },
  methods: {
    submit() {
      // this.$refs['xlForm'].validate((valid, fields) => {
      //   console.log(valid, fields)
      // })
      this.$refs['xlForm'].validateField('password', (msg, field) => {
        console.log(msg, field)
      })
    },
    removeElement(nums, val) {
      let count = 0
      const length = nums.length
      for (let i = 0; i < length; i++) {
        if (nums[i] !== val) {
          nums[count] = nums[i]
          count++
        }
      }
      console.log(nums)
      return count
    }
  }
}
</script>
