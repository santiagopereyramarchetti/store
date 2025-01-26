<template>
    <div class="rounded bg-white shadow relative">
        <img class="" :src="imageSource" :alt="imageSource">
        <div class="p-3 space-y-2">
            <h3 class="text-xl font-black text-gray-500">{{ product.name }}</h3>
            <p class="text-gray-500">Disponibles: {{ product.availability }}</p>
            <p class="text-2xl font-extrabold text-gray-900"> {{ formatCurrency(product.price) }}</p>
        </div>
        <button @click="cart.addItem(product)" type="button" class="absolute top-5 -right-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 bg-indigo-600 rounded-full text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </button>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { formatCurrency } from '../../helpers';
    import { useCartStore } from '@/stores/cart';

    defineProps({
        product:{
            type: Object
        }
    })

    const cart = useCartStore()

    const imageSource = ref("")

    const imageNumber = () => {
        const numeroAleatorio = Math.floor(Math.random() * 40) + 1;
        return `producto${numeroAleatorio}.jpg`;
    };

    onMounted(() => {
        imageSource.value = `/images/${imageNumber()}`
    })
</script>