<script>
import Migrating from '../../mixins/migrating'
import Clickoutside from '../../utils/clickoutside'
import { generateId } from '../../utils/util'
export default {
  name: 'XlDropdown',
  componentName: 'XlDropdown',
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
    },
    hideOnClick: {
      type: Boolean,
      default: true
    },
    tabindex: {
      type: Number,
      default: 0
    }
  },
  provide() {
    return {
      dropdown: this,
      visible: false
    }
  },
  data() {
    return {
      triggerElm: null, // 触发dropdownElm显示的元素
      menuItems: null,
      menuItemsArray: null,
      dropdownElm: null, // dropmenu
      listId: `dropdown-menu-${generateId()}`
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
      let { splitButton, handleTriggerKeyDown } = this
      this.triggerElm = splitButton
        ? this.$refs.trigger.$el // 获取button形态右侧的下拉开关
        : this.$slots.default[0].elm
      // let dropdownElm = this.dropdownElm
      this.triggerElm.addEventListener('keydown', handleTriggerKeyDown) // 给触发按钮注册键盘事件
    },
    initAria() {
      this.dropdownElm.setAttribute('id', this.listId)
      this.triggerElm.setAttribute('aria-haspopup', 'list')
      this.triggerElm.setAttribute('aria-controls', this.listId)
      if (!this.splitButton) {
        this.triggerElm.setAttribute('role', 'button')
        this.triggerElm.setAttribute('tabindex', this.tabindex)
        this.triggerElm.setAttribute('class', (this.triggerElm.getAttribute('class') || '') + ' el-dropdown-selfdefine') // 控制
      }
    },
    handleTriggerKeyDown(e) { // 触发按钮注册键盘监听事件
      const keyCode = e.keyCode
      if ([38, 40].indexOf(keyCode) > -1) {
        this.removeTabindex();
      }
    },
    handleItemKeyDown(e) {
      const keyCode = e.keyCode
      const target = e.target
      const currentIndex = this.menuItemsArray.indexOf(target)
      const max = this.menuItemsArray.length - 1
      let nextIndex
      // if ([38, 40].indexOf(keyCode) > -1) {
      //   if (keyCode === 38) {
      //     nextIndex = currentIndex !== 0 ? currentIndex - 1
      //   } else {

      //   }
      // }
      console.log(currentIndex)
    },
    removeTabindex() {
      this.triggerElm.setAttribute('tabindex', '-1')
      this.menuItemsArray.forEach((item) => {
        item.setAttribute('tabindex', '-1')
      })
    },
    hide() {
      console.log('hide被调用了')
    },
    initDomOperation() { // dropdown menu mounted时调用
      this.dropdownElm = this.popperElm // popperElm 是子组件mounted传进来的
      this.menuItems = this.dropdownElm.querySelectorAll('[tabindex="-1"]')
      this.menuItemsArray = [...this.menuItems]
      this.initEvent()
      this.initAria()
    },
    handleMenuItemClick(command, instance) { // dropdown menu item点击时调用
      if (this.hideOnClick) {
        this.visible = false
      }
      this.$emit('command', command, instance) // 触发组件绑定的@command事件
    }
  },
  mounted() {
    this.$on('menu-item-click', this.handleMenuItemClick)
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
