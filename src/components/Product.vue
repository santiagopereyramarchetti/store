<template>
    <li :class="{'opacity-30' : isProductNotAvailable}" class="flex items-center space-x-6 border border-gray-200 p-6 bg-white shadow">
        <img class="h-24 w-24" :src="imageSource" :alt="imageSource">
        <div class="space-y-2 flex-auto">
            <h3>{{ product.name }}</h3>
            <p class="font-extrabold">{{ formatCurrency(product.price) }}</p>
            <p>{{ product.availability }} en existencia</p>
        </div>
        <div class="flex items-center gap-3">
            <RouterLink :to="{name: 'edit-product', params: {id: product.id}}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-gray-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </RouterLink>
            <button @click="products.deleteProduct(product.id)" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-red-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
        </div>
    </li>
</template>

<script setup>
    import { onMounted, ref, computed } from 'vue';
    import { formatCurrency } from '../../helpers';
    import { useProductStore } from '@/stores/products';

    const products = useProductStore()

    const props = defineProps({
        product: {
            type: Object
        }
    })

    const imageSource = ref("")

    const imageNumber = () => {
        const numeroAleatorio = Math.floor(Math.random() * 40) + 1;
        return `producto${numeroAleatorio}.jpg`;
    };

    const isProductNotAvailable = computed(() => {
        return props.product.availability === 0
    })

    onMounted(() => {
        imageSource.value = `/images/${imageNumber()}`
    })

</script>