import { extend, localize } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import vi from 'vee-validate/dist/locale/vi.json'

localize({
  vi,
})

localize('vi')

// Extends rules
extend('required', required)
