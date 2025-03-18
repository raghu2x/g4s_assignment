<script setup lang="ts">
import { useProductStore } from "../stores/productStore";

const store = useProductStore();
</script>

<template>
  <div v-if="store.savedProducts.length" class="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-4 text-gray-700">Saved Products</h3>
    <div 
      v-for="product in store.savedProducts" 
      :key="product.id" 
      class="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-3"
    >
      <p class="text-gray-800 font-medium">{{ product.title }}</p>
      <button 
        @click="store.removeProduct(product.id)" 
        class="text-red-500 hover:text-red-700 font-medium transition cursor-pointer"
      >
        Remove
      </button>
    </div>
  </div>
</template>
