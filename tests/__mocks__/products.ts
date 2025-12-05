// Mock product data for testing
export const mockProducts = [
  {
    id: 1,
    title: 'Running Shoes',
    price: 129.99,
    image: '/images/mock/running-shoes.jpg',
    link: '/products/running-shoes',
    description: 'High-performance running shoes with cushioned soles for maximum comfort.'
  },
  {
    id: 2,
    title: 'Workout Top',
    price: 49.99,
    image: '/images/mock/workout-top.jpg',
    link: '/products/workout-top',
    description: 'Breathable workout top with moisture-wicking technology.'
  },
  {
    id: 3,
    title: 'Athletic Shorts',
    price: 39.99,
    image: '/images/mock/athletic-shorts.jpg',
    link: '/products/athletic-shorts',
    description: 'Lightweight athletic shorts with built-in liner for maximum performance.'
  },
  {
    id: 4,
    title: 'Sports Water Bottle',
    price: 24.99,
    image: '/images/mock/water-bottle.jpg',
    link: '/products/sports-water-bottle',
    description: 'BPA-free sports water bottle with leak-proof design.'
  }
]

// Create a string version of price for ProductCard tests
export const mockProductsWithStringPrice = mockProducts.map(product => ({
  ...product,
  price: product.price.toFixed(2)
}))

// Mock function to simulate API calls
export const fetchProducts = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  return mockProducts
}
