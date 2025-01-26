<template>
  <p class="my-5 py-5 font-bold border-t border-gray-200">¿Tienes un cupon?</p>
  <div class="flex">
    <input
      v-model="store.couponInput"
      type="text"
      placeholder="Ingresa un cupon"
      class="p-2 bg-white border-gray-300 w-full"
    />
    <button
      :disabled="store.isValidCoupon"
      @click="store.applyCoupon"
      class="p-3 bg-green-400 font-bold disabled:opacity-30"
      type="button"
    >
      Canjear
    </button>
  </div>
  <p class="py-2 text-center text-sm font-extrabold">
    {{ store.couponValidationMessage }}
  </p>
</template>

<script setup>
import { useCouponsStore } from "@/stores/coupons";

const store = useCouponsStore();
</script>
