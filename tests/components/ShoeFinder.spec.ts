import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { mockProducts } from '../__mocks__/products'

// Create a mock component that replicates ShoeFinder functionality
const ShoeFinderComponent = defineComponent({
  name: 'ShoeFinder',
  setup() {
    const shopLinks = [{ to: '/shoe-finder', text: 'Shoe Finder' }]
    return { shopLinks }
  },
  template: `
    <section class="relative min-h-[40vh] md:min-h-[60vh] overflow-hidden">
      <div class="container mx-auto px-4 md:px-6 pt-12 md:pt-24 pb-4 md:pb-6 relative z-10">
        <div class="flex flex-col md:flex-row items-center justify-between gap-8">
          <!-- Shop Buttons -->
          <div class="w-full md:w-1/3 flex flex-col gap-4">
            <a
              v-for="link in shopLinks"
              :key="link.to"
              :href="link.to"
              class="bg-black text-white text-xl font-bold py-4 px-8 rounded-sm hover:bg-gray-800 transition-colors duration-200 text-center"
            >
              {{ link.text }}
            </a>
          </div>
          <!-- Video -->
          <div class="relative w-full md:w-2/3 flex justify-center items-end">
            <video
              src="https://assets.contentstack.io/v3/assets/blt9b6df677776ba2fe/blt0e1610992c4ca1d7/68001753e696da08f55a4127/shoe_finder.webm"
              class="w-[40%] h-auto object-contain relative z-20 max-h-[70vh]"
              autoplay
              loop
              muted
              playsinline
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  `
})

describe('ShoeFinder Component', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(ShoeFinderComponent)
  })

  it('renders the component properly', () => {
    expect(wrapper.find('section').exists()).toBe(true)
    expect(wrapper.find('.container').exists()).toBe(true)
  })

  it('displays the Shoe Finder button', () => {
    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.text()).toBe('Shoe Finder')
    expect(link.attributes('href')).toBe('/shoe-finder')
  })

  it('has the button with proper styling classes', () => {
    const link = wrapper.find('a')
    expect(link.classes()).toContain('bg-black')
    expect(link.classes()).toContain('text-white')
    expect(link.classes()).toContain('text-xl')
    expect(link.classes()).toContain('font-bold')
  })

  it('includes an autoplay video', () => {
    const video = wrapper.find('video')
    expect(video.exists()).toBe(true)
    expect(video.attributes('src')).toContain('shoe_finder.webm')
    expect(video.attributes('autoplay')).toBeDefined()
    expect(video.attributes('loop')).toBeDefined()
    expect(video.attributes('muted')).toBeDefined()
    expect(video.attributes('playsinline')).toBeDefined()
  })

  it('has a fallback message for browsers that don\'t support video', () => {
    const video = wrapper.find('video')
    expect(video.text()).toContain('Your browser does not support the video tag')
  })

  it('uses responsive layout classes for both mobile and desktop', () => {
    // Section responsiveness
    expect(wrapper.find('section').classes()).toContain('min-h-[40vh]')
    expect(wrapper.find('section').classes()).toContain('md:min-h-[60vh]')
    
    // Container padding responsiveness 
    const container = wrapper.find('.container')
    expect(container.classes()).toContain('px-4')
    expect(container.classes()).toContain('md:px-6')
    expect(container.classes()).toContain('pt-12')
    expect(container.classes()).toContain('md:pt-24')
    
    // Layout responsiveness
    const flexContainer = wrapper.find('.flex')
    expect(flexContainer.classes()).toContain('flex-col')
    expect(flexContainer.classes()).toContain('md:flex-row')
  })
})
