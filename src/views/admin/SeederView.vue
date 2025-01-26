<script setup>
  import { collection, addDoc } from 'firebase/firestore'
  import { useFirestore  } from 'vuefire'
  import { products } from '../../data/products'
  import Link from '@/components/Link.vue';

  const db = useFirestore();

  async function seedDB()  {
    
    const productsCollection = collection(db, "products");

    for (let i = 1; i < products.length; i++) {

          addDoc(productsCollection, { 
              name: products[i - 1 ].name,
              price: products[i - 1 ].price,
              availability: products[i - 1 ].availability,
              category: products[i - 1 ].category
          }).then(() => {
            console.log("Producto Agregado...");
          }).catch((error) => {
            console.error(error);
          });

          if(i === products.length - 1 ) {
            alert('Se subieron los Productos')
          }
    }

  }

</script>


<template>
    <div class="mt-10">
        <Link
            to="products"
        >
            Volver
        </Link>

        <h1 class="text-4xl my-10 font-extrabold">Seeder</h1>

        <div class="flex justify-center bg-white shadow">
            <div class="mx-auto mt-10 p-10 w-full  2xl:w-2/4">
                  <FormKit
                      type="form"
                      submit-label="Agregar Productos"
                      incomplete-message="No se pudo enviar, revisa los mensajes"
                      @submit="seedDB"
                    > 
                  </FormKit>
            </div>
        </div>
  </div>
</template>
