<script setup lang="ts">
  import { nextTick, ref } from 'vue';

  interface ProductCard {
    title: string;
    handle: string;
    link: string;
    image: string;
    price: string;
    currency: string;
    available: boolean;
    productType: string;
    description: string;
    sizes: string[];
  }

  interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    products?: ProductCard[];
  }

  const open = ref(false);
  const input = ref('');
  const loading = ref(false);
  const errored = ref(false);
  const messages = ref<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your shoe shopping assistant. Ask me about our running and athletic shoes — sizes, prices, what's in stock — and I'll pull it straight from the store.",
    },
  ]);
  const scrollRegion = ref<HTMLElement | null>(null);

  const suggestions = ['Show me running shoes', "What's in stock under $200?", 'Recommend a trail shoe'];

  async function scrollToBottom() {
    await nextTick();
    if (scrollRegion.value) {
      scrollRegion.value.scrollTop = scrollRegion.value.scrollHeight;
    }
  }

  function toggle() {
    open.value = !open.value;
    if (open.value) scrollToBottom();
  }

  async function send(text?: string) {
    const content = (text ?? input.value).trim();
    if (!content || loading.value) return;

    errored.value = false;
    input.value = '';
    messages.value.push({ role: 'user', content });
    loading.value = true;
    await scrollToBottom();

    // Send the recent text-only history so the assistant keeps context.
    const payload = messages.value
      .filter((m) => m.content)
      .map((m) => ({ role: m.role, content: m.content }))
      .slice(-12);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payload }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const data = (await res.json()) as { reply?: string; products?: ProductCard[]; error?: string };
      if (data.error) throw new Error(data.error);

      messages.value.push({
        role: 'assistant',
        content: data.reply ?? '',
        products: data.products ?? [],
      });
    } catch {
      errored.value = true;
      messages.value.push({
        role: 'assistant',
        content: 'Sorry, I ran into a problem reaching the store. Please try again in a moment.',
      });
    } finally {
      loading.value = false;
      await scrollToBottom();
    }
  }
</script>

<template>
  <div>
    <!-- Launcher -->
    <button
      class="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-xl transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
      :aria-label="open ? 'Close shopping assistant' : 'Open shopping assistant'"
      @click="toggle"
    >
      <svg v-if="!open" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12a8 8 0 01-11.5 7.2L3 21l1.8-6.5A8 8 0 1121 12z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Panel -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-4 opacity-0"
    >
      <div
        v-if="open"
        class="fixed bottom-24 right-5 z-50 flex h-[34rem] max-h-[calc(100vh-7rem)] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
      >
        <!-- Header -->
        <div class="flex items-center gap-3 bg-black px-4 py-3 text-white">
          <span class="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-lg">👟</span>
          <div class="leading-tight">
            <p class="text-sm font-bold">Shoe Assistant</p>
            <p class="text-xs text-white/60">Powered by Claude · live store data</p>
          </div>
        </div>

        <!-- Messages -->
        <div ref="scrollRegion" class="flex-1 space-y-4 overflow-y-auto bg-gray-50 px-4 py-4">
          <div v-for="(msg, i) in messages" :key="i">
            <div :class="msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'">
              <div
                :class="[
                  'max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm',
                  msg.role === 'user' ? 'bg-black text-white' : 'bg-white text-gray-800 shadow-sm',
                ]"
              >
                {{ msg.content }}
              </div>
            </div>

            <!-- Product cards -->
            <div v-if="msg.products && msg.products.length" class="mt-3 space-y-2">
              <NuxtLink
                v-for="product in msg.products"
                :key="product.handle"
                :to="product.link"
                class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-2 transition-shadow hover:shadow-md"
                @click="open = false"
              >
                <img
                  v-if="product.image"
                  :src="product.image"
                  :alt="product.title"
                  class="h-14 w-14 flex-shrink-0 rounded-lg object-cover"
                  loading="lazy"
                />
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-semibold text-gray-900">{{ product.title }}</p>
                  <p class="text-sm text-gray-700">{{ product.price }} {{ product.currency }}</p>
                  <p class="text-xs" :class="product.available ? 'text-green-600' : 'text-red-500'">
                    {{ product.available ? 'In stock' : 'Out of stock' }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Typing indicator -->
          <div v-if="loading" class="flex justify-start">
            <div class="flex items-center gap-1 rounded-2xl bg-white px-3.5 py-3 shadow-sm">
              <span class="h-2 w-2 animate-bounce rounded-full bg-gray-400" style="animation-delay: 0ms" />
              <span class="h-2 w-2 animate-bounce rounded-full bg-gray-400" style="animation-delay: 150ms" />
              <span class="h-2 w-2 animate-bounce rounded-full bg-gray-400" style="animation-delay: 300ms" />
            </div>
          </div>
        </div>

        <!-- Suggestions -->
        <div v-if="messages.length <= 1" class="flex flex-wrap gap-2 border-t border-gray-100 bg-white px-3 pt-3">
          <button
            v-for="s in suggestions"
            :key="s"
            class="rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-100"
            @click="send(s)"
          >
            {{ s }}
          </button>
        </div>

        <!-- Composer -->
        <form class="flex items-center gap-2 border-t border-gray-100 bg-white p-3" @submit.prevent="send()">
          <input
            v-model="input"
            type="text"
            placeholder="Ask about our shoes…"
            class="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-black focus:outline-none"
            :disabled="loading"
          />
          <button
            type="submit"
            class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-black text-white transition-opacity disabled:opacity-40"
            :disabled="loading || !input.trim()"
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </form>
      </div>
    </transition>
  </div>
</template>
