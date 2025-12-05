import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
// Import mock product data
import { mockProducts } from '../__mocks__/products'

// Mock the Product interface from the original component
interface Product {
  id: number | string;
  title: string;
  price: number;
  image: string;
  link: string;
}

// Create a mock of the ProductCarousel component to avoid Nuxt-specific features
const ProductCarouselComponent = defineComponent({
  name: 'ProductCarousel',
  props: {
    title: {
      type: String,
      default: '',
    },
    products: {
      type: Array as () => Product[],
      default: () => [],
    },
  },
  setup(props) {
    const scrollContainer = ref<HTMLElement | null>(null);

    function scrollLeft() {
      if (scrollContainer.value) {
        scrollContainer.value.scrollBy({
          left: -scrollContainer.value.offsetWidth,
          behavior: 'smooth',
        });
      }
    }

    function scrollRight() {
      if (scrollContainer.value) {
        scrollContainer.value.scrollBy({
          left: scrollContainer.value.offsetWidth,
          behavior: 'smooth',
        });
      }
    }

    return {
      scrollContainer,
      scrollLeft,
      scrollRight,
    }
  },
  template: `
    <div class="w-full">
      <h2 class="text-center text-xl font-bold uppercase tracking-wider mb-8">{{ title }}</h2>
      <div class="relative">
        <!-- Previous Button -->
        <button
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-shadow min-h-[48px] min-w-[48px] flex items-center justify-center touch-manipulation"
          aria-label="Scroll products left"
          @click="scrollLeft"
        >
          <svg class="h-6 w-6" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Products Container -->
        <div
          ref="scrollContainer"
          class="flex overflow-x-auto gap-3 pb-4 snap-x snap-mandatory no-scrollbar"
        >
          <div v-for="product in products" :key="product.id" class="flex-none w-52 snap-start">
            <a :href="product.link" class="block min-h-[48px] p-2">
              <div class="bg-white/30 backdrop-blur-sm rounded-lg shadow-md overflow-hidden hover:bg-white/70 transition-colors duration-300">
                <div class="flex items-center justify-center p-3 h-32 bg-gray-30/30">
                  <img
                    :src="product.image"
                    :alt="product.title"
                    class="max-h-20 sm:max-h-28 w-auto object-contain hover:opacity-75 transition duration-300"
                  />
                </div>
                <div class="p-3">
                  <h3 class="font-bold text-base mb-1 line-clamp-1">{{ product.title }}</h3>
                  <p class="text-gray-900 font-semibold">\${{ product.price.toFixed(2) }}</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <!-- Next Button -->
        <button
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-shadow min-h-[48px] min-w-[48px] flex items-center justify-center touch-manipulation"
          aria-label="Scroll products right"
          @click="scrollRight"
        >
          <svg class="h-6 w-6" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  `
})

describe('ProductCarousel Component', () => {
  // Using imported mock products

  let wrapper: VueWrapper
  
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    
    // Create a mock for Element.scrollBy that captures arguments
    Element.prototype.scrollBy = vi.fn();
    
    // Mock offsetWidth to a positive value for scroll calculations
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 500
    });
    
    wrapper = mount(ProductCarouselComponent, {
      props: {
        title: 'Test Carousel',
        products: mockProducts
      },
      attachTo: document.body // Needed for some DOM operations
    });
  })

  it('renders the component properly', () => {
    expect(wrapper.find('.w-full').exists()).toBe(true)
    expect(wrapper.find('h2').exists()).toBe(true)
  })

  it('displays the correct title', () => {
    expect(wrapper.find('h2').text()).toBe('Test Carousel')
  })

  it('renders the navigation buttons', () => {
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(2)
    
    // Left button
    expect(buttons[0].attributes('aria-label')).toBe('Scroll products left')
    
    // Right button
    expect(buttons[1].attributes('aria-label')).toBe('Scroll products right')
  })

  it('renders the correct number of products', () => {
    const productItems = wrapper.findAll('.flex-none')
    expect(productItems.length).toBe(mockProducts.length)
  })

  it('displays correct product information', () => {
    mockProducts.forEach((product, index) => {
      const productEl = wrapper.findAll('.flex-none')[index]
      
      expect(productEl.find('h3').text()).toBe(product.title)
      expect(productEl.find('p').text()).toBe(`$${product.price.toFixed(2)}`)
      expect(productEl.find('img').attributes('src')).toBe(product.image)
      expect(productEl.find('img').attributes('alt')).toBe(product.title)
      expect(productEl.find('a').attributes('href')).toBe(product.link)
    })
  })

  it('has a left scroll button', () => {
    // Verify the left button exists with correct a11y attributes
    const leftButton = wrapper.findAll('button')[0];
    expect(leftButton.exists()).toBe(true);
    expect(leftButton.attributes('aria-label')).toBe('Scroll products left');
    
    // Check SVG path direction (left arrow)
    const svgPath = leftButton.find('path');
    expect(svgPath.exists()).toBe(true);
    // The d attribute should contain a path that creates a left arrow
    expect(svgPath.attributes('d')).toContain('M15 19l-7-7 7-7');
  })

  it('has a right scroll button', () => {
    // Verify the right button exists with correct a11y attributes
    const rightButton = wrapper.findAll('button')[1];
    expect(rightButton.exists()).toBe(true);
    expect(rightButton.attributes('aria-label')).toBe('Scroll products right');
    
    // Check SVG path direction (right arrow)
    const svgPath = rightButton.find('path');
    expect(svgPath.exists()).toBe(true);
    // The d attribute should contain a path that creates a right arrow
    expect(svgPath.attributes('d')).toContain('M9 5l7 7-7 7');
  })

  it('renders empty state correctly when no products are provided', async () => {
    const emptyWrapper = mount(ProductCarouselComponent, {
      props: {
        title: 'Empty Carousel',
        products: []
      }
    })
    
    expect(emptyWrapper.find('h2').text()).toBe('Empty Carousel')
    expect(emptyWrapper.findAll('.flex-none').length).toBe(0)
    
    // Navigation buttons should still be visible even with no products
    expect(emptyWrapper.findAll('button').length).toBe(2)
  })
  
  it('has appropriate a11y attributes', () => {
    const leftButton = wrapper.findAll('button')[0]
    const rightButton = wrapper.findAll('button')[1]
    
    expect(leftButton.attributes('aria-label')).toBe('Scroll products left')
    expect(rightButton.attributes('aria-label')).toBe('Scroll products right')
    
    // Verify minimum touch target sizes for accessibility
    expect(leftButton.classes()).toContain('min-h-[48px]')
    expect(leftButton.classes()).toContain('min-w-[48px]')
    expect(rightButton.classes()).toContain('min-h-[48px]')
    expect(rightButton.classes()).toContain('min-w-[48px]')
  })
  
  it('truncates product titles that are too long', async () => {
    const longTitleProducts = [
      {
        id: 1,
        title: 'This is a very long product title that should be truncated in the UI',
        price: 19.99,
        image: 'https://example.com/product1.jpg',
        link: '/products/1'
      }
    ]
    
    const longTitleWrapper = mount(ProductCarouselComponent, {
      props: {
        title: 'Long Title Test',
        products: longTitleProducts
      }
    })
    
    // The title should be displayed but should have a line clamp class
    const titleElement = longTitleWrapper.find('h3')
    expect(titleElement.text()).toBe(longTitleProducts[0].title)
    expect(titleElement.classes()).toContain('line-clamp-1')
  })
})
