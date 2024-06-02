<script setup lang="ts">
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Separator} from '@/components/ui/separator'
import {Button} from '@/components/ui/button'

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
</script>

<template>
  <div class="hero h-svh flex items-center justify-center text-white">
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
        <Separator orientation="vertical"/>
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
        <Separator orientation="vertical"/>
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
        <Separator orientation="vertical"/>
        <Button class="bg-[#405FF2] py-6 px-8 rounded-full text-white w-full md:flex-1 hover:bg-blue-700">
          <Icon
              class="mr-2"
              size="24"
              name="lucide:search"/>
          Find Listing
        </Button>
      </form>
    </div>
  </div>
</template>

<style>
.hero {
  background-image: url("/background.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>