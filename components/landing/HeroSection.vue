<script setup lang="ts">
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Button} from '@/components/ui/button'
import suv from "/icons/car_type/suv.svg"
import sedan from "/icons/car_type/sedan.svg"
import hatchback from "/icons/car_type/hatchback.svg"
import coupe from "/icons/car_type/coupe.svg"
import hybrid from "/icons/car_type/hybrid.svg"

const searchQuery = ref<Record<string, string>>({
  condition: "",
  brand: "",
  model: ""
})

function searchCar(): void {
  let result = []
  for (let key in searchQuery.value) {
    if (searchQuery.value[key] !== "") {
      result.push(key + "=" + searchQuery.value[key])
    }
  }
  const params = new URLSearchParams(result.join("&"))
  console.log(`/cars?${params.toString()}`)
}

const carTypes = ref([
  {
    id: 1,
    name: "SUV",
    icon: suv
  },
  {
    id: 2,
    name: "Sedan",
    icon: sedan
  },
  {
    id: 3,
    name: "Hatchback",
    icon: hatchback
  },
  {
    id: 4,
    name: "Coupe",
    icon: coupe
  },
  {
    id: 5,
    name: "Hybrid",
    icon: hybrid
  },
])

function searchCarsByType(type: string): void {
  navigateTo(`/cars?type=${type.toLowerCase()}`)
}
</script>

<template>
  <section class="hero h-svh flex items-center justify-center text-white">
    <div class="container">
      <div class="flex flex-col items-center text-center gap-9">
        <p>Find cars for sale and for rent near you</p>
        <h1 class="text-3xl md:text-7xl font-bold">Find Your Perfect Car</h1>
      </div>
      <form @submit.prevent="searchCar"
            class="flex flex-col items-center rounded-xl md:rounded-full md:flex-row p-8 gap-2 md:gap-4 md:py-4 md:px-8 bg-white text-black mt-16 dark:bg-zinc-900">
        <Select v-model="searchQuery.condition">
          <SelectTrigger class="flex-1">
            <SelectValue placeholder="Condition"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">
                All
              </SelectItem>
              <SelectItem value="new">
                New
              </SelectItem>
              <SelectItem value="used">
                Used
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select v-model="searchQuery.brand">
          <SelectTrigger class="flex-1">
            <SelectValue placeholder="Brand"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="BMW">
                BMW
              </SelectItem>
              <SelectItem value="AUDI">
                AUDI
              </SelectItem>
              <SelectItem value="Toyota">
                Toyota
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select v-model="searchQuery.model">
          <SelectTrigger class="flex-1">
            <SelectValue placeholder="Model"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="m7">
                M7
              </SelectItem>
              <SelectItem value="q9">
                Q9
              </SelectItem>
              <SelectItem value="camry">
                Camry
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button class="bg-[#405FF2] py-6 px-8 rounded-full text-white w-full md:flex-1 hover:bg-blue-700">
          <Icon
              class="mr-2"
              size="24"
              name="lucide:search"/>
          Find Listing
        </Button>
      </form>
      <div class="flex flex-col gap-10 mt-16">
        <h3 class="text-center">Or Browse Featured Model</h3>
        <div class="flex flex-col items-center justify-center flex-wrap gap-4 sm:flex-row">
          <div
              @click="searchCarsByType(carType.name)"
              v-for="carType in carTypes"
              :key="carType.id"
              class="flex items-center justify-center gap-2 py-2 px-8 rounded-full bg-white bg-opacity-20 cursor-pointer transition duration-200 w-full sm:w-fit hover:bg-opacity-30 dark:bg-zinc-800 dark:bg-opacity-70 dark:hover:bg-opacity-100">
            <NuxtImg class="h-8" :src="carType.icon" :alt="carType.name"/>
            <span>{{ carType.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.hero {
  background-image: url("/background.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>