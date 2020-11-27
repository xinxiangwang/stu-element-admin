<template>
  <div>
    <el-button @click="showMsg">显示消息</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    showMsg() {
      const h = this.$createElement
      this.$message({
        message: h('p', null, [
          h('strong', null, 'vnode')
        ])
      })
    }
  }
}
</script>
