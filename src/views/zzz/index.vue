<template>
  <div />
</template>
<script>
import { fetchUserTable } from '@/api/table'
export default {
  mounted() {
    fetchUserTable()
  }
}
</script>
