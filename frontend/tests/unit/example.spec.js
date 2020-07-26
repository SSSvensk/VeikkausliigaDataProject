import { shallowMount, mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import Team from '@/components/HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
  it('has data', () => {
    expect(typeof HelloWorld.data).toBe('function')
  })
  it('is a Vue instance', () => {
    const wrapper = shallowMount(HelloWorld)
    expect(wrapper.vm).toBeTruthy()
  })
  it('returs 2 from method test', () => {
    const wrapper = shallowMount(HelloWorld)
    expect(wrapper.vm.test()).toBe(2)
  })
  it('reverse the array', () => {
    const wrapper = shallowMount(HelloWorld)
    expect(wrapper.vm.parameterTest([1,2,3])).toStrictEqual([3,2,1])
  })
  it('has v-btn', () => {
    const wrapper = shallowMount(HelloWorld)
    expect(wrapper.find('v-btn')).toBeTruthy();
  })
  it('renders correctly with different data', async () => {
    const wrapper = shallowMount(HelloWorld)
    const valueToContain = 23
    wrapper.setData({ testData: valueToContain })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain(valueToContain)
  })
})


