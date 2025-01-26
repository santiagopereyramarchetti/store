<template>
  <p v-if="cart.isEmpty" class="text-xl text-center text-gray-900">
    El carrito esta vacio
  </p>
  <div v-else>
    <p class="text-2xl font-bold text-gray-900">Resumen de compra</p>
    <ul role="list" class="mt-6 divide-y divide-gray-200 border-gray-200">
      <ShoppingCartItem
        v-for="item in cart.items"
        :key="item.id"
        :item="item"
      />
    </ul>
    <dl class="space-y-6 border-t border-gray-200 text-gray-500">
      <Amount>
        <template #label>Subtotal:</template>
        {{ formatCurrency(cart.subtotal) }}
      </Amount>
      <Amount>
        <template #label>Impuestos:</template>
        {{ formatCurrency(cart.taxes) }}
      </Amount>
      <Amount v-if="coupon.isValidCoupon">
        <template #label>Descuento:</template>
        {{ formatCurrency(coupon.discount) }}
      </Amount>
      <Amount>
        <template #label>Total a pagar:</template>
        {{ formatCurrency(cart.total) }}
      </Amount>
    </dl>
    <CuponForm />
    <button
      @click="cart.checkout"
      type="button"
      class="mt-10 w-full bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold p-3"
    >
      Confirmar Compra
    </button>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
import { useCouponsStore } from "@/stores/coupons";

import Amount from "./Amount.vue";
import ShoppingCartItem from "./ShoppingCartItem.vue";
import CuponForm from "./CuponForm.vue";

import { formatCurrency } from "../../helpers";

const cart = useCartStore();
const coupon = useCouponsStore();
</script>
