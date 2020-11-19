import Dropdown from './dropdown.vue'
import DropdownMenu from './dropdown-menu.vue'
import DropdownMenuItem from './dropdown-menu-item.vue'

Dropdown.install = function(Vue) {
  Vue.component(Dropdown.name, Dropdown)
  Vue.component(DropdownMenu.name, DropdownMenu)
  Vue.component(DropdownMenuItem.name, DropdownMenuItem)
}
export default Dropdown
