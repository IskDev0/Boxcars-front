<script setup lang="ts">

import {LMap, LMarker, LTileLayer} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css"

const zoom = ref(15)

const {location} = defineProps<{
  location?: { lat: number, lng: number }
}>()

const coords = ref<number[]>([0, 0])
const center = ref<number[]>([0, 0])

function setupLocationData() {
  if (location) {
    coords.value = [location.lat, location.lng]
    center.value = [location.lat, location.lng]
  }
}

//TODO: Remove leaflet link

</script>


<template>
  <div class="h-[450px] mt-5 rounded-xl overflow-hidden">
    <l-map
        @ready="setupLocationData"
        v-model:center="center"
        v-model:zoom="zoom"
        :useGlobalLeaflet="false"
        ref="map"
    >
      <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker :lat-lng="coords"></l-marker>
    </l-map>
  </div>
</template>