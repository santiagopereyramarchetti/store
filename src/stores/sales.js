import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { query, collection, where } from "firebase/firestore";
import { useFirestore, useCollection } from "vuefire";

export const useSalesStore = defineStore('sales', () => {

    const date = ref('')
    const db = useFirestore()

    const salesSource = computed(() => {
        if(date.value){
            const q = query(
                collection(db, 'sales'),
                where('date', '==', date.value)
            )
            return q
        }
    })

    const salesCollection = useCollection(salesSource)

    const isDateSelected = computed(() => {
       return date.value 
    })

    const noSales = computed(() => {
        return !salesCollection.length && date.value
    })

    const totalSalesOfDay = computed(() => {
        return salesCollection ? salesCollection.value.reduce((total, sale) => {
            return total + sale.total
        }, 0) : 0
    })

    return {
        date,
        isDateSelected,
        salesCollection,
        noSales,
        totalSalesOfDay
    }
})