<script setup lang="ts">
import type {ShortCar} from "~/types/cars";
import {formatPrice} from "../utils/formatPrice";

defineProps<{
  car: ShortCar
}>()

const emit = defineEmits<{
  (e: "toast"): void
}>()
</script>

<template>
<article class="flex flex-col border border-[#E9E9E9] rounded-lg relative overflow-hidden dark:bg-zinc-900 dark:border-zinc-800">
  <NuxtImg
      :src="car.image"
      :alt="car.name"/>
  <button @click="emit('toast')" type="button" class="bg-white py-1 px-2 rounded-full absolute top-4 right-4 z-10 dark:bg-zinc-800">
    <Icon name="lucide:bookmark"/>
  </button>
  <div class="p-6 pt-2">
    <h3 class="font-medium text-lg">{{ car.name }}</h3>
    <p class="text-sm">{{ car.long_name }}</p>
    <Separator class="mt-2 mb-4"/>
    <div class="flex">
      <div class="flex flex-col items-center justify-between gap-2 flex-1">
        <Icon name="simple-icons:speedtest"/>
        <span class="text-sm">{{car.mileage}} Miles</span>
      </div>
      <div class="flex flex-col items-center gap-2 flex-1">
        <Icon name="solar:gas-station-outline"/>
        <span>{{car.fuel_type}}</span>
      </div>
      <div class="flex flex-col items-center gap-2 flex-1">
        <Icon name="material-symbols-light:auto-transmission-outline"/>
        <span>{{ car.transmission}}</span>
      </div>
    </div>
    <Separator class="mt-2 mb-4"/>
    <div class="flex items-center justify-between">
      <span class="text-xl font-bold">${{formatPrice(car.price)}}</span>
      <NuxtLink class="flex items-center font-medium text-[#405FF2]" :to="`cars/${car._id}`">
        View Details
        <Icon class="ml-2" name="bi:arrow-up-right"/>
      </NuxtLink>
    </div>
  </div>
</article>
</template>