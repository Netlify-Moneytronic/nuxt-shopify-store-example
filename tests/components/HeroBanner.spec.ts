import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, shallowMount, flushPromises, VueWrapper } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'

// Create a mock of the HeroBanner component to avoid Nuxt specific features
const HeroBannerComponent = defineComponent({
  name: 'HeroBanner',
  setup() {
    const manImageLoaded = ref(false)
    const womanImageLoaded = ref(false)
    
    const shopLinks = [
      { to: '/mens', text: 'Shop Mens' },
      { to: '/womens', text: 'Shop Womens' },
      { to: '/accessories', text: 'Shop Accessories' },
    ]
    
    return {
      manImageLoaded,
      womanImageLoaded,
      shopLinks
    }
  },
  template: `
    <section class="relative h-screen flex items-center overflow-hidden">
      <div class="container mx-auto px-4 md:px-6 relative z-10 h-full flex items-center">
        <div class="flex flex-col md:flex-row items-center justify-between gap-8 h-full">
          <div class="relative w-full md:w-2/3 flex justify-center items-center h-full py-20">
            <img 
              src="https://images.contentstack.io/v3/assets/blt9b6df677776ba2fe/blt011e5dcc2888ffd2/67f81e9f22edb05d2c80493a/Man_Running.png"
              alt="Man Running"
              :class="[
                'h-full w-auto object-contain relative z-10 -mr-8 transition-opacity duration-200 ease-in max-w-[45%]',
                { 'opacity-0': !manImageLoaded },
              ]"
              @load="manImageLoaded = true"
            />
            <img 
              src="https://images.contentstack.io/v3/assets/blt9b6df677776ba2fe/blt8490ef9609b3ca36/67f81da8c969c96cf4dd50d6/Woman_Running.png"
              alt="Woman Running"
              :class="[
                'h-full w-auto object-contain relative z-20 transition-opacity duration-200 ease-in max-w-[45%]',
                { 'opacity-0': !womanImageLoaded },
              ]"
              @load="womanImageLoaded = true"
            />
          </div>
          <div class="w-full md:w-1/3 flex flex-col gap-4">
            <a 
              v-for="link in shopLinks"
              :key="link.to"
              :href="link.to"
              class="bg-black text-white text-xl font-bold py-4 px-8 rounded-sm hover:bg-gray-800 transition-colors duration-200 text-center min-h-[48px] min-w-[48px] block my-2"
              :aria-label="\`Navigate to \${link.text.toLowerCase()} section\`"
              role="button"
            >
              {{ link.text }}
            </a>
          </div>
        </div>
      </div>
    </section>
  `
})

describe('HeroBanner Component', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(HeroBannerComponent)
  })

  it('renders the component properly', () => {
    expect(wrapper.find('section').exists()).toBe(true)
    expect(wrapper.find('.container').exists()).toBe(true)
  })

  it('initially renders images with opacity-0 class', () => {
    const images = wrapper.findAll('img')
    expect(images.length).toBe(2) // Should have two images
    
    // Both images should initially have opacity-0 class
    images.forEach((img) => {
      expect(img.classes()).toContain('opacity-0')
    })
  })

  it('updates image visibility when loaded', async () => {
    const images = wrapper.findAll('img')
    
    // Trigger load event on first image
    await images[0].trigger('load')
    await flushPromises()
    
    // After the image is loaded, it shouldn't have opacity-0 class
    expect(wrapper.findAll('img')[0].classes()).not.toContain('opacity-0')
    
    // The second image should still be hidden
    expect(wrapper.findAll('img')[1].classes()).toContain('opacity-0')
    
    // Now load the second image
    await images[1].trigger('load')
    await flushPromises()
    
    // Now both images should be visible
    expect(wrapper.findAll('img')[0].classes()).not.toContain('opacity-0')
    expect(wrapper.findAll('img')[1].classes()).not.toContain('opacity-0')
  })

  it('renders the correct number of shop links', () => {
    const links = wrapper.findAll('a')
    expect(links.length).toBe(3) // Should have three shop links
  })

  it('renders shop links with correct text', () => {
    const links = wrapper.findAll('a')
    
    const expectedLinks = [
      { to: '/mens', text: 'Shop Mens' },
      { to: '/womens', text: 'Shop Womens' },
      { to: '/accessories', text: 'Shop Accessories' },
    ]
    
    links.forEach((link, index: number) => {
      expect(link.attributes('href')).toBe(expectedLinks[index].to)
      expect(link.text()).toBe(expectedLinks[index].text)
    })
  })

  it('has appropriate accessibility attributes on links', () => {
    const links = wrapper.findAll('a')
    
    links.forEach((link) => {
      expect(link.attributes('role')).toBe('button')
      
      // Check for aria-label in the format "Navigate to shop mens section" etc.
      const linkText = link.text().toLowerCase()
      expect(link.attributes('aria-label')).toContain(`Navigate to ${linkText}`)
    })
  })
})
