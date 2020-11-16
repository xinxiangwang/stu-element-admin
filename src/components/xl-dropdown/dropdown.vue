<script>
import Migrating from '../../mixins/migrating'
import Clickoutside from '../../utils/clickoutside'
export default {
  name: 'XlDropdown',
  componentName: 'ElDropdown',
  mixins: [Migrating],
  directives: { Clickoutside },
  props: {
    splitButton: Boolean,
    type: String,
    trigger: {
      type: String,
      default: 'hover'
    },
    size: {
      type: String,
      default: ''
    }
  },
  provide() {
    return {
      dropdown: this
    }
  },
  data() {
    return {
      triggerElm: null, // 触发dropdownElm显示的元素
      menuItems: null,
      menuItemsArray: null,
      dropdownElm: null // dropmenu
    }
  },
  computed: {
    dropdownSize() {
      return this.size
    }
  },
  methods: {
    getMigratingConfig() {
      return {
        props: {
          'menu-align': 'menu-align is renamed to placement.'
        }
      }
    },
    initEvent() {
      let { splitButton } = this
      this.triggerElm = splitButton
        ? this.$refs.trigger.$el // 获取button形态右侧的下拉开关
        : this.$slots.default[0].elm
      // let dropdownElm = this.dropdownElm
      this.triggerElm.addEventListener('keydown')
    },
    hide() {
      console.log('hide被调用了')
    },
    initDomOperation() { // dropdown menu mounted时调用
      this.dropdownElm = this.popperElm // popperElm 是子组件mounted传进来的
      this.menuItems = this.dropdownElm.querySelectorAll('[tabindex="-1"]')
      this.menuItemsArray = [...this.menuItems]
      this.initEvent()
    }
  },
  render() {
    const { splitButton, type, hide } = this
    const handleMainButtonClick = (event) => {
      this.$emit('click', event)
    }
    const triggerElm = !splitButton
      ? this.$slots.default
      : (
        <el-button-group>
          <el-button type={type} onClick={handleMainButtonClick}>
            {this.$slots.default}
          </el-button>
          <el-button ref='trigger' class='el-dropdown__caret-button'>
            <i class='el-dropdown__icon el-icon-arrow-down'></i>
          </el-button>
        </el-button-group>)
    return (
      <div class='el-dropdown' v-clickoutside={hide}>
        {triggerElm}
        {this.$slots.dropdown}
      </div>
    )
  }
}
</script>
