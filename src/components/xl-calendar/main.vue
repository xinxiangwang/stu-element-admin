<template>
  <div class="el-calendar">
    <div class="el-calendar__header">
      {{ i18nDate }}
    </div>
  </div>
</template>
<script>
import Locale from '../../mixins/locale'
export default {
  name: 'XlCalendar',
  mixins: [Locale],
  props: {
    value: [Date, String, Number],
    range: {
      type: Array,
      validator(range) { // 自定义类型校验
        if (Array.isArray(range)) {
          return range.length === 2 && range.every(item => {
            typeof item === 'string' ||
            typeof item === 'number' ||
            item instanceof Date
          })
        } else {
          return false
        }
      }
    },
    firstDayOfWeek: {
      type: Number,
      defualt: 1
    }
  },
  provide() {
    return {
      xlCalendar: this
    }
  },
  computed: {
    i18nDate() {
      const year = this.date
      return {}
    },
    date() {
      return {}
    }
  }
}
</script>
