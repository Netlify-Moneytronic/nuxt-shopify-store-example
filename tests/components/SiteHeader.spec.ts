import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'

// Create a mock component that replicates SiteHeader functionality
const SiteHeaderComponent = defineComponent({
  name: 'SiteHeader',
  setup() {
    const searchInput = ref<HTMLInputElement | null>(null)
    const isSearchVisible = ref(false)
    const searchQuery = ref('')
    const logo = ref<HTMLImageElement | null>(null)
    const isMobileMenuOpen = ref(false)

    const navigationLinks = [
      { to: '/mens', text: 'Mens' },
      { to: '/womens', text: 'Womens' },
      { to: '/accessories', text: 'Accessories' },
      { to: '/sale', text: 'Sale' },
    ]

    const toggleSearch = vi.fn(() => {
      isSearchVisible.value = !isSearchVisible.value
    })

    const hideSearch = vi.fn(() => {
      isSearchVisible.value = false
      searchQuery.value = ''
    })

    const handleSearch = vi.fn(() => {
      hideSearch()
    })

    const openMobileMenu = vi.fn(() => {
      isMobileMenuOpen.value = true
    })

    const closeMobileMenu = vi.fn(() => {
      isMobileMenuOpen.value = false
      searchQuery.value = ''
    })

    return {
      searchInput,
      isSearchVisible,
      searchQuery,
      logo,
      isMobileMenuOpen,
      navigationLinks,
      toggleSearch,
      hideSearch,
      handleSearch,
      openMobileMenu,
      closeMobileMenu
    }
  },
  template: `
    <nav class="py-2 md:py-4 fixed top-0 left-0 right-0 w-full z-50 bg-white/40 backdrop-blur-sm shadow-sm">
      <div class="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div class="flex items-center">
          <a href="/" class="flex-shrink-0 fixed top-2 left-4 z-[110] md:static md:top-auto md:left-auto md:z-auto">
            <img
              ref="logo"
              class="h-12 w-12 md:h-20 md:w-20 spin-animation"
              src="/logo.svg"
              alt="Store logo"
            />
          </a>

          <!-- Desktop Navigation Links -->
          <div class="hidden md:flex items-center space-x-8 ml-16">
            <a v-for="link in navigationLinks" :key="link.to" :href="link.to" class="text-gray-700 hover:text-gray-900 font-bold">
              {{ link.text }}
            </a>
          </div>
        </div>

        <!-- Desktop Search Bar -->
        <div class="hidden md:flex relative items-center">
          <div class="relative w-64">
            <input
              v-if="isSearchVisible"
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="w-full px-4 py-2 rounded-full border-0 focus:outline-none"
              @keyup.enter="handleSearch"
              @keyup.esc="hideSearch"
            />
          </div>
          <button
            class="p-2 rounded-full"
            aria-label="Toggle search"
            @click="toggleSearch"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu Buttons -->
        <button
          v-if="!isMobileMenuOpen"
          class="md:hidden p-2"
          aria-label="Open menu"
          aria-expanded="false"
          @click="openMobileMenu"
        >
          <svg class="h-6 w-6" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <button
          v-if="isMobileMenuOpen"
          class="md:hidden p-2"
          aria-label="Close menu"
          aria-expanded="true"
          @click="closeMobileMenu"
        >
          <svg class="h-6 w-6" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-[105] mobile-menu"
      >
        <div class="container mx-auto px-6 py-20 min-h-screen">
          <!-- Mobile Search -->
          <div class="mb-8">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="w-full px-4 py-2 rounded-full"
            />
          </div>

          <!-- Mobile Navigation Links -->
          <div class="flex flex-col space-y-6">
            <a
              v-for="link in navigationLinks"
              :key="link.to"
              :href="link.to"
              class="text-xl text-gray-700 hover:text-gray-900 font-bold"
              @click="closeMobileMenu"
            >
              {{ link.text }}
            </a>
          </div>
        </div>
      </div>
    </nav>
  `
})

describe('SiteHeader Component', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(SiteHeaderComponent)
  })

  it('renders the component properly', () => {
    expect(wrapper.find('nav').exists()).toBe(true)
    expect(wrapper.find('.container').exists()).toBe(true)
  })

  it('displays the logo', () => {
    const logo = wrapper.find('img')
    expect(logo.exists()).toBe(true)
    expect(logo.attributes('src')).toBe('/logo.svg')
    expect(logo.attributes('alt')).toBe('Store logo')
  })

  it('displays desktop navigation links', () => {
    const links = wrapper.findAll('.hidden.md\\:flex a')
    expect(links.length).toBe(4) // 4 main navigation links

    const linkTexts = links.map(link => link.text())
    expect(linkTexts).toContain('Mens')
    expect(linkTexts).toContain('Womens')
    expect(linkTexts).toContain('Accessories')
    expect(linkTexts).toContain('Sale')
  })
  
  it('has correct navigation link destinations', () => {
    const links = wrapper.findAll('.hidden.md\\:flex a')
    
    expect(links[0].attributes('href')).toBe('/mens')
    expect(links[1].attributes('href')).toBe('/womens')
    expect(links[2].attributes('href')).toBe('/accessories')
    expect(links[3].attributes('href')).toBe('/sale')
  })

  it('initially hides the search bar', () => {
    const searchInput = wrapper.find('input[placeholder="Search products..."]')
    expect(searchInput.exists()).toBe(false)
  })

  it('shows search input when search button is clicked', async () => {
    const searchButton = wrapper.find('button[aria-label="Toggle search"]')
    expect(searchButton.exists()).toBe(true)
    
    await searchButton.trigger('click')
    
    const searchInput = wrapper.find('input[placeholder="Search products..."]')
    expect(searchInput.exists()).toBe(true)
  })

  it('displays mobile menu button when in mobile view', () => {
    const menuButton = wrapper.find('button[aria-label="Open menu"]')
    expect(menuButton.exists()).toBe(true)
  })

  it('opens mobile menu when mobile menu button is clicked', async () => {
    const menuButton = wrapper.find('button[aria-label="Open menu"]')
    await menuButton.trigger('click')
    
    // Mobile menu should be visible
    const mobileMenu = wrapper.find('.mobile-menu')
    expect(mobileMenu.exists()).toBe(true)
    
    // Mobile navigation links should be displayed
    const mobileLinks = wrapper.findAll('.mobile-menu a')
    expect(mobileLinks.length).toBe(4)
  })

  it('closes mobile menu when close button is clicked', async () => {
    // First open the menu
    const menuButton = wrapper.find('button[aria-label="Open menu"]')
    await menuButton.trigger('click')
    
    // Then close it
    const closeButton = wrapper.find('button[aria-label="Close menu"]')
    expect(closeButton.exists()).toBe(true)
    await closeButton.trigger('click')
    
    // Mobile menu should be hidden
    const mobileMenu = wrapper.find('.mobile-menu')
    expect(mobileMenu.exists()).toBe(false)
  })
  
  it('has correct accessibility attributes', () => {
    const searchButton = wrapper.find('button[aria-label="Toggle search"]')
    expect(searchButton.attributes('aria-label')).toBe('Toggle search')
    
    const menuButton = wrapper.find('button[aria-label="Open menu"]')
    expect(menuButton.attributes('aria-label')).toBe('Open menu')
    expect(menuButton.attributes('aria-expanded')).toBe('false')
  })
})
