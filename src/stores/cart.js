import { defineStore } from "pinia";
import { ref, computed, watchEffect } from "vue";
import { useCouponsStore } from "./coupons";
import { collection, addDoc, runTransaction, doc } from "firebase/firestore";
import { useFirestore } from "vuefire";

import { getCurrentDate } from "../../helpers";
import CuponForm from "@/components/CuponForm.vue";

export const useCartStore = defineStore('cart', () => {

    const db = useFirestore()
    const coupon = useCouponsStore()
    const items = ref([])
    const subtotal = ref(0)
    const taxes = ref(0)
    const total = ref(0)
    const TAX_RATE = .10
    

    watchEffect( () => {
        subtotal.value = items.value.reduce((total, item) => {
            return total + (item.quantity * item.price);
        }, 0)
        taxes.value = Number((subtotal.value * TAX_RATE).toFixed(2))
        total.value = Number(((subtotal.value + taxes.value) - coupon.discount).toFixed(2))
    })

    function addItem(item){
        const index = isItemInCart(item.id)

        if(index >= 0){
            if(isProductAvailable(item, index)){
                return
            }
            items.value[index].quantity++
        }else{
            items.value.push({...item, quantity: 1, id: item.id})
        }
    }

    const isItemInCart = (id) => {
        return items.value.findIndex((item) => {
            return item.id === id
        })
    }

    const isProductAvailable = (item, index) => {
        return items.value[index].quantity >= item.availability || items.value[index].quantity >= 5
    }

    function updateQuantity(id, quantity){
        items.value = items.value.map( (item) => {
            return item.id === id ? {...item, quantity} : item
        })
    }

    function removeItem(id){
        items.value = items.value.filter((item) => {
            return item.id != id
        })
    }

    async function checkout(){
        try {
            await addDoc(collection(db,'sales'), {
                items: items.value.map((item) => {
                    const { availability, category, ...data } = item
                    return data
                }),
                subtotal: subtotal.value,
                taxes: taxes.value,
                discount: coupon.discount,
                total: total.value,
                date: getCurrentDate()
            })

            items.value.forEach(async (item) => {
                const productRef = doc(db, 'products', item.id)
                await runTransaction(db, async (transaction) => {
                    const currentProduct = await transaction.get(productRef)
                    const availability = currentProduct.data().availability - item.quantity
                    transaction.update(productRef, { availability })
                })
            })

            items.value = []
            subtotal.value = 0
            taxes.value = 0
            total.value = 0
            coupon.$rest
        } catch (error) {
            console.log(error)
        }
    }

    const isEmpty = computed(() => {
        return items.value.length === 0
    })

    const checkProductAvailability = computed(() => {
        return (product) => {
            return product.availability < 5 ? product.availability : 5
        }
    })

    return {
        addItem,
        removeItem,
        isEmpty,
        items,
        checkProductAvailability,
        updateQuantity,
        subtotal,
        taxes,
        total,
        checkout
    }
})