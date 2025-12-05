<template>
  <footer class="bg-white/40 backdrop-blur-sm border-t border-gray-200/30">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About Section -->
        <div>
          <h3 class="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
            <NuxtLink to="/about" class="hover:text-gray-900">About Us</NuxtLink>
          </h3>
        </div>

        <!-- Contact Section -->
        <div>
          <h3 class="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
            <NuxtLink to="/contact" class="hover:text-gray-900">Contact Us</NuxtLink>
          </h3>
        </div>

        <!-- Account Section -->
        <div>
          <h3 class="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
            Your Account
          </h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/sign-in" class="text-base text-gray-500 hover:text-gray-900">
                Sign In
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/register" class="text-base text-gray-500 hover:text-gray-900">
                Create Account
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/orders" class="text-base text-gray-500 hover:text-gray-900">
                Order History
              </NuxtLink>
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
            >
              <span class="sr-only">Facebook</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>

            <a
              href="#"
              class="text-gray-500 hover:text-gray-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="sr-only">Instagram</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>

            <a
              href="#"
              class="text-gray-500 hover:text-gray-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="sr-only">X (Twitter)</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"
                />
              </svg>
            </a>

            <a
              href="#"
              class="text-gray-500 hover:text-gray-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="sr-only">TikTok</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>

            <a
              href="#"
              class="text-gray-500 hover:text-gray-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="sr-only">WhatsApp</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  d="M20.463 3.488C18.217 1.24 15.231 0 12.05 0 5.495 0 .16 5.334.157 11.892c0 2.096.548 4.142 1.588 5.945L.057 24l6.304-1.654a11.882 11.882 0 005.693 1.45h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.181-1.237-6.167-3.489-8.415zM12.05 21.785h-.004a9.867 9.867 0 01-5.031-1.378l-.36-.214-3.733.979 1-3.648-.235-.374a9.824 9.824 0 01-1.51-5.26c.003-5.431 4.422-9.849 9.857-9.849 2.635 0 5.107 1.025 6.964 2.886 1.857 1.86 2.88 4.333 2.877 6.963-.002 5.432-4.423 9.85-9.858 9.85zm5.414-7.376c-.296-.148-1.752-.865-2.023-.964-.272-.099-.47-.148-.669.148-.198.297-.767.964-.94 1.162-.174.198-.347.223-.644.074-.296-.148-1.254-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.297.297-.496.1-.198.05-.371-.025-.52-.074-.148-.668-1.61-.916-2.206-.241-.579-.486-.501-.668-.51-.173-.008-.371-.01-.57-.01-.197 0-.52.074-.791.371-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.148.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.57-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Credits -->
      <div class="mt-8 border-t border-gray-200 pt-8">
        <p class="text-center text-sm text-gray-500">
          &copy; {{ new Date().getFullYear() }} Nuxt Ecommerce. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  // Component name is defined by the file name: SiteFooter
  // No additional script needed for now
</script>
