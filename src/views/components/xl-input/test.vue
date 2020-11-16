<template>
  <div>
    <label for="">
      compositionstart
      <input
        type="text"
        @compositionstart="onCompositionStart"
        @compositionupdate="onCompositionUpdate"
        @compositionend="onCompositionEnd"
      >
    </label>
  </div>
</template>
<script>
export default {
  methods: {
    onCompositionStart(val) {
      console.log('开启中文输入法，开始输入')
      console.log(val)
    },
    onCompositionUpdate(val) {
      console.log('正在输入')
      console.log(val)
    },
    onCompositionEnd(val) {
      console.log('中文输入结束')
      console.log(val)
    }
  }
}
</script>
