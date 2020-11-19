<template>
  <div>
    <xl-dropdown @click="handleClick">
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <xl-dropdown-menu slot="dropdown">
        <xl-dropdown-item>黄金糕</xl-dropdown-item>
        <xl-dropdown-item>狮子头</xl-dropdown-item>
        <xl-dropdown-item>螺蛳粉</xl-dropdown-item>
        <xl-dropdown-item>双皮奶</xl-dropdown-item>
        <xl-dropdown-item>蚵仔煎</xl-dropdown-item>
      </xl-dropdown-menu>
    </xl-dropdown>
    <hr>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleClick(e) {
      console.log(e)
    }
  }
}
</script>
