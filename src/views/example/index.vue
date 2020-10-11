<template>
  <div>example</div>
</template>
<script>
import { fetchTable } from '@/api/table'
export default {
  mounted() {
    fetchTable()
  }
}
</script>
<style>
</style>
