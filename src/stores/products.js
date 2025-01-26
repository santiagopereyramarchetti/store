import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useFirestore, useCollection } from "vuefire";
import { collection, addDoc, where, query, limit, orderBy, updateDoc, doc, deleteDoc } from "firebase/firestore";

export const useProductStore = defineStore('products', () => {

    const db = useFirestore()

    const selectCategory = ref(2)

    const categories = [
        { id: 1, name: 'Sudaderas'},
        { id: 2, name: 'Tenis'},
        { id: 3, name: 'Lente'}
    ]

    const q = query(
        collection(db, 'products')
    )

    const productsCollection = useCollection(q)

    async function createProduct(product){
        await addDoc(collection(db, 'products'), product)
    }

    async function updateProduct(docRef, product){
        await updateDoc(docRef, product)
    }

    async function deleteProduct(product){
        const docRef = doc(db, 'products', product)
        await deleteDoc(docRef)
    }

    const categoryOptions = computed(() => {
        const options = [
            {label: '-- Selecciona --', value: '', attrs: {disabled: true}},
            ...categories.map( (category) => {
                return {label: category.name, value: category.id}
            })
        ]
        return options
    })

    const noResult = (computed( () => {
        return productsCollection.value.length === 0
    }))

    const filteredProduct = computed(() => {
        return productsCollection.value
            .filter( (product) => {
                return product.category === selectCategory.value
            } )
            .filter( (product) => {
                return product.availability > 0
            })
    })

    return {
        createProduct,
        updateProduct,
        deleteProduct,
        categories,
        selectCategory,
        categoryOptions,
        productsCollection,
        noResult,
        filteredProduct
    }

})