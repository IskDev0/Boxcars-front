<script setup lang="ts">
import type {IReview} from "~/types/reviews";
import ReviewItem from "~/components/car/ReviewItem.vue";

const props = defineProps<{
  reviews: IReview[]
}>()
</script>

<template>
<div class="flex flex-col gap-8">
  <ReviewItem
      v-for="review in props.reviews"
      :key="review._id"
      :review="review"/>
</div>
</template>