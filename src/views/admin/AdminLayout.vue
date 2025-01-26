<template>
    <AdminNav />
    <div class="pt-32 px-20 container mx-auto lg:min-h-screen">
        <RouterView />
    </div>
</template>

<script setup>
    import AdminNav from '@/components/AdminNav.vue';
    import { RouterView } from 'vue-router';
    
</script>