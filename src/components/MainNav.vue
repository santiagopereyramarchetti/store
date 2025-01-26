<template>
    <header class="px-10 py-5 bg-gray-700 flex flex-col lg:flex-row lg:items-center gap-5 justify-between absolute top-0 w-full z-10">
        <div>
            <Logo/>
            <div class="flex gap-5 text-white items-center">
                <h2 class="text-lg font-extrabold">Filtros:</h2>
                <div v-for="category in product.categories" :key="category.id" class="flex items-center gap-2">
                    <input @change="product.selectCategory = +$event.target.value" :checked="product.selectCategory === category.id" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" type="radio" name="category" :value="category.id">
                    <label class="text-gray-100">{{ category.name }}</label>
                </div>
            </div>
        </div>
        <nav>
            <Link to="sales">Admin</Link>
        </nav>
    </header>
</template>

<script setup>
    import { useProductStore } from '@/stores/products';
    const product = useProductStore()

    import Link from './Link.vue';
    import Logo from './Logo.vue';
import { products } from '@/data/products';
</script>