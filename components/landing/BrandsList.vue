<script setup lang="ts">
const brands = ref([
  {
    name: 'Audi',
    image: 'https://box-cars.s3.eu-north-1.amazonaws.com/brands/audi.svg'
  },
  {
    name: 'BMW',
    image: 'https://box-cars.s3.eu-north-1.amazonaws.com/brands/bmw.svg'
  },
  {
    name: 'Ford',
    image: 'https://box-cars.s3.eu-north-1.amazonaws.com/brands/ford.svg'
  },
  {
    name: 'Mercedes',
    image: 'https://box-cars.s3.eu-north-1.amazonaws.com/brands/mercedes.svg'
  },
  {
    name: 'Peugeot',
    image: 'https://box-cars.s3.eu-north-1.amazonaws.com/brands/peugeot.svg'
  },
  {
    name: 'Volkswagen',
    image: 'https://box-cars.s3.eu-north-1.amazonaws.com/brands/volkswagen.svg'
  }
])
</script>

<template>
  <div class="container mx-auto my-28">
    <div class="flex items-center justify-between gap-4 mb-10">
      <h2 class="text-2xl font-bold md:text-4xl">Explore Our Premium Brands</h2>
      <NuxtLink class="flex items-center font-medium" to="/brands">
        Show All Brands
        <Icon class="ml-2" name="bi:arrow-up-right"/>
      </NuxtLink>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
      <article
          class="flex flex-col items-center justify-center gap-6 bg-white p-8 border border-[#E9E9E9] rounded-2xl cursor-pointer transition duration-200 hover:shadow-lg dark:bg-zinc-800 dark:border-zinc-700"
          v-for="brand in brands"
          :key="brand.name">
        <NuxtImg class="w-24 h-24" :src="brand.image" :alt="brand.name"/>
        <span class="font-medium">{{ brand.name }}</span>
      </article>
    </div>
  </div>
</template>