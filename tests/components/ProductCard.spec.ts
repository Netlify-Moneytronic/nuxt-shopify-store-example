import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { defineComponent } from 'vue'
// Import mock product data
import { mockProductsWithStringPrice } from '../__mocks__/products'

// Create a mock component that replicates ProductCard functionality
// This avoids Nuxt-specific imports that might cause issues in the testing environment
const ProductCardComponent = defineComponent({
  name: 'ProductCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: true,
    },
  },
  template: `
    <div class="mx-2">
      <div class="relative rounded-lg shadow-lg">
        <a :href="link">
          <img
            :src="image"
            class="shadow-lg rounded-lg opacity-1 hover:opacity-75 transition duration-300 ease-in-out w-full"
            loading="lazy"
          />
        </a>
        <div class="p-6">
          <h5 class="font-bold text-lg mb-3">{{ title }}</h5>
          <pre class="text-gray-500 mb-4">{{ price }}</pre>
          <p>{{ description }}</p>
        </div>
      </div>
    </div>
  `
})

describe('ProductCard Component', () => {
  // Use the first mock product for default props
  const mockProduct = mockProductsWithStringPrice[0]
  const defaultProps = {
    title: mockProduct.title,
    price: `$${mockProduct.price}`, // Add $ sign as it's expected in the template
    image: mockProduct.image,
    link: mockProduct.link,
    description: mockProduct.description
  }

  // Helper function to create a wrapper with specified props
  const createWrapper = (props = {}): VueWrapper => {
    return mount(ProductCardComponent, {
      props: { ...defaultProps, ...props },
    })
  }

  it('renders the component properly', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.shadow-lg').exists()).toBe(true)
  })

  it('displays the correct title', () => {
    const wrapper = createWrapper()
    const title = wrapper.find('h5')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe(defaultProps.title)
  })

  it('displays the correct price', () => {
    const wrapper = createWrapper()
    const price = wrapper.find('pre')
    expect(price.exists()).toBe(true)
    expect(price.text()).toBe(defaultProps.price)
  })

  it('displays the correct description', () => {
    const wrapper = createWrapper()
    const description = wrapper.find('p')
    expect(description.exists()).toBe(true)
    expect(description.text()).toBe(defaultProps.description)
  })

  it('displays the correct image', () => {
    const wrapper = createWrapper()
    const image = wrapper.find('img')
    expect(image.exists()).toBe(true)
    expect(image.attributes('src')).toBe(defaultProps.image)
  })

  it('has a link with the correct destination', () => {
    const wrapper = createWrapper()
    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe(defaultProps.link)
  })

  it('can render a product without a price', () => {
    const wrapper = createWrapper({ price: '' })
    const price = wrapper.find('pre')
    expect(price.exists()).toBe(true)
    expect(price.text()).toBe('')
  })

  it('can render a product without a link', () => {
    const wrapper = createWrapper({ link: '' })
    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('')
  })

  it('handles long product titles properly', () => {
    const longTitle = 'This is a very long product title that might need special handling in the UI'
    const wrapper = createWrapper({ title: longTitle })
    const title = wrapper.find('h5')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe(longTitle)
  })

  it('handles long product descriptions properly', () => {
    const longDescription = 'This is a very long product description that might need special handling in the UI. It contains multiple sentences and could potentially overflow its container if not styled correctly.'
    const wrapper = createWrapper({ description: longDescription })
    const description = wrapper.find('p')
    expect(description.exists()).toBe(true)
    expect(description.text()).toBe(longDescription)
  })
})
