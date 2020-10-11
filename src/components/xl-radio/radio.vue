<template>
  <label
  class="el-radio"
  :class="[
    border && radioSize ? 'el-radio--' + radioSize : '',
    { 'is-disabled': isDisabled },
    { 'is-focus': focus },
    { 'is-checked': model === label }
  ]"
  role="radio">
    <span class="el-radio__input" :class="{ 'is-disabled': isDisabled, 'is-checked': model === label }"></span>
  </label>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
