import { defineStore } from "pinia";
import { ref } from "vue";
import { GetProductsApiResponse, IProduct } from "../types/product.types";
import axios from "axios";

export const useProductStore = defineStore(
  "productStore",
  () => {
    const savedProducts = ref<IProduct[]>([]);

    const addProduct = (product: IProduct) => {
      if (!savedProducts.value.find((p) => p.id === product.id)) {
        savedProducts.value.push(product);
      }
    };

    const removeProduct = (productId: number) => {
      savedProducts.value = savedProducts.value.filter((p) => p.id !== productId);
    };

    const fetchProducts = async (query: string) => {
      try {
        const { data } = await axios.get<GetProductsApiResponse>(`https://dummyjson.com/products/search`, {
          params: { q: query },
        });
        return data.products;
      } catch (error) {
        // We can show error
        return [];
      }
    };

    return {
      savedProducts,
      addProduct,
      removeProduct,
      fetchProducts,
    };
  },
  { persist: true }
);
