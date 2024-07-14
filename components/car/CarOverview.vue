<script setup lang="ts">
import type {Overview} from "~/types/cars";

defineProps<{
  overview: Overview
}>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5 font-medium">
    <div class="grid grid-cols-2">
      <div class="flex items-center gap-2">
        <Icon size="20" name="mingcute:car-3-line"/>
        <span>Body</span>
      </div>
      <span>{{ overview.body }}</span>
    </div>
    <div class="grid grid-cols-2">
      <div class="flex items-center gap-2">
        <Icon size="20" name="teenyicons:user-outline"/>
        <span>Condition</span>
      </div>
      <span>{{ overview.condition }}</span>
    </div>
    <div class="grid grid-cols-2">
      <div class="flex items-center gap-2">
        <Icon size="20" name="simple-icons:speedtest"/>
        <span>Mileage</span>
      </div>
      <span>{{ overview.mileage }}</span>
    </div>
    <div class="grid grid-cols-2">
      <div class="flex items-center gap-2">
        <Icon size="20" name="ph:engine"/>
        <span>Engine Size</span>
      </div>
      <span>{{ overview.engine_size }}</span>
    </div>
    <div class="grid grid-cols-2">
      <div class="flex items-center gap-2">
        <Icon size="20" name="solar:gas-station-outline"/>
        <span>Fuel Type</span>
      </div>
      <span>{{ overview.fuel_type }}</span>
    </div>
    <div class="grid grid-cols-2">
      <div class="flex items-center gap-2">
        <Icon size="20" name="mdi:car-door"/>
        <span>Door</span>
      </div>
      <span>{{ overview.doors }} doors</span>
    </div>
    <div class="grid grid-cols-2">
      <div class="flex items-center gap-2">
        <Icon size="20" name="ph:calendar-dots"/>
        <span>Year</span>
      </div>
      <span>{{ overview.year }}</span>
    </div>
    <div class="grid grid-cols-2">
      <div class="flex items-center gap-2">
        <Icon size="20" name="mdi:piston"/>
        <span>Cylinder</span>
      </div>
      <span>{{ overview.cylinder }}</span>
    </div>
    <div class="grid grid-cols-2">
      <div class="flex items-center gap-2">
        <Icon size="20" name="material-symbols-light:auto-transmission-outline"/>
        <span>Transmission</span>
      </div>
      <span>{{ overview.transmission }}</span>
    </div>
    <div class="grid grid-cols-2">
      <div class="flex items-center gap-2">
        <Icon size="20" name="tdesign:fill-color-1"/>
        <span>Color</span>
      </div>
      <span>{{ overview.colors.join(', ') }}</span>
    </div>
    <div class="grid grid-cols-2">
      <div class="flex items-center gap-2">
        <Icon size="20" name="ph:steering-wheel"/>
        <span>Drive Type</span>
      </div>
      <span>{{ overview.drive_type }}</span>
    </div>
    <div class="grid grid-cols-2">
      <div class="flex items-center gap-2">
        <Icon size="20" name="ci:file-document"/>
        <span>VIN</span>
      </div>
      <span>{{ overview.vin }}</span>
    </div>
  </div>
</template>