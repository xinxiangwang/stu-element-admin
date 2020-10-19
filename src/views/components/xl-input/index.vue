<template>
  <div>
    <xl-row>
      <xl-col :span="13">
        测试组件：<xl-input v-model="inputVal" autocomplete="on" clearable :show-password="true">
          <template slot="prepend">
            prepend
          </template>
          <template slot="prefix">
            prefix
          </template>
          <template slot="suffix">
            suffix
          </template>
          <template slot="append">
            append
          </template>
        </xl-input>
      </xl-col>
      <xl-col :span="13">
        element组件：<el-input v-model="inputVal" autocomplete="on" clearable :show-password="true">
            <template slot="prepend">
              prepend
            </template>
            <template slot="prefix">
              prefix
            </template>
            <template slot="suffix">
              su
            </template>
            <template slot="append">
              append
            </template>
          </el-input>
      </xl-col>
    </xl-row>
    <hr>
    <zzz-test/>
  </div>
</template>
<script>
import Test from './test'
export default {
  components: {
    'zzz-test': Test
  },
  data() {
    return {
      inputVal: ''
    }
  }
}
</script>
