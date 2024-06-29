<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import type {ICar} from "~/types/cars";
import Badge from "~/components/ui/badge/Badge.vue";

const {data: car} = await httpClient<ICar>("/cars/" + useRoute().params.id, {
  method: "GET",
})

const prev = ref<HTMLElement | null>(null)
const next = ref<HTMLElement | null>(null)

const savings = computed(() => {
  if (!car.value) return 0
  return car.value.short_data.price_old - car.value.short_data.price
})

const overview = computed(() => {
  if (!car.value) return ""
  return car.value.overview
})

const features = computed(() => {
  if (!car.value) return []
  return car.value.features
})

const dimensionsAndCapacity = computed(() => {
  if (!car.value) return []
  return car.value.features.dimensions_and_capacity
})

const engineAndTransmission = computed(() => {
  if (!car.value) return ""
  return car.value.features.engine_and_transmission
})
</script>

<template>
  <section v-if="car && car.short_data" class="mt-32 container mx-auto">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink class="text-[#405FF2] text-lg" href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator class="font-medium text-xl text-black dark:text-white">/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink class="text-[#405FF2] text-lg" href="/cars">
            Listing
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator class="font-medium text-xl text-black dark:text-white">/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink class="text-[#405FF2] text-lg" :href="`/cars/${useRoute().params.id}`">
            {{ car.short_data.name }}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="flex flex-col gap-4">
      <h1 class="text-4xl font-bold mt-4">{{ car?.short_data.name }}</h1>
      <p class="font-medium">{{ car.short_data.long_name }}</p>
    </div>
    <div class="flex flex-col-reverse mt-6 lg:mt-0 lg:flex-row items-start gap-4 lg:items-center justify-between">
      <div v-if="overview" class="flex flex-wrap md:flex-row items-center gap-2 lg:mt-6">
        <Badge class="py-2 px-6 font-medium">
          <Icon size="20" class="mr-2" name="ph:calendar-dots"/>
          {{ overview.year }}
        </Badge>
        <Badge class="py-2 px-6 font-medium">
          <Icon size="20" class="mr-2" name="simple-icons:speedtest"/>
          {{ overview.mileage }} miles
        </Badge>
        <Badge class="py-2 px-6 font-medium">
          <Icon size="20" class="mr-2" name="material-symbols-light:auto-transmission-outline"/>
          {{ overview.transmission }}
        </Badge>
        <Badge class="py-2 px-6 font-medium">
          <Icon size="20" class="mr-2" name="solar:gas-station-outline"/>
          {{ overview.fuel_type }}
        </Badge>
      </div>
      <div class="flex gap-5">
        <div class="flex items-center gap-2">
          <span>Share</span>
          <button class="rounded-full border aspect-square w-10">
            <Icon name="quill:share"/>
          </button>
        </div>
        <div class="flex items-center gap-2">
          <span>Save</span>
          <button class="rounded-full border aspect-square w-10">
            <Icon name="iconamoon:bookmark"/>
          </button>
        </div>
        <div class="flex items-center gap-2">
          <span>Compare</span>
          <button class="rounded-full border aspect-square w-10">
            <Icon size="24" name="heroicons-outline:document-report"/>
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col-reverse lg:flex-row gap-20 mt-8">
      <div class="block w-full lg:w-2/3">
        <Swiper
            :navigation="{
      prevEl: prev,
      nextEl: next,
    }"
            :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation]"
            :slides-per-view="1"
            :loop="true"
            :effect="'creative'"
            :creative-effect="{
                prev: {
                  shadow: false,
                  translate: ['-20%', 0, -1],
             },
              next: {
                  translate: ['100%', 0, 0],
                },
             }"
        >
          <SwiperSlide v-for="image in car.images" :key="image">
            <NuxtImg class="rounded-xl w-full" :src="image"/>
          </SwiperSlide>
          <div ref="prev" class="swiper-button-prev">
            <Icon size="64" name="iconamoon:arrow-left-2"/>
          </div>
          <div ref="next" class="swiper-button-next">
            <Icon size="64" name="iconamoon:arrow-right-2"/>
          </div>
        </Swiper>
        <section>
          <h2 class="text-2xl font-bold mt-12 mb-8">Car Overview</h2>
          <div v-if="overview" class="grid grid-cols-1 md:grid-cols-2 gap-5 font-medium">
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
          <Separator class="my-12"/>
          <h2 class="text-2xl font-bold mt-12 mb-8">Description</h2>
          <p v-html="car.description"></p>
          <Button class="mt-5" variant="secondary">
            <a :href="car.brochure_url" target="_blank">Car-Brochure.pdf</a>
          </Button>
          <Separator class="my-12"/>
          <h2 class="text-2xl font-bold mt-12 mb-8">Features</h2>
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
          <Separator class="my-12"/>
          <h2 class="text-2xl font-bold mt-12 mb-8">Dimensions & Capacity</h2>
          <div v-if="dimensionsAndCapacity" class="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10 font-medium">
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
          <Separator class="my-12"/>
          <h2 class="text-2xl font-bold mt-12 mb-8">Engine and Transmission</h2>
          <div v-if="engineAndTransmission" class="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10 font-medium">
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
          <Separator class="my-12"/>
          <h2 class="text-2xl font-bold mt-12 mb-8">Location</h2>
        </section>
      </div>
      <div class="flex flex-col md:flex-row w-full gap-10 lg:gap-0 lg:flex-col lg:w-1/3">
        <div class="border p-7 rounded-lg flex-1 lg:flex-none">
          <span>Our Price</span>
          <p class="flex gap-2 items-end">
            <span v-if="car.short_data.price_old"
                  class="line-through">${{ formatPrice(car.short_data.price_old) }}</span>
            <span class="font-bold text-2xl">${{ formatPrice(car.short_data.price) }}</span>
          </p>
          <p>Instant Saving: ${{ formatPrice(savings) }}</p>
          <Button class="rounded-lg py-6 w-full my-5">
            <Icon size="24" class="mr-2" name="simple-line-icons:tag"/>
            Make An Offer Price
          </Button>
          <Button variant="outline" class="rounded-lg py-6 w-full">
            <Icon size="24" class="mr-2" name="ph:steering-wheel"/>
            Schedule Test Drive
          </Button>
        </div>
        <div class="border p-7 rounded-lg lg:mt-7 flex-1 lg:flex-none">
          <div class="flex flex-col gap-2">
            <NuxtImg class="rounded-full w-20 h-20" :src="car.dealer_contact.profile_image"
                     :alt="car.dealer_contact.name"/>
            <span class="text-md font-medium">{{ car.dealer_contact.name }}</span>
            <span>{{ car.dealer_contact.address }}</span>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Icon
                    size="32"
                    class="bg-primary/10 p-2 rounded-full text-primary"
                    name="mingcute:location-line"/>
                <span class="font-medium">Get Direction</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon
                    size="32"
                    class="bg-primary/10 p-2 rounded-full text-primary"
                    name="ph:phone-call"/>
                <a class="font-medium" href="tel:+88-123456789">{{ car.dealer_contact.phone }}</a>
              </div>
            </div>
            <Button variant="outline" class="flex items-center gap-2 font-medium text-[#60C961] border-[#60C961] my-4">
              Chat Via Whatsapp
              <Icon name="fluent:arrow-up-right-24-regular"/>
            </Button>
            <NuxtLink class="text-center">
              View All stock at this dealer
              <Icon name="fluent:arrow-up-right-24-regular"/>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.swiper-button-prev, .swiper-button-next {
  background: rgba(255, 255, 255, 0.5);
  width: 40px;
  height: 40px;
  color: #fff;
  border-radius: 50%;
}

.swiper-button-prev:after {
  content: "";
}

.swiper-button-next:after {
  content: "";
}
</style>