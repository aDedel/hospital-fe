import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PatientDashboard from '@/components/PatientDashboard.vue'
import { setupI18n } from './test-utils/setupI18n'

const { plugins } = setupI18n()

describe('PatientDashboard', () => {
  it('renders properly', () => {
    const wrapper = mount(PatientDashboard, {
      global: {
        plugins: [...plugins],
      },
      props: { title: 'Hello Vitest' },
    })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
