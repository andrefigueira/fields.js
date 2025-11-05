import type { App, Plugin } from 'vue'
import CustomSelect from './components/CustomSelect.vue'
import CustomCheckbox from './components/CustomCheckbox.vue'
import CustomFileInput from './components/CustomFileInput.vue'

export { CustomSelect, CustomCheckbox, CustomFileInput }

export type { SelectOption } from './components/CustomSelect.vue'

export interface CustomFieldsOptions {
  prefix?: string
}

const VueCustomFields: Plugin = {
  install(app: App, options: CustomFieldsOptions = {}) {
    const prefix = options.prefix || ''

    app.component(`${prefix}CustomSelect`, CustomSelect)
    app.component(`${prefix}CustomCheckbox`, CustomCheckbox)
    app.component(`${prefix}CustomFileInput`, CustomFileInput)
  }
}

export default VueCustomFields
