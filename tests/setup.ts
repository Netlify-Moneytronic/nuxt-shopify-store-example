import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// Mock all Nuxt components globally
const mockNuxtComponents = {
  // Mock NuxtLink
  NuxtLink: {
    props: {
      to: {
        type: [String, Object],
        default: ''
      }
    },
    template: '<a :href="to"><slot /></a>'
  },
  // Mock NuxtImg
  NuxtImg: {
    props: {
      src: {
        type: String,
        default: ''
      },
      alt: {
        type: String,
        default: ''
      },
      width: {
        type: [String, Number],
        default: ''
      },
      height: {
        type: [String, Number],
        default: ''
      },
      format: {
        type: String,
        default: ''
      },
      quality: {
        type: [String, Number],
        default: ''
      },
      placeholder: {
        type: Boolean,
        default: false
      },
      loading: {
        type: String,
        default: 'lazy'
      },
      sizes: {
        type: String,
        default: ''
      },
      class: {
        type: [String, Object, Array],
        default: ''
      }
    },
    template: '<img :src="src" :alt="alt" :class="class" @load="$emit(\'load\')" />'
  }
}

// Add mocked components to Vue Test Utils global config
config.global.stubs = {
  ...config.global.stubs,
  ...mockNuxtComponents
}

// Mock fetch and other browser APIs if needed
global.fetch = vi.fn()

// Mock IntersectionObserver which is used in many modern web apps but not available in test environment
class MockIntersectionObserver {
  observe = vi.fn()
  disconnect = vi.fn()
  unobserve = vi.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver
})

// Mock scrollTo and scrollBy which are used for scrolling but might not be available in test environment
window.scrollTo = vi.fn()
Element.prototype.scrollTo = vi.fn()
Element.prototype.scrollBy = vi.fn()

console.log('✅ Vitest setup file loaded')
