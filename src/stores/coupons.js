import { defineStore } from "pinia";
import { ref, watch, computed } from "vue";
import { useCartStore } from "./cart";

export const useCouponsStore = defineStore('coupon', () => {

    const cart = useCartStore()

    const couponInput = ref('')
    const couponValidationMessage = ref('')
    const discountPercentage = ref('')
    const discount = ref(0)

    const VALID_COUPONS = [
        {name: '10DESCUENTO', discount: .10},
        {name: '20DESCUENTO', discount: .20}
    ]

    watch(discountPercentage, () => {
        discount.value = (cart.total * discountPercentage.value).toFixed(2)
    })

    function applyCoupon(){
        if(VALID_COUPONS.some((coupon) => {
            return coupon.name === couponInput.value
        })){
            couponValidationMessage.value = "Aplicando..."
            setTimeout(() => {
                discountPercentage.value = VALID_COUPONS.find((coupon) => {
                    return coupon.name === couponInput.value
                }).discount
                couponValidationMessage.value = "Descuento aplicado"
            }, 3000)
        }else{
            couponValidationMessage.value = "No existe ese cupon"
        }

        setTimeout(() => {
            couponValidationMessage.value = ''
        }, 6000)
    }

    function $rest(){
        couponInput = ''
        couponValidationMessage = ''
        discountPercentage = ''
        discount = 0
    }

    const isValidCoupon = computed(() => {
        return discountPercentage.value > 0
    })

    return{
        couponInput,
        applyCoupon,
        couponValidationMessage,
        discount,
        isValidCoupon,
        $rest
    }
})