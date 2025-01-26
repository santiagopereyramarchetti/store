<template>
  <div>
    <Link to="new-product">Nuevo producto</Link>
    <h1 class="text-xl font-black my-10">Productos</h1>

    <p v-if="products.noResults">No hay resultados</p>

    <ul v-else
      class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5"
      role="list"
    >
      <Product
        v-for="product in products.productsCollection"
        :key="product.id"
        :product="product"
      />
    </ul>
  </div>
</template>

<script setup>
import Link from "@/components/Link.vue";
import { useProductStore } from "@/stores/products";
import Product from "@/components/Product.vue";

const products = useProductStore();

</script>
