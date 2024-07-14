<script setup lang="ts">
import type {IReview} from "~/types/reviews";
import formatDate from "~/utils/formatDate";

defineProps<{
  review: IReview
}>()

//TODO: Add remove icon only if user id is the same as review user id
</script>

<template>
  <article class="pb-4 border-b border-b-[#E9E9E9]">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtImg :src="review.user.avatar"/>
        <h2 class="font-medium text-lg">{{ review.user.username }}</h2>
        <span>{{ formatDate(review.created_at) }}</span>
      </div>
      <button>
        <Icon size="24" name="fluent:delete-12-regular"/>
      </button>
    </div>
    <div class="flex items-center gap-2">
      <Icon class="text-primary" name="ph:star-fill" v-for="i in review.details.overall"/>
      <span>{{ review.details.overall }}</span>
    </div>
    <p>{{ review.comment }}</p>
  </article>
</template>