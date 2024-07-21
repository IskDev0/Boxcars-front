<script setup lang="ts">
import type {ShortCar} from "~/types/cars";
import {useToast} from '@/components/ui/toast/use-toast';
import {ToastAction, Toaster} from '@/components/ui/toast';
import {h} from 'vue';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";
import {Button} from "~/components/ui/button";
import CarsList from "~/components/car/CarsList.vue";
import {getHttpClient} from "~/composables/get.httpClient";

const {data:cars} = await getHttpClient<ShortCar[]>("/cars?type=short", {
  method: "GET",
  transform: (data) => {
    return data.cars
  }
})

const searchQuery = ref<Record<string, string>>({
  condition: "",
  brand: "",
  model: ""
})

async function searchCar() {

}

const {toast} = useToast()

function showToast(): void {
  toast({
    description: "Car added to favorites",
    action: h(
        ToastAction,
        {
          altText: "Go to favorites",
          onClick: () => {
            navigateTo("/cars/favorites")
          },
        },
        {
          default: () => "Go to favorites"
        }
    ),
  })
}

</script>

<template>
  <div class="bg-[#050B20] pt-40 pb-32">
    <form @submit.prevent="searchCar"
          class="container flex flex-col items-center rounded-xl md:rounded-full md:flex-row p-8 gap-2 md:gap-4 md:py-4 md:px-8 bg-white text-black dark:bg-zinc-900">
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
  </div>
  <div class="container mt-16">
    <div class="flex items-center justify-between mb-12">
      <span>test</span>
      <div class="flex items-center gap-2">
        <span class="w-32">Sort by</span>
        <Select>
          <SelectTrigger class="max-w-32 bg-transparent border rounded-lg">
            <SelectValue placeholder="Sort"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="new">
                Newest
              </SelectItem>
              <SelectItem value="used">
                Oldest
              </SelectItem>
              <SelectItem value="high">
                Highest
              </SelectItem>
              <SelectItem value="low">
                Lowest
              </SelectItem>
              <SelectItem value="mileage">
                Mileage
              </SelectItem>
              <SelectItem value="price">
                Price
              </SelectItem>
              <SelectItem value="condition">
                Condition
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
    <CarsList @toast="showToast" :cars="cars"/>
  </div>
  <Toaster/>
</template>