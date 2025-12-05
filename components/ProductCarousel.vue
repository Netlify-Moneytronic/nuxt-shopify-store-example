<template>
  <div class="w-full">
    <h2 class="text-center text-xl font-bold uppercase tracking-wider mb-8">{{ props.title }}</h2>
    <div class="relative">
      <!-- Previous Button -->
      <button
        class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-shadow min-h-[48px] min-w-[48px] flex items-center justify-center touch-manipulation"
        aria-label="Scroll products left"
        @click="() => scrollLeft()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <!-- Products Container -->
      <div
        ref="scrollContainer"
        class="flex overflow-x-auto gap-3 pb-4 snap-x snap-mandatory no-scrollbar"
      >
        <div v-for="product in props.products" :key="product.id" class="flex-none w-52 snap-start">
          <NuxtLink :to="product.link" class="block min-h-[48px] p-2">
            <div
              class="bg-white/30 backdrop-blur-sm rounded-lg shadow-md overflow-hidden hover:bg-white/70 transition-colors duration-300"
            >
              <div class="flex items-center justify-center p-3 h-32 bg-gray-30/30">
                <NuxtImg
                  :src="product.image"
                  :alt="product.title"
                  class="max-h-20 sm:max-h-28 w-auto object-contain hover:opacity-75 transition duration-300"
                  format="webp"
                  loading="lazy"
                  width="160,200,240"
                  height="240"
                  sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, 240px"
                  quality="85"
                  placeholder
                />
              </div>
              <div class="p-3">
                <h3 class="font-bold text-base mb-1 line-clamp-1">{{ product.title }}</h3>
                <p class="text-gray-900 font-semibold">${{ product.price.toFixed(2) }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Next Button -->
      <button
        class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-shadow min-h-[48px] min-w-[48px] flex items-center justify-center touch-manipulation"
        aria-label="Scroll products right"
        @click="() => scrollRight()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, withDefaults, defineProps } from 'vue';

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

  interface Product {
    id: number | string;
    title: string;
    price: number;
    image: string;
    link: string;
  }

  const props = withDefaults(
    defineProps<{
      title: string;
      products: Product[];
    }>(),
    {
      title: '',
      products: () => [],
    },
  );
</script>

<style scoped>
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>
