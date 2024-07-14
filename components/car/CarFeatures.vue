<script setup lang="ts">
import type {Features} from "~/types/cars";

defineProps<{
  features: Features
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-5 lg:gap-0 md:grid-cols-2 lg:grid-cols-4">
    <div class="flex flex-col gap-2">
      <h3 class="font-medium text-lg">Interior</h3>
      <ul class="flex flex-col gap-3">
               <span class="flex items-center gap-3" v-for="item in features.interior">
                 <span class="bg-secondary text-primary rounded-full w-6 h-6 inline-flex items-center justify-center">
                   <Icon name="mdi:check-bold"/>
                 </span>
                  <li>{{ item }}</li>
               </span>
      </ul>
    </div>
    <div class="flex flex-col gap-2">
      <h3 class="font-medium text-lg">Safety</h3>
      <ul class="flex flex-col gap-3">
               <span class="flex items-center gap-3" v-for="item in features.safety">
                 <span class="bg-secondary text-primary rounded-full w-6 h-6 inline-flex items-center justify-center">
                   <Icon name="mdi:check-bold"/>
                 </span>
                  <li>{{ item }}</li>
               </span>
      </ul>
    </div>
    <div class="flex flex-col gap-2">
      <h3 class="font-medium text-lg">Exterior</h3>
      <ul class="flex flex-col gap-3">
               <span class="flex items-center gap-3" v-for="item in features.exterior">
                 <span class="bg-secondary text-primary rounded-full w-6 h-6 inline-flex items-center justify-center">
                   <Icon name="mdi:check-bold"/>
                 </span>
                  <li>{{ item }}</li>
               </span>
      </ul>
    </div>
    <div class="flex flex-col gap-2">
      <h3 class="font-medium text-lg">Comfort & Convenience</h3>
      <ul class="flex flex-col gap-3">
               <span class="flex items-center gap-3" v-for="item in features.convenience">
                 <span class="bg-secondary text-primary rounded-full w-6 h-6 inline-flex items-center justify-center">
                   <Icon name="mdi:check-bold"/>
                 </span>
                  <li>{{ item }}</li>
               </span>
      </ul>
    </div>
  </div>
</template>