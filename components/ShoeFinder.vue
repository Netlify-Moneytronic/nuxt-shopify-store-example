<template>
  <section class="relative min-h-[40vh] md:min-h-[60vh] overflow-hidden">
    <div class="container mx-auto px-4 md:px-6 pt-12 md:pt-24 pb-4 md:pb-6 relative z-10">
      <div class="flex flex-col md:flex-row items-center justify-between gap-8">
        <!-- Shop Buttons -->
        <div class="w-full md:w-1/3 flex flex-col gap-4">
          <NuxtLink
            v-for="link in shopLinks"
            :key="link.to"
            :to="link.to"
            class="bg-black text-white text-xl font-bold py-4 px-8 rounded-sm hover:bg-gray-800 transition-colors duration-200 text-center"
          >
            {{ link.text }}
          </NuxtLink>
        </div>
        <!-- Athletes Images -->
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
</template>

<script setup>
  const shopLinks = [{ to: '/shoe-finder', text: 'Shoe Finder' }];
</script>
