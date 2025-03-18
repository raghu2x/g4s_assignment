<script setup lang="ts">
import ProductSearch from "./components/ProductSearch.vue";
import SavedProducts from "./components/SavedProducts.vue";
</script>

<template>
  <div class="app">
    <ProductSearch />
    <SavedProducts />
  </div>
</template>

<style>
.app {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
</style>
