<script setup lang="ts">
import type {DimensionsAndCapacity} from "~/types/cars";

defineProps<{
  dimensionsAndCapacity: DimensionsAndCapacity
}>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10 font-medium">
    <div class="grid grid-cols-2">
      <span>Length</span>
      <span class="text-right">{{ dimensionsAndCapacity.length }}mm</span>
    </div>
    <div class="grid grid-cols-2">
      <span>Width</span>
      <span class="text-right">{{ dimensionsAndCapacity.width }}mm</span>
    </div>
    <div class="grid grid-cols-2">
      <span>Height</span>
      <span class="text-right">{{ dimensionsAndCapacity.height }}mm</span>
    </div>
    <div class="grid grid-cols-2">
      <span>Width (including mirrors)</span>
      <span class="text-right">{{ dimensionsAndCapacity.width_full }}mm</span>
    </div>
    <div class="grid grid-cols-2">
      <span>Wheelbase</span>
      <span class="text-right">{{ dimensionsAndCapacity.wheelbase }}mm</span>
    </div>
    <div class="grid grid-cols-2">
      <span>Gross Vehicle Weight (kg)</span>
      <span class="text-right">{{ dimensionsAndCapacity.weight }}</span>
    </div>
    <div class="grid grid-cols-2">
      <span>Height (including roof rails)</span>
      <span class="text-right">{{ dimensionsAndCapacity.height_full }}mm</span>
    </div>
    <div class="grid grid-cols-2">
      <span>Max. Loading Weight (kg)</span>
      <span class="text-right">{{ dimensionsAndCapacity.loading_weight }}</span>
    </div>
    <div class="grid grid-cols-2">
      <span>Luggage Capacity (Seats Up - Litres)</span>
      <span class="text-right">{{ dimensionsAndCapacity.luggage_capacity }}</span>
    </div>
    <div class="grid grid-cols-2">
      <span>Max. Roof Load (kg)</span>
      <span class="text-right">{{ dimensionsAndCapacity.roof_load }}</span>
    </div>
    <div class="grid grid-cols-2">
      <span>Luggage Capacity (Seats Down - Litres)</span>
      <span class="text-right">{{ dimensionsAndCapacity.luggage_capacity_full }}</span>
    </div>
    <div class="grid grid-cols-2">
      <span>No. of Seats</span>
      <span class="text-right">{{ dimensionsAndCapacity.seats }}</span>
    </div>
  </div>
</template>