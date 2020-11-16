import Dropdown from './dropdown.vue'
import DropdownMenu from './dropdown-menu.vue'

Dropdown.install = function(Vue) {
  Vue.component(Dropdown.name, Dropdown)
  Vue.component(DropdownMenu.name, DropdownMenu)
}
export default Dropdown
