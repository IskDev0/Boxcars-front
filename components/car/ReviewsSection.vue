<script setup lang="ts">

import ProgressBar from "~/components/car/ProgressBar.vue";
import type {Details, IReview} from "~/types/reviews";
import ReviewList from "~/components/car/ReviewList.vue";

const props = defineProps<{
  reviews: IReview[],
  overall_data: Details
}>()

function setRating(rating: number) {
  switch (rating) {
    case 1:
      return "Bad"
    case 2:
      return "Okay"
    case 3:
      return "Good"
    case 4:
      return "Very Good"
    case 5:
      return "Perfect"
  }
}
</script>

<template>
  <div class="flex flex-col md:flex-row mb-12">
    <ProgressBar
        class="w-full md:w-1/3"
        :overall="overall_data.overall"
        :progress="overall_data.overall * 20"/>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 flex-1">
      <div class="flex items-center justify-between border-b border-b-[#E9E9E9]">
        <div class="flex flex-col">
          <span class="font-medium">Comfort</span>
          <span>{{ setRating(overall_data.comfort) }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon class="text-primary" name="ph:star-fill"/>
          <span class="font-medium">{{ overall_data.comfort }}</span>
        </div>
      </div>
      <div class="flex items-center justify-between border-b border-b-[#E9E9E9]">
        <div class="flex flex-col">
          <span class="font-medium">Interior Design</span>
          <span>{{ setRating(overall_data.interior) }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon class="text-primary" name="ph:star-fill"/>
          <span class="font-medium">{{ overall_data.interior }}</span>
        </div>
      </div>
      <div class="flex items-center justify-between border-b border-b-[#E9E9E9]">
        <div class="flex flex-col">
          <span class="font-medium">Exterior Styling</span>
          <span>{{ setRating(overall_data.exterior) }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon class="text-primary" name="ph:star-fill"/>
          <span class="font-medium">{{ overall_data.exterior }}</span>
        </div>
      </div>
      <div class="flex items-center justify-between border-b border-b-[#E9E9E9]">
        <div class="flex flex-col">
          <span class="font-medium">Value For The Money</span>
          <span>{{ setRating(overall_data.value_for_money) }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon class="text-primary" name="ph:star-fill"/>
          <span class="font-medium">{{ overall_data.value_for_money }}</span>
        </div>
      </div>
      <div class="flex items-center justify-between border-b border-b-[#E9E9E9]">
        <div class="flex flex-col">
          <span class="font-medium">Performance</span>
          <span>{{ setRating(overall_data.performance) }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon class="text-primary" name="ph:star-fill"/>
          <span class="font-medium">{{ overall_data.performance }}</span>
        </div>
      </div>
      <div class="flex items-center justify-between border-b border-b-[#E9E9E9]">
        <div class="flex flex-col">
          <span class="font-medium">Reliability</span>
          <span>{{ setRating(overall_data.reliability) }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon class="text-primary" name="ph:star-fill"/>
          <span class="font-medium">{{ overall_data.reliability }}</span>
        </div>
      </div>
    </div>
  </div>
  <ReviewList :reviews="reviews"/>
</template>