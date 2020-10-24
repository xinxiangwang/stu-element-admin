import XlForm from './xl-form.vue'
import XlFormItem from './xl-form-item.vue'

XlForm.install = function(Vue) {
  Vue.component(XlForm.name, XlForm)
  Vue.component(XlFormItem.name, XlFormItem)
}

export default XlForm
