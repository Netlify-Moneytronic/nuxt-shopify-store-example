<script setup lang="ts">
import { getProductsQuery } from '../graphql/getProductsQuery';

const variables = { first: 3 };
const { data } = await useAsyncQuery(getProductsQuery, variables);
</script>

<template>
  <div>
    <HeroBanner />
    <div class="flex my-20">
      <ProductCard
        v-for="{ node } in data.products.edges"
        :key="node.id"
        :image="node.images.edges[0].node.src"
        :title="node.title"
        :price="`${node.priceRange.maxVariantPrice.amount} ${node.priceRange.maxVariantPrice.currencyCode}`"
        :link="`products/${node.handle}`"
        :description="node.description"
      />
    </div>
  </div>
</template>
