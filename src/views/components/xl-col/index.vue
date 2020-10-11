<template>
  <div>
    <xl-row :gutter="20">
      <xl-col :span="12">
        asdasdas
      </xl-col>
      <xl-col :span="12">
        <xl-radio-group v-model="radioValue">
          <xl-radio v-for="item in radioArr" :key="item.id" :label="item.id">
            {{ item.name }}
          </xl-radio>
        </xl-radio-group>
      </xl-col>
    </xl-row>
  </div>
</template>
<script>
export default {
  name: 'XlColTest',
  data() {
    return {
      aaa: 'zzz',
      radioValue: 0,
      radioArr: [
        { id: 0, name: '张三' },
        { id: 1, name: '李四' },
        { id: 2, name: '王五' }
      ]
    }
  }
}
</script>
