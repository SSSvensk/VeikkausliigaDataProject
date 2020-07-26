import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})

describe('HelloWorld', () => {
  // Inspect the raw component options
  it('has data', () => {
    expect(typeof HelloWorld.data).toBe('function')
  })
})

describe('Mounted HelloWorld', () => {
  const wrapper = shallowMount(HelloWorld);

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})
