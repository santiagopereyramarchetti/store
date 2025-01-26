<template>
  <div>
    <Link to="products">Volver</Link>
    <h1 class="text-xl font-black my-10">Editar producto</h1>

    <div class="flex justify-center bg-white shadow">
      <div class="mt-10 p-10 w-full xl:w-2/4">
        <FormKit @submit="submitHandler" type="form" submit-label="Agregar producto" :value="formData">
          <FormKit
            type="text"
            label="Nombre"
            name="name"
            placeholder="Nombre del producto"
            validation="required"
            :validation-messages="{
              required: 'El nombre del producto es obligatorio',
            }"
            v-model.trim="formData.name"
          />
          <FormKit
            type="file"
            label="Imagen"
            name="image"
            accept=".jpg"
            multiple="true"
          />
          <FormKit
            type="select"
            label="Categoria"
            name="category"
            validation="required"
            :validation-messages="{
              required: 'La categoria es obligatoria',
            }"
            :options="products.categoryOptions"
            v-model.trim="formData.category"
          />
          <FormKit
            type="number"
            label="Precio"
            name="price"
            placeholder="Precio del producto"
            validation="required"
            :validation-messages="{
              required: 'El precio del producto es obligatorio',
            }"
            min="0"
            v-model.number="formData.price"
          />
          <FormKit
            type="number"
            label="Disponibles"
            name="availability"
            placeholder="Cantidad disponible"
            validation="required"
            :validation-messages="{
              required: 'La cantidad es obligatoria',
            }"
            min="0"
            v-model.number="formData.availability"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, watch } from "vue";
  import { useProductStore } from "@/stores/products";
  import Link from "@/components/Link.vue";
  import { useRouter, useRoute } from "vue-router";
  import { useDocument, useFirestore } from "vuefire";
  import { doc } from "firebase/firestore";
  
  const products = useProductStore()

  const route = useRoute()
  const router = useRouter()
  
  const db = useFirestore()
  const docRef = doc(db, 'products', route.params.id)
  const product = useDocument(docRef)
  

  const formData = reactive({
    name: '',
    category: '',
    price: '',
    availability: '',
  })

  watch(product, (product) => {
    if(!product){
      router.push({name: 'products'})
    }
    formData.name = product.name
    formData.category = product.category
    formData.price = product.price
    formData.availability = product.availability
  })

  const submitHandler = async (data) => {
    const { image, ...values } = data
    try {
      await products.updateProduct(docRef, {
        ...values
      })
      router.push({name: 'products'})
    } catch (error) {
      console.log(error)
    }
  }

</script>
