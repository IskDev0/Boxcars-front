<script setup lang="ts">
import type {ShortCar} from "~/types/cars";

defineProps<{
  cars: ShortCar[]
}>()

const emit = defineEmits<{
  (e: "toast"): void
}>()
</script>

<template>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
  <CarItem
      @toast="emit('toast')"
      v-for="car in cars"
      :key="car.id"
      :car="car"/>
</div>
</template>