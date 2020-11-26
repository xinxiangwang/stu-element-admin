<template>
  <div />
</template>
<script>
export default {
  mounted() {
    const h = this.$createElement
    console.log(this.$message({
      message: h('p', null, [
        h('strong', null, 'vnode')
      ])
    }))
  }
}
</script>
