<template>
    <h1 class="text-xl font-black">Resumen de ventas</h1>
    <div class="md:flex md:items-start gap-5">
        <div class="md:w-1/2 lg:w-1/3 bg-white flex justify-center p-5">
            <VueTailwindDatepicker 
                i18n="es-mx"
                as-single
                no-input
                v-model="sales.date"
                :formatter="formatter"
            />
        </div>
        <div class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg-overflow-y-scroll p-5 pb-32">
            <p class="text-center text-lg" v-if="sales.isDateSelected">
                Ventas de la fecha <span class="font-black">{{ sales.date }}</span>
            </p>
            <p class="text-center text-lg" v-else>
                Selecciona una fecha
            </p>
            <div v-if="sales.salesCollection.length" class="space-y-5">
                <SaleDetails v-for="sale in sales.salesCollection" :key="sale.id" :sale="sale"/>
                <p class="text-right text-2xl">Total del día:
                    <span class="font-black">
                        {{ formatCurrency(sales.totalSalesOfDay) }}
                    </span>
                </p>
            </div>
            <p v-else-if="sales.noSales" class="text-lg text-center">No hay ventas en este dia</p>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { useSalesStore } from "@/stores/sales";

    import SaleDetails from "@/components/SaleDetails.vue";

    const sales = useSalesStore()

    import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { formatCurrency } from "../../../helpers";

    const formatter = ref({
        date: 'DD/MM/YYYY',
        month: 'MMMM'
    })

    console.log(sales.salesCollection)
</script>