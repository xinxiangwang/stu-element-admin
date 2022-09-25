export default {
  name: 'ElTableHeader',
  props: {
    fixed: String,
    store: {
      required: true
    },
    defaultSort: {
      type: Object,
      default: () => {
        return {
          prop: '',
          order: ''
        }
      }
    }
  },
  computed: {
    table() {
      return this.$parent
    }
  }
}
