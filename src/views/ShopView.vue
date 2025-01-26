<template>
    <div>
        <MainNav />
        
        <main class="pt-10 lg:flex lg:h-screen lg:overflow-y-hidden">
            <div class="lg:w-2/3 lg:screen lg:overflow-y-auto mt-24 pb-32 px-10">
                <p v-if="noResult" class="text-center text4-xl">No hay productos</p>
                <div v-else class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                    <ProductCard v-for="product in filteredProduct" :key="product.id" :product="product"/>
                </div>
            </div>
            <aside class="lg:w-1/3 lg:screen lg:overflow-y-auto mt-24 pb-32 px-10">
                <ShoppingCart />
            </aside>
        </main>
    </div>
</template>

<script setup>
    import MainNav from '@/components/MainNav.vue';
    import ShoppingCart from '@/components/ShoppingCart.vue';

    import { useProductStore } from '@/stores/products';
    import { storeToRefs } from 'pinia';

    import ProductCard from '@/components/ProductCard.vue';

    const products = useProductStore()
    const { filteredProduct, noResult } = storeToRefs(products)

</script>
