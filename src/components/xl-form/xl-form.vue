<template>
  <form class="el-form" :class="[]">
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: 'XlForm',
  componentName: 'XlForm',
  provide() {
    return {
      xlForm: this
    }
  },
  props: {
    model: Object,
    rules: Object,
    labelPosition: String,
    labelWidth: String
  },
  data() {
    return {
      fields: [],
      potentialLabelWidthArr: []
    }
  },
  computed: {
    autoLabelWidth() {
      if (!this.potentialLabelWidthArr.length) return 0
      const max = Math.max(...this.potentialLabelWidthArr)
      return max ? `${max}px` : ''
    }
  },
  created() {
    this.$on('el.form.addField', (field) => {
      if (field) {
        this.field.push(field)
      }
    })

    this.$on('el.form.removeField', (field) => {
      if (field.prop) {
        this.fileds.splice(this.fileds.indexOf(field), 1)
      }
    })
  },
  methods: {
    registerLabelWidth(val, oldVal) {
      console.log(val, oldVal)
      if (val && oldVal) {
        console.log(oldVal)
      } else if (val) {
        this.potentialLabelWidthArr.push(val)
      }
    }
  }
}
</script>
