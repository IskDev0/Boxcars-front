<script setup lang="ts">
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator,} from '@/components/ui/breadcrumb'
import type {ICar} from "~/types/cars";
import Badge from "~/components/ui/badge/Badge.vue";
import ReviewsSection from "~/components/car/ReviewsSection.vue";
import type {IReview} from "~/types/reviews";
import CarOverview from "~/components/car/CarOverview.vue";
import CarDimensions from "~/components/car/CarDimensions.vue";
import CarEngine from "~/components/car/CarEngine.vue";

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

const {data: reviews} = await httpClient<IReview[]>("/review?car_id=" + useRoute().params.id, {
  method: "GET",
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
          <CarOverview
              v-if="overview"
              :overview="overview"/>
          <Separator class="my-12"/>
          <h2 class="text-2xl font-bold mt-12 mb-8">Description</h2>
          <p v-html="car.description"></p>
          <Button class="mt-5" variant="secondary">
            <a :href="car.brochure_url" target="_blank">Car-Brochure.pdf</a>
          </Button>
          <Separator class="my-12"/>
          <h2 class="text-2xl font-bold mt-12 mb-8">Features</h2>
          <CarFeatures v-if="features" :features="features"/>
          <Separator class="my-12"/>
          <h2 class="text-2xl font-bold mt-12 mb-8">Dimensions & Capacity</h2>
          <CarDimensions
              v-if="dimensionsAndCapacity"
              :dimensions-and-capacity="dimensionsAndCapacity"/>
          <Separator class="my-12"/>
          <h2 class="text-2xl font-bold mt-12 mb-8">Engine and Transmission</h2>
          <CarEngine
              v-if="engineAndTransmission"
              :engine-and-transmission="engineAndTransmission"/>
          <Separator class="my-12"/>
          <h2 class="text-2xl font-bold mt-12">Location</h2>
          <p class="mt-8 mb-4">{{car.location.address}}</p>
          <a
              class="flex items-center gap-2 text-primary"
              target="_blank"
              :href="`https://maps.google.com/?q=${car.location.latitude},${car.location.longitude}`">
            <span>Get Direction</span>
            <Icon name="bi:arrow-up-right"/>
          </a>
          <CarLocation :location="{lat: car.location.latitude, lng: car.location.longitude}"/>
          <Separator class="my-12"/>
          <h2 class="text-2xl font-bold mt-12 mb-8">{{ reviews ? reviews.count : "No" }} Reviews</h2>
          <ReviewsSection
              v-if="reviews"
              :reviews="reviews.reviews"
              :overall_data="reviews.overall_data"/>
          <p v-else>No reviews</p>
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
            <NuxtImg
                class="rounded-full w-20 h-20"
                :src="car.dealer_contact.profile_image"
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