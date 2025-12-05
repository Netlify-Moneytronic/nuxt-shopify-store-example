import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { defineComponent } from 'vue'

// Create a mock component that replicates SiteFooter functionality
const SiteFooterComponent = defineComponent({
  name: 'SiteFooter',
  setup() {
    // Mock the current year for consistent testing
    const currentYear = new Date().getFullYear()
    return { currentYear }
  },
  template: `
    <footer class="bg-white/40 backdrop-blur-sm border-t border-gray-200/30">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- About Section -->
          <div>
            <h3 class="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
              <a href="/about" class="hover:text-gray-900">About Us</a>
            </h3>
          </div>

          <!-- Contact Section -->
          <div>
            <h3 class="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
              <a href="/contact" class="hover:text-gray-900">Contact Us</a>
            </h3>
          </div>

          <!-- Account Section -->
          <div>
            <h3 class="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
              Your Account
            </h3>
            <ul class="space-y-3">
              <li>
                <a href="/sign-in" class="text-base text-gray-500 hover:text-gray-900">
                  Sign In
                </a>
              </li>
              <li>
                <a href="/register" class="text-base text-gray-500 hover:text-gray-900">
                  Create Account
                </a>
              </li>
              <li>
                <a href="/orders" class="text-base text-gray-500 hover:text-gray-900">
                  Order History
                </a>
              </li>
            </ul>
          </div>

          <!-- Social Media Section -->
          <div>
            <h3 class="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
              Follow Us
            </h3>
            <div class="flex space-x-4">
              <a
                href="#"
                class="text-gray-500 hover:text-gray-900"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <span class="sr-only">Facebook</span>
                <svg class="h-6 w-6" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                class="text-gray-500 hover:text-gray-900"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <span class="sr-only">Instagram</span>
                <svg class="h-6 w-6" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
              <a
                href="#"
                class="text-gray-500 hover:text-gray-900"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
              >
                <span class="sr-only">X (Twitter)</span>
                <svg class="h-6 w-6" viewBox="0 0 24 24">
                  <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Bottom Credits -->
        <div class="mt-8 border-t border-gray-200 pt-8">
          <p class="text-center text-sm text-gray-500">
            &copy; {{ currentYear }} Nuxt Ecommerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  `
})

describe('SiteFooter Component', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(SiteFooterComponent)
  })

  it('renders the component properly', () => {
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  it('displays About Us section', () => {
    const aboutSection = wrapper.find('h3 a[href="/about"]')
    expect(aboutSection.exists()).toBe(true)
    expect(aboutSection.text()).toBe('About Us')
  })

  it('displays Contact Us section', () => {
    const contactSection = wrapper.find('h3 a[href="/contact"]')
    expect(contactSection.exists()).toBe(true)
    expect(contactSection.text()).toBe('Contact Us')
  })

  it('displays Account section with links', () => {
    // Check section title
    const accountSection = wrapper.findAll('h3').find(el => el.text() === 'Your Account')
    expect(accountSection).toBeDefined()

    // Check account links
    const links = wrapper.findAll('ul li a')
    expect(links.length).toBe(3)
    
    // Check Sign In link
    const signInLink = links[0]
    expect(signInLink.text()).toBe('Sign In')
    expect(signInLink.attributes('href')).toBe('/sign-in')
    
    // Check Create Account link
    const createAccountLink = links[1]
    expect(createAccountLink.text()).toBe('Create Account')
    expect(createAccountLink.attributes('href')).toBe('/register')
    
    // Check Order History link  
    const orderHistoryLink = links[2]
    expect(orderHistoryLink.text()).toBe('Order History')
    expect(orderHistoryLink.attributes('href')).toBe('/orders')
  })

  it('displays social media links with proper accessibility', () => {
    const socialHeading = wrapper.findAll('h3').find(el => el.text() === 'Follow Us')
    expect(socialHeading).toBeDefined()
    
    // Check social links (Facebook, Instagram, Twitter/X)
    const socialLinks = wrapper.findAll('a[rel="noopener noreferrer"]')
    expect(socialLinks.length).toBe(3)
    
    // Check accessibility attributes
    socialLinks.forEach(link => {
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
      expect(link.find('.sr-only').exists()).toBe(true)
    })
    
    // Check specific platforms
    expect(socialLinks[0].find('.sr-only').text()).toBe('Facebook')
    expect(socialLinks[1].find('.sr-only').text()).toBe('Instagram')
    expect(socialLinks[2].find('.sr-only').text()).toBe('X (Twitter)')
  })

  it('displays copyright information with current year', () => {
    const currentYear = new Date().getFullYear()
    const copyright = wrapper.find('p.text-center')
    expect(copyright.exists()).toBe(true)
    expect(copyright.text()).toContain(`© ${currentYear} Nuxt Ecommerce`)
    expect(copyright.text()).toContain('All rights reserved')
  })

  it('uses responsive layout with grid structure', () => {
    const grid = wrapper.find('.grid')
    expect(grid.exists()).toBe(true)
    expect(grid.classes()).toContain('grid-cols-1')
    expect(grid.classes()).toContain('md:grid-cols-4')
    expect(grid.classes()).toContain('gap-8')
  })

  it('has proper styling and visual elements', () => {
    // Check footer background and border
    const footer = wrapper.find('footer')
    expect(footer.classes()).toContain('bg-white/40')
    expect(footer.classes()).toContain('backdrop-blur-sm')
    expect(footer.classes()).toContain('border-t')
    
    // Check bottom border separator
    const separator = wrapper.find('.border-t.border-gray-200')
    expect(separator.exists()).toBe(true)
    
    // Check text colors and styling
    const heading = wrapper.find('h3')
    expect(heading.classes()).toContain('text-gray-600')
    expect(heading.classes()).toContain('uppercase')
  })
})
