<script setup lang="ts">
import type {EngineAndTransmission} from "~/types/cars";

defineProps<{
  engineAndTransmission: EngineAndTransmission
}>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10 font-medium">
    <div class="grid grid-cols-2">
      <span>Fuel Tank Capacity (Litres)</span>
      <span class="text-right">{{ engineAndTransmission.fuel_capacity }}</span>
    </div>
    <div class="grid grid-cols-2">
      <span>Minimum Kerbweight (kg)</span>
      <span class="text-right">{{ engineAndTransmission.kerb_weight }}</span>
    </div>
    <div class="grid grid-cols-2">
      <span>Max. Towing Weight - Braked (kg)</span>
      <span class="text-right">{{ engineAndTransmission.towing_weight_braked }}</span>
    </div>
    <div class="grid grid-cols-2">
      <span>Turning Circle - Kerb to Kerb(m)</span>
      <span class="text-right">{{ engineAndTransmission.turning_circle }}</span>
    </div>
    <div class="grid grid-cols-2">
      <span>Max. Towing Weight - Unbraked (kg)</span>
      <span class="text-right">{{ engineAndTransmission.towing_weight_unbraked }}</span>
    </div>
  </div>
</template>