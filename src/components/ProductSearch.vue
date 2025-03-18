<script setup lang="ts">
import { ref, watch } from "vue";
import { useProductStore } from "../stores/productStore";
import { debounce } from "../utils";
import { onClickOutside } from "@vueuse/core"; // Import VueUse for outside click handling
import { IProduct } from "../types/product.types";

const query = ref("");
const results = ref<IProduct[]>([]);
const store = useProductStore();
const dropdownRef = ref(null);
const showDropdown = ref(false);

// Fetch products with debounce
const searchProducts = debounce(async () => {
  if (!query.value.trim()) {
    results.value = [];
    showDropdown.value = false;
    return;
  }
  const data = await store.fetchProducts(query.value);
  results.value = [...data];
  showDropdown.value = true;
}, 1000);

// Close dropdown on outside click
onClickOutside(dropdownRef, () => {
  showDropdown.value = false;
});

// Watch input changes
watch(query, searchProducts);
</script>

<template>
  <div ref="dropdownRef" class="relative w-full max-w-lg mx-auto">
    <!-- Search Input -->
    <input
      v-model="query"
      type="text"
      placeholder="Search products..."
      class="w-full p-3 text-gray-800 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
    />

    <!-- Dropdown List -->
    <ul
      v-if="showDropdown && results.length"
      class="absolute w-full bg-white border rounded-lg shadow-lg mt-2 max-h-60 overflow-y-auto z-10"
    >
      <li
        v-for="product in results"
        :key="product.id"
        class="flex justify-between items-center p-3 hover:bg-blue-100 transition"
      >
        <span class="text-gray-900">{{ product.title }}</span>
        <button
          @click="store.addProduct(product)"
          class="px-3 py-1 text-sm font-semibold text-white bg-blue-500 cursor-pointer rounded hover:bg-blue-600 transition"
        >
          Add
        </button>
      </li>
    </ul>
  </div>
</template>
